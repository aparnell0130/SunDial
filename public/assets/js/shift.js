//GET DOM ELEMENTS
const startButtonEl = $(".startButtonEl");
console.log(startButtonEl);
const lineTimeStartEl = $(".lineTimeStartEl");
console.log(lineTimeStartEl);

//GLOBAL VARIABLES
const time = moment();

// const dateFormatted = time.format("YYYY-MM-DD");
const timeFormatted = time.format("YYYY-MM-DD HH:mm:ss");

//FUNCTION OF THE START BUTTON
startButtonEl.on("click", event => {
  event.preventDefault();

  lineTimeStartEl.text(timeFormatted);
});
