// DOM ELEMENTS:
const userSubmitEl = $("#user-submit");
const userListEl = $(".userInfo");

userSubmitEl.on("click", event => {
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
userListEl.on("click", function(event) {
  event.preventDefault();
  // event.stopPropagation();
  // const renderedUser = $(event.target).text();
  const userId = $(this).data("id");
  console.log(userId);
  $.get("/api/" + userId).then(data => {
    // window.location.replace("/shift");
    // console.log(data);
    const userh1 = `<h1 id="${data.id}">
                      ${data.firstName} ${data.lastName}
                    </h1>`;
    const head = $("#head");
    head.append(userh1);
    console.log(userh1, head);
  });
});
