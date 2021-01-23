$("#user-submit").on("click", function(event) {
    event.preventDefault();
  //front end team to match id for submit button 
    // Make a newChirp object
    var newUser = {
      first_name: $("#first_name").val().trim(),
      last_name: $("#last_name").val().trim(),
    //   created_at: new Date()
    };

    console.log(newUser);
    
    $.post("/api/newUser",newUser)
        .then(function(){
            location.reload();
        })
});