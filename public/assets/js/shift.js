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

console.log(endShiftButtonEl);
const userIDEl = $(".userIDEl");

// console.log(lineTimeEndEl);
console.log(endShiftButtonEl);

//GLOBAL VARIABLES
const time = moment();

// const dateFormatted = time.format("YYYY-MM-DD");
const timeFormatted = time.format("YYYY-MM-DD HH:mm:ss");

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
  console.log(instanceObject);

  //NOW CREATE A POST REQUEST
  $.post("/api/newInstance", instanceObject).then(() => {
    location.reload();
  });
  //CLEAR THE FIELDS
  prePopulateNextTask();
  //ASYNCHRONOUS PART OF THE FUNCTION, WE WANT THIS TO HAPPEN AFTER THE POST REQUEST IS MADE
  async function prePopulateNextTask() {
    lineTimeEndEl.text("click -->");
    // POPULATES THE START TIME OF THE NEW, NOW CURRENT TASK
    lineTimeStartEl.text(moment().format("YYYY-MM-DD HH:mm:ss"));
    console.log(lineTimeStartEl.text());
  }
});

//FUNCTION FOR NEW PROJECT ADD
newProjectBtnEl.on("click", event => {
  // console.log($("#user-submit"));
  event.preventDefault();
  //front end team to match id for submit button
  const newProject = {
    projectNumber: billingNumEl.val().trim(),
    projectName: newProjectNameEl.val().trim()
    //   created_at: new Date()
  };
  console.log(newProject);

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
  console.log(timeIn, timeOut);
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

//START CHART FUNCTION
//data arrays:
const xLabels = ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"];
const yData = [12, 19, 3, 5, 2, 3];
//call my function
chartIt();
//define my function
function chartIt() {
  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: xLabels,
      datasets: [
        {
          label: "Shift Time",
          data: yData,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
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
  });
}
//END CHART FUNCTION
