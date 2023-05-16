import FormValidation from "./FormValidation.js";

let record = JSON.parse(localStorage.getItem("record")) ?? [];
const form = document.querySelector("form");

let emptyChecker = {
  name: true,
  email: true,
  contact: true,
  address: true,
  language: true,
  identity: true,
};

let isValid = { name: false, email: false, contact: false };

$(document).ready(function () {
  $("input").blur(function (e) {
    FormValidation(e.target, emptyChecker, isValid);
  });

  $("input[type='checkbox'],select").change(function (e) {
    FormValidation(e.target, emptyChecker, isValid);
  });
});
