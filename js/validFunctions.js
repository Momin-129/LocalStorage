let regex = new RegExp(
  /^([a-zA-Z0-9\_\.\-])+\@(([a-zA-z0-9])+\.)+([a-zA-z0-9]{2,4})+$/g
);

function checkErrorMessage(input, msg) {
  let error = `<span id='error'>${msg}</span>`;
  if ($(input).next().attr("id") == "error") {
    let error = $(input).next();
    $(error).text(msg);
  } else {
    $(input).after(error);
  }
}

function nameValidation(input) {
  if (!/^[a-zA-Z\s]{2,30}$/.test($(input).val())) {
    checkErrorMessage(input, "*Name should only contain alphabets.");
  }
}

function emailValidation(input) {
  let result = regex.test($(input).val());
  if (!result) {
    checkErrorMessage(input, "*Email Id is invalid.");
  }
}

export { nameValidation, emailValidation };
