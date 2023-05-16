import {
  nameValidation,
  emailValidation,
  contactValidation,
  languageValidation,
  identityValidation,
} from "./validFunctions.js";

let error = "<span id='error'>*Field Can't Be Empty</span>";

function FormValidation(input, emptyCheck, isValid) {
  let name = input.name;
  let errorTag = $(input).next().attr("id"); // get error tag if any.

  // if no error tag create one.
  if (!$(input).val() && errorTag != "error") {
    $(input).after(error);
  } else {
    emptyCheck[name] = false;
  }

  if (emptyCheck[name] == false) {
    if (input.name == "name") {
      nameValidation(input, isValid);
    } else if (input.name == "email") {
      emailValidation(input, isValid);
    } else if (input.name == "contact") {
      contactValidation(input, isValid);
    } else if (input.name == "language") {
      languageValidation(input, emptyCheck);
    } else if (input.name == "identity") {
      identityValidation(input, emptyCheck);
    }

    if (
      $(input).next().attr("id") == "error" &&
      !emptyCheck[name] &&
      (isValid[name] || isValid[name] == undefined)
    ) {
      let error = $(input).next();
      $(error).remove();
    }
  }
}

export default FormValidation;
