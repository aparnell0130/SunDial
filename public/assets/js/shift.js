//GET DOM ELEMENTS
const startButtonEl = $(".startButtonEl");
const endButtonEl = $(".endButtonEl");
const lineTimeStartEl = $(".lineTimeStartEl");

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
