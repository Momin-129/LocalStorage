import FormValidation from "./FormValidation.js";

// Validation
let emptyChecker = {
  name: false,
  email: false,
  contact: false,
  address: false,
  language: false,
  identity: false,
};
let isValid = { name: true, email: true, contact: true };

function enableSubmit() {
  let empty = false,
    valid = true;

  for (let item in emptyChecker) {
    if (emptyChecker[item]) empty = true;
  }

  for (let item in isValid) {
    if (!isValid[item]) valid = false;
  }

  if (!empty && valid) document.getElementById("update").disabled = false;
  else document.getElementById("update").disabled = true;
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

// Automatic form fill

let record = JSON.parse(localStorage.getItem("record"));
let individual = parseInt(localStorage.getItem("individual"));

(function loadData() {
  let eachRecord = record[individual];
  let inputFields = document.querySelectorAll("input[type='text'],select");
  let radioFields = document.querySelectorAll("input[type='radio']");
  let checkFields = document.querySelectorAll("input[type='checkbox']");
  for (item in eachRecord) {
    inputFields.forEach((input) => {
      if (input.id == item) {
        input.value = eachRecord[item];
      }
    });

    if (item == "gender") {
      radioFields.forEach((input) => {
        if (input.value == eachRecord[item]) {
          input.checked = true;
        }
      });
    }
    if (item == "language") {
      for (let element in eachRecord[item]) {
        checkFields.forEach((input) => {
          if (input.value == eachRecord[item][element]) {
            input.checked = true;
          }
        });
      }
    }
  }
})();

// Form Updation
document.getElementById("update").addEventListener("click", (e) => {
  e.preventDefault();
  let eachRecord = record[individual];
  let inputFields = document.querySelectorAll("input[type='text'],select");
  let radioFields = document.querySelectorAll("input[type='radio']");
  let checkFields = document.querySelectorAll("input[type='checkbox']");
  let languages = [];
  for (item in eachRecord) {
    inputFields.forEach((input) => {
      if (input.id == item) {
        eachRecord[item] = input.value;
      }
    });

    if (item == "gender") {
      radioFields.forEach((input) => {
        if (input.checked == true) {
          eachRecord[item] = input.value;
        }
      });
    }
    if (item == "language") {
      checkFields.forEach((input) => {
        if (input.checked == true) {
          languages.push(input.value);
        }
      });
      eachRecord[item] = languages;
    }
  }

  localStorage.setItem("record", JSON.stringify(record));
  location.href = "showForm.html";
});
