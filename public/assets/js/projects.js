const userProjects = $(".userInfoProjects");

userProjects.on("click", function(event) {
  event.preventDefault();
  // event.stopPropagation();
  const userId = $(this).data("id");
  $.get("/api/chartingInstances/" + userId).then(data => {
    $.get("/projects?userId=" + data.UserId).then(() => {
      location.reload();
    });
  });
});
