const urlParams = new URLSearchParams(window.location.search);

window.onload = () => {
  $.ajax({
    url: "https://api.myjson.com/bins/" + urlParams.get('id'),
    method: "GET"
  }).done((response) => {
    var informationBuilder = "";
    buildInformationUser(response, informationBuilder);
  })
}

function buildInformationUser(response, informationBuilder) {
  informationBuilder += `
  <img src="${response.picture}">
  <div class="information-user">
    <p class="name-user">
      <span class="tag-format">Name:</span></br>${response.first_name} ${response.last_name}</p>
    <p class="email-user">
      <span class="tag-format">E-Mail:</span></br>${response.email}</p>
    <p class="job-user">
      <span class="tag-format">Job:</span></br>${response.job}</p>
    <p class="phone-user">
      <span class="tag-format">Phone:</span></br>${response.phone}</p>
  </div>
  <div class="buttons">
    <a onclick="viewUpdate()">Edit user</a>
    <a onclick="viewNew()">New user</a>
  </div>
  `;
  $('#js-information-user').html(informationBuilder);
}

function viewUpdate() {
  window.location = "index.html" + '?id=' + urlParams.get('id');
}

function viewNew() {
  window.location = "index.html";
}
