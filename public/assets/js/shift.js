//GET DOM ELEMENTS
const startButtonEl = $(".startButtonEl");
const endButtonEl = $(".endButtonEl");
const lineTimeStartEl = $(".lineTimeStartEl");
const billingNumEl = $("#billingNum");
const newProjectNameEl = $("#newProjectName");
const newProjectBtnEl = $(".newProjectBtn");
// console.log(newProjectBtnEl);

const lineTimeEndEl = $(".lineTimeEndEl");
// console.log(lineTimeEndEl);

//GLOBAL VARIABLES
const time = moment();

// const dateFormatted = time.format("YYYY-MM-DD");
const timeFormatted = time.format("YYYY-MM-DD HH:mm:ss");

//FUNCTION OF THE START BUTTON
startButtonEl.on("click", event => {
  event.preventDefault();

  lineTimeStartEl.text(timeFormatted);
});

//FUNCTION OF THE END BUTTON
endButtonEl.on("click", event => {
  event.preventDefault();
  lineTimeEndEl.text(moment().format("YYYY-MM-DD HH:mm:ss"));
});

//FUNCTION FOR NEW PROJECT ADD
newProjectBtnEl.on("click", event => {
  // console.log($("#user-submit"));
  event.preventDefault();
  //front end team to match id for submit button
  // Make a newChirp object
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
