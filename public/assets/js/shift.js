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

//GLOBAL VARIABLES
const time = moment();
const timeFormatted = time.format("YYYY-MM-DD HH:mm:ss");
// const xLabels = []; //THESE ARE PROJECTS
// const yData = []; //THESE ARE HOURS

//FUNCTION OF THE START BUTTON
startButtonEl.on("click", event => {
  event.preventDefault();

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

  //NOW CREATE A POST REQUEST
  postRequest(instanceObject);
});

function postRequest(instanceObject) {
  $.post("/api/newInstance", instanceObject, () => {
    location.reload();
  });

  prePopulateNextTask();
}

function prePopulateNextTask() {
  lineTimeEndEl.text("click -->");
  // POPULATES THE START TIME OF THE NEW, NOW CURRENT TASK
  lineTimeStartEl.text(moment().format("YYYY-MM-DD HH:mm:ss"));
}

//FUNCTION FOR NEW PROJECT ADD
newProjectBtnEl.on("click", event => {
  event.preventDefault();
  //front end team to match id for submit button
  const newProject = {
    projectNumber: billingNumEl.val().trim(),
    projectName: newProjectNameEl.val().trim()
  };
  if (newProject.projectNumber === "" || newProject.projectName === "") {
    alert("Please enter a valid Project name or a valid project Number");
    return;
  }
  console.log(newProject.projectName);

  $.post("/api/newProject", newProject).then(() => {
    location.reload();
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

//FUNCTION FOR THE END SHIFT BUTTON

endShiftButtonEl.on("click", event => {
  event.preventDefault();
  const deltaT = data => {
    console.log(data);

    for (let i = 0; i < data.length; i++) {
      const instanceElement = data[i];
      const timeIn = instanceElement.timeIn;
      const timeOut = instanceElement.timeOut;
      const time1 = moment(timeIn.split(" ").join("T"));
      const time2 = moment(timeOut.split(" ").join("T"));
      const timeSpent = time2.diff(time1, "hours", true);
      instanceElement.timeSpent = timeSpent;
    }
    console.log(data);
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
      x.push(mergedArray[i].projectName);
      y.push(parseFloat(timeSpent.toFixed(2)));
    }
    console.log(dataArr);
    chartIt(x, y);
  }

  console.log(xLabels);
  console.log(yData);
  //START CHART FUNCTION
  //data arrays:

  //call my function

  //define my function
  function chartIt(xLabels, yData) {
    console.log(xLabels);
    console.log(yData);
    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: xLabels,
        datasets: [
          {
            label: "Shift Time",
            data: yData,
            backgroundColor: [],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              label: "Shift Time",
              data: yData,
              backgroundColor: [
                // "rgba(255, 99, 132, 0.2)",
                // "rgba(54, 162, 235, 0.2)",
                // "rgba(255, 206, 86, 0.2)",
                // "rgba(75, 192, 192, 0.2)",
                // "rgba(153, 102, 255, 0.2)",
                // "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                // "rgba(255, 99, 132, 1)",
                // "rgba(54, 162, 235, 1)",
                // "rgba(255, 206, 86, 1)",
                // "rgba(75, 192, 192, 1)",
                // "rgba(153, 102, 255, 1)",
                // "rgba(255, 159, 64, 1)"
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      }
    });
    console.log(myChart);
  }
});
