import FormValidation from "./FormValidation.js";

import { SubmitData } from "./submit.js";

let emptyChecker = {
  name: true,
  email: true,
  contact: true,
  address: true,
  language: true,
  identity: true,
};

let isValid = { name: false, email: false, contact: false };

function enableSubmit() {
  let empty = false,
    valid = true;

  for (let item in emptyChecker) {
    if (emptyChecker[item]) empty = true;
  }

  for (let item in isValid) {
    if (!isValid[item]) valid = false;
  }

  if (!empty && valid) document.getElementById("submit").disabled = false;
  else document.getElementById("submit").disabled = true;
}

$(document).ready(function () {
  $("input").blur(function (e) {
    FormValidation(e.target, emptyChecker, isValid);
    enableSubmit();
  });

  $("input[type='checkbox'],select").change(function (e) {
    FormValidation(e.target, emptyChecker, isValid);
    enableSubmit();
  });
});

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  SubmitData(e);
});
