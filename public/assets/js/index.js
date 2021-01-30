// DOM ELEMENTS:
const userSubmitEl = $("#user-submit");
const userListEl = $(".userInfo");

userSubmitEl.on("click", event => {
  event.preventDefault();
  function capCharZero(string) {
    return string
      .toLowerCase()
      .split(" ")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
  }
  //front end team to match id for submit button
  const newUser = {
    firstName: capCharZero(
      $("#first_name")
        .val()
        .trim()
    ),
    lastName: capCharZero(
      $("#last_name")
        .val()
        .trim()
    )
    //   created_at: new Date()
  };
  if (newUser.firstName.length === 0) {
    swal({
      icon: "error",
      title: "Please Enter First Name"
    });
    return;
  } else if (newUser.lastName.length === 0) {
    swal({
      icon: "error",
      title: "Please Enter Last Name"
    });
    return;
  }

  $.post("/api/newUser", newUser).then(data => {
    $.get("/api/user/" + data.id).then(userInfo => {
      window.location.replace("/shift?userId=" + userInfo.id);
    });
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
