import { nameValidation, emailValidation } from "./validFunctions.js";

let error = "<span id='error'>*Field Can't Be Empty</span>";

function FormValidation(input, emptyCheck) {
  let name = input.name;
  let errorTag = $(input).next().attr("id"); // get error tag if any.

  // if no error tag create one.
  if (!$(input).val() && errorTag != "error") {
    $(input).after(error);
  } else {
    emptyCheck[name] = false;
  }

  if (input.name == "name" && emptyCheck[name] == false) {
    nameValidation(input);
  } else if (input.name == "email") {
    emailValidation(input);
  } else if ($(input).next().attr("id") == "error") {
    let error = $(input).next();
    $(error).remove();
  }
}

export default FormValidation;
