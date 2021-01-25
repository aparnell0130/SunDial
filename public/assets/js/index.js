// DOM ELEMENTS:
const userSubmitEl = $("#user-submit");
const userListEl = $(".userListEl");

userSubmitEl.on("click", event => {
  // console.log($("#user-submit"));
  event.preventDefault();
  //front end team to match id for submit button
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
