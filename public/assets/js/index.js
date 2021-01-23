$("#user-submit").on("click", event => {
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
