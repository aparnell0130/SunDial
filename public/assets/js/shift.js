//GET DOM ELEMENTS
const startButtonEl = $(".startButtonEl");
const endButtonEl = $(".endButtonEl");
const lineTimeStartEl = $(".lineTimeStartEl");
const lineTimeEndEl = $(".lineTimeEndEl");
const billingNumEl = $("#billingNum");
const newProjectNameEl = $("#newProjectName");
const newProjectBtnEl = $(".newProjectBtn");
const projectDropDownListEl = $(".projectDropDownListEl");
const endShiftButtonEl = $(".endShiftButtonEl");
const projectLineItem = $(".histBtn");
const userIDEl = $(".userIDEl");

if (lineTimeStartEl.text().length === 19) {
  startButtonEl.hide();
}

//GLOBAL VARIABLES
const time = moment();
const timeFormatted = time.format("YYYY-MM-DD HH:mm:ss");

//FUNCTION OF THE START BUTTON
startButtonEl.on("click", event => {
  event.preventDefault();
  startButtonEl.hide("medium");
  lineTimeStartEl.text(timeFormatted);
});

//FUNCTION OF THE END TASK BUTTON
endButtonEl.on("click", event => {
  event.preventDefault();
  //THIS POPULATES THE END TIME
  lineTimeEndEl.text(moment().format("YYYY-MM-DD HH:mm:ss"));
  //THIS GETS OUR INSTANCE OBJECT TO POST
  const instanceObject = {
    projectId: projectLineItem.attr("id"),
    userId: userIDEl.attr("id"),
    timeIn: lineTimeStartEl.text(),
    timeOut: lineTimeEndEl.text()
  };
  if (!instanceObject.projectId) {
    lineTimeEndEl.text("---");
    swal({
      icon: "error",
      title: "Please Choose Valid Project"
    });
    return;
  } else if (instanceObject.timeIn === "---") {
    lineTimeEndEl.text("---");
    swal({
      icon: "error",
      title: "Please Start Shift"
    });
    return;
  }
  //NOW CREATE A POST REQUEST
  postRequest(instanceObject);
});

function postRequest(instanceObject) {
  $.post("/api/newInstance", instanceObject, () => {
    location.reload();
  });
}

//FUNCTION FOR NEW PROJECT ADD
newProjectBtnEl.on("click", event => {
  event.preventDefault();
  const newProject = {
    projectNumber: billingNumEl.val().trim(),
    projectName: newProjectNameEl.val().trim()
  };
  if (newProject.projectNumber === "" || newProject.projectName === "") {
    swal({
      icon: "error",
      title: "Please Enter a Valid Project Name or a Valid Project Number"
    });
    return;
  }

  $.post("/api/newProject", newProject).then(data => {
    $.get("/api/project/" + data.id).then(result => {
      projectLineItem.text(result.projectName);
      projectLineItem.attr("id", result.id);
    });
  });
});

$(".timeSpent").each(function() {
  const timeIn = $(this)
    .prev()
    .prev()
    .data("timein");
  const timeOut = $(this)
    .prev()
    .data("timeout");
  const time1 = moment(timeIn.split(" ").join("T"));
  const time2 = moment(timeOut.split(" ").join("T"));
  const timeSpent = time2.diff(time1, "hours", true);
  $(this).text(timeSpent.toFixed(2));
});

//FUNCTION TO POPULATE THE PROJECT INPUT FIELD FROM DROP DOWN
projectDropDownListEl.on("click", event => {
  event.preventDefault();
  const renderedProjectName = $(event.target).text();
  projectLineItem.text(renderedProjectName);
  const renderedProjectID = $(event.target).attr("id");
  projectLineItem.attr("id", renderedProjectID);
});

//FUNCTION FOR THE CHART TOTALS BUTTON
endShiftButtonEl.on("click", event => {
  event.preventDefault();
  const deltaT = data => {
    for (let i = 0; i < data.length; i++) {
      const instanceElement = data[i];
      const timeIn = instanceElement.timeIn;
      const timeOut = instanceElement.timeOut;
      const time1 = moment(timeIn.split(" ").join("T"));
      const time2 = moment(timeOut.split(" ").join("T"));
      const timeSpent = time2.diff(time1, "hours", true);
      instanceElement.timeSpent = timeSpent;
    }
  };
  //GET the data object from the db by calling a get request on the instances
  const activeUser = userIDEl.attr("id");

  $.get("/api/chartingInstances/" + activeUser).then(instancesData => {
    //GET THE DELTAT
    deltaT(instancesData);
    consolidateData(instancesData);
  });

  //CONSOLIDATE MY PROJECT TIME
  function consolidateData(instancesData) {
    // Create new array of objects pull out just the projectId, projectName and timeSpent
    const newArr = [];
    for (let i = 0; i < instancesData.length; i++) {
      const element = {
        ProjectId: instancesData[i].ProjectId,
        projectName: instancesData[i].projectName,
        timeSpent: [instancesData[i].timeSpent]
      };
      newArr.push(element);
    }

    // for each id push multiple timeSpent into one array for timeSpent object
    const arrayHashmap = newArr.reduce((obj, item) => {
      obj[item.ProjectId]
        ? obj[item.ProjectId].timeSpent.push(...item.timeSpent)
        : (obj[item.ProjectId] = { ...item });
      return obj;
    }, {});
    const mergedArray = Object.values(arrayHashmap);

    // Create new array with timeSpent array summed
    const dataArr = [];
    const x = [];
    const y = [];
    for (let i = 0; i < mergedArray.length; i++) {
      const sum = (accumulator, currentValue) => accumulator + currentValue;
      const timeSpent = mergedArray[i].timeSpent.reduce(sum);
      const newObj = {
        ProjectId: mergedArray[i].ProjectId,
        projectName: mergedArray[i].projectName,
        timeSpent: timeSpent.toFixed(2)
      };
      dataArr.push(newObj);
      x.push(
        `${mergedArray[i].projectName} ${parseFloat(timeSpent.toFixed(2))} hrs`
      );
      y.push(parseFloat(timeSpent.toFixed(2)));
    }
    chartIt(x, y);
  }

  function chartIt(xLabels, yData) {
    const colors = [];
    for (let i = 0; i < xLabels.length; i++) {
      const o = Math.round,
        r = Math.random,
        s = 255;
      const color =
        "rgb(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + ")";
      colors.push(color);
    }
    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: xLabels,
        datasets: [
          {
            label: "Shift Time",
            data: yData,
            backgroundColor: colors,
            borderWidth: 1
          }
        ]
      },
      options: {
        tooltips: {
          titleFontSize: 16,
          bodyFontSize: 16,
          callbacks: {
            label: function(tooltipItems, data) {
              return data.labels[tooltipItems.index];
            }
          }
        },
        legend: {
          labels: {
            fontSize: 24
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                display: false
              }
            }
          ]
        }
      }
    });
    console.log(myChart);
  }
});
