// import FormValidation from "./FormValidation.js";

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

// let isValid = { name: false, email: false, contact: false };
// $(document).ready(function () {
//   $("input").blur(function (e) {
//     FormValidation(e.target, emptyChecker);
//   });
// });
//
//

document.getElementById("sortBy").addEventListener("change", (e) => {
  let value = e.target.value;
  if (value == "name") {
    record.sort((a, b) => {
      let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();

      if (fa < fb) return -1;
      else if (fa > fb) return 1;
      else return 0;
    });
  } else if (value == "email") {
    record.sort((a, b) => {
      let fa = a.email.toLowerCase(),
        fb = b.email.toLowerCase();

      if (fa < fb) return -1;
      else if (fa > fb) return 1;
      else return 0;
    });
  } else {
    record.sort(function (a, b) {
      return a.contact - b.contact;
    });
  }

  localStorage.setItem("record", JSON.stringify(record));
  showData();
});
