// DOM ELEMENTS:
const userSubmitEl = $("#user-submit");
const userListEl = $(".userInfo");

userSubmitEl.on("click", event => {
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
userListEl.on("click", function(event) {
  event.preventDefault();
  // event.stopPropagation();
  // const renderedUser = $(event.target).text();
  const userId = $(this).data("id");
  console.log(userId);
  window.location.replace("/shift?userId=" + userId);
});
