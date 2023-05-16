let regex = new RegExp(
  /^([a-zA-Z0-9\_\.\-])+\@(([a-zA-z0-9])+\.)+([a-zA-z0-9]{2,4})+$/g
);

function checkErrorMessage(input, msg) {
  let error = `<span id='error'>${msg}</span>`;
  if ($(input).next().attr("id") == "error") {
    let error = $(input).next();
    $(error).text(msg);
  } else $(input).after(error);
}

function nameValidation(input, isValid) {
  if (!/^[a-zA-Z\s]{2,30}$/.test($(input).val())) {
    isValid[input.name] = false;
    checkErrorMessage(input, "*Name should only contain alphabets.");
  } else isValid[input.name] = true;
}

function emailValidation(input, isValid) {
  let result = regex.test($(input).val());
  if (!result) {
    isValid[input.name] = false;
    checkErrorMessage(input, "*Email Id is invalid.");
  } else isValid[input.name] = true;
}

function contactValidation(input, isValid) {
  if (input.value.length != 10) {
    isValid[input.name] = false;
    checkErrorMessage(input, "*Please provide a valid number.");
  } else if (!/^\d+$/.test(input.value)) {
    isValid[input.name] = false;
    checkErrorMessage(input, "*Please provide a valid number.");
  } else isValid[input.name] = true;
}

function languageValidation(input, emptyCheck) {
  let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
  if (checkboxes.length == 0) {
    emptyCheck[input.name] = true;
    checkErrorMessage(input, "*Select atleast one language.");
  } else emptyCheck[input.name] = false;
}

function identityValidation(input, emptyCheck) {
  if (input.value == "Null") {
    emptyCheck[input.name] = true;
    checkErrorMessage(input, "*Select an identity proof.");
  } else emptyCheck[input.name] = false;
}

export {
  nameValidation,
  emailValidation,
  contactValidation,
  languageValidation,
  identityValidation,
};
