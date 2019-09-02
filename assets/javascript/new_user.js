const urlParams = new URLSearchParams(window.location.search);
var registrationUrl = "";

window.onload = () => {
  if (urlParams.get('id') == null) {
    $('#js-edit-user').hide();
    registrationUrl = "https://api.myjson.com/bins";
  } else {
    $('#js-new-user').hide();
    registrationUrl = "https://api.myjson.com/bins/" + urlParams.get('id');
    $.ajax({
      url: "https://api.myjson.com/bins/" + urlParams.get('id'),
      method: "GET"
    }).done((response) => {
      document.querySelector("#js-first-name").value = response.first_name;
      document.querySelector("#js-last-name").value = response.last_name;
      document.querySelector("#js-job-user").value = response.job;
      document.querySelector("#js-email-user").value = response.email;
      document.querySelector("#js-phone-user").value = response.phone;
      document.querySelector("#js-picture-user").value = response.picture;
    })
  }
}

function newUser() {
  const firstName = document.querySelector("#js-first-name").value;
  const lastName = document.querySelector("#js-last-name").value;
  const job = document.querySelector("#js-job-user").value;
  const email = document.querySelector("#js-email-user").value;
  const phone = document.querySelector("#js-phone-user").value;
  const picture = document.querySelector("#js-picture-user").value;

  if (verifyFirstNameWrite(firstName) == false) return alert("Wrong Fisrt Name Writing.");

  if (verifyLastNameWrite(lastName) == false) return alert("Wrong Last Name Writing.");

  if (verifyJobWrite(job) == false) return alert("Wrong Job Writing.");

  if (verifyEmailWrite(email) == false) return alert("Wrong E-Mail Writing.");

  if (verifyPhoneWrite(phone) == false) return alert("Wrong Phone Writing.");

  if (verifyPictureWrite(picture) == false) return alert("Wrong Picture Writing.");

  const values = {
    "first_name": firstName,
    "last_name": lastName,
    "job": job,
    "email": email,
    "phone": phone,
    "picture": picture
  };
  const data = JSON.stringify(values);
  $.ajax({
    url: registrationUrl,
    type: checkVisibleButton(),
    data: data,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: (data) => {
      var urlId = "";
      if (urlParams.get('id') == null) {
        urlId = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/.exec(data.uri)[5].split("/")[1];
      } else {
        urlId = urlParams.get('id');
      }
      window.location = "show_user.html" + '?id=' + urlId;
    }
  })
};

function checkVisibleButton() {
  if ($('#js-new-user').is(':visible')) {
    return "POST";
  } else {
    return "PUT";
  }
}

const firstNameSyntax =/[A-Za-zÁÉÍÓÚÑáéíóúñ]+/;
const lastNameSyntax = /[A-Za-zÁÉÍÓÚÑáéíóúñ]+/;
const jobSyntax = /[A-Za-zÁÉÍÓÚÑáéíóúñ]+/;
const emailSyntax = /[A-Za-z0-9._%+-]+@[A-Za-z0-9]+[.][A-Za-z]{2,4}/;
const phoneSyntax = /\d{10}/;
const pictureSyntax = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

function verifyFirstNameWrite(firstName) {
  const verifyResult = firstNameSyntax.test(firstName);
  if (verifyResult == false) {
    return verifyResult;
  }
}

function verifyLastNameWrite(lastName) {
  const verifyResult = lastNameSyntax.test(lastName);
  if (verifyResult == false) {
    return verifyResult;
  }
}

function verifyJobWrite(job) {
  const verifyResult = jobSyntax.test(job);
  if (verifyResult == false) {
    return verifyResult;
  }
}

function verifyEmailWrite(email) {
  const verifyResult = emailSyntax.test(email);
  if (verifyResult == false) {
    return verifyResult;
  }
}

function verifyPhoneWrite(phone) {
  const verifyResult = phoneSyntax.test(phone);
  if (verifyResult == false) {
    return verifyResult;
  }
}

function verifyPictureWrite(picture) {
  const verifyResult = pictureSyntax.test(picture);
  if (verifyResult == false) {
    return verifyResult;
  }
}
