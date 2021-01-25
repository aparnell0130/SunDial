// DOM ELEMENTS:
const userSubmitEl = $("#user-submit");
console.log(userSubmitEl);
console.log("test");
const userListEl = $(".userListEl");

$("#user-submit").on("click", event => {
  console.log($("#user-submit"));
  event.preventDefault();
  //front end team to match id for submit button
  // Make a newChirp object
  const newUser = {
    firstName: $("#first_name")
      .val()
      .trim(),
    lastName: $("#last_name")
      .val()
      .trim()
    //   created_at: new Date()
  };

  console.log(newUser);

  $.post("/api/newUser", newUser).then(() => {
    location.reload();
  });
});

//Functionality to redirect to shift page when selecting a user
userListEl.on("click", event => {
  event.preventDefault();
  event.stopPropagation();
  console.log(this);
  const renderedUser = $(event.target).text();
  console.log(renderedUser);

  window.location.replace("/shift");
});
