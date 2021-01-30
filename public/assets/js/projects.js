const userProjects = $(".userInfoProjects");
const instanceProjects = $("#instanceDataProjects");
const userH1 = $("#userH1");
userProjects.on("click", function(event) {
  event.preventDefault();
  instanceProjects.empty();
  // userH1.empty();
  const userId = $(this).data("id");
  const deltaT = data => {
    for (let i = 0; i < data.length; i++) {
      const instanceElement = data[i];
      const timeIn = instanceElement.timeIn;
      const timeOut = instanceElement.timeOut;
      const time1 = moment(timeIn.split(" ").join("T"));
      const time2 = moment(timeOut.split(" ").join("T"));
      const timeSpent = time2.diff(time1, "hours", true);
      instanceElement.timeSpent = timeSpent;
    }
  };
  $.get("/api/chartingInstances/all/" + userId).then(data => {
    deltaT(data);
    for (let i = 0; i < data.length; i++) {
      instanceProjects.append(
        `<tr id="${data[i].id}">
        <td>${data[i].projectName}</td>
        <td>${data[i].timeIn}</td>
        <td>${data[i].timeOut}</td>
        <td>${data[i].timeSpent.toFixed(2)}</td>
        </tr>`
      );
    }
  });
  $.get("/api/user/" + userId).then(data => {
    console.log(data);
    userH1.text(`${data.firstName} ${data.lastName}`);
  });
});
