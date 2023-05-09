let userInput = document.querySelectorAll("input,select");
let emptyChecker = {
  name: true,
  email: true,
  contact: true,
  address: true,
  language: true,
  identity: true,
};
let isValid = { name: true, email: true, contact: true };

userInput.forEach((input) =>
  input.addEventListener("blur", (event) => {
    let target = event.target; // current input
    let parent = target.parentNode;
    let idOfField = target.id; // get id of input field
    let empty = false,
      valid = true;

    if (target.id == "search") return; // to return if search field invokes this

    // To check if an error tag already exists.
    if (!parent.querySelector("#error")) {
      let error = document.createElement("span"); // creating a span for errors.
      error.setAttribute("id", "error"); // set id for error span tag.
      parent.appendChild(error); // append span tag in parent of current input tag.
    }

    // To check if an input field is left empty
    if (target.value.length == 0) {
      emptyChecker[idOfField] = true;
    } else if (emptyChecker[idOfField] == true) emptyChecker[idOfField] = false;

    // Name Validation
    if (target.id == "name" && emptyChecker[idOfField] == false) {
      if (!/^[a-zA-Z ]{2,30}$/.test(target.value)) {
        parent.querySelector("#error").innerHTML =
          "*Name Should Contain Only Alphabets.";
        isValid[idOfField] = false;
      } else if (isValid[idOfField] == false) isValid[idOfField] = true;
    }

    // Email Validation
    if (target.id == "email" && emptyChecker[idOfField] == false) {
      let regex = new RegExp(
        /^([a-zA-Z0-9\_\.\-])+\@(([a-zA-z0-9])+\.)+([a-zA-z0-9]{2,4})+$/g
      );
      let result = regex.test(target.value);
      if (!result) {
        parent.querySelector("#error").innerHTML = "*Email is invalid";
        isValid[idOfField] = false;
      } else if (isValid[idOfField] == false) isValid[idOfField] = true;
    }

    // Contact Validation
    if (target.id == "contact" && emptyChecker[idOfField] == false) {
      if (target.value.length != 10) {
        parent.querySelector("#error").innerHTML =
          "*Please Provide a valid number.";
        isValid[idOfField] = false;
      } else if (!/^\d+$/.test(target.value)) {
        parent.querySelector("#error").innerHTML =
          "*Please Provide a valid number.";
        isValid[idOfField] = false;
      } else if (isValid[idOfField] == false) isValid[idOfField] = true;
    }

    //Check box validation
    if (target.id == "language") {
      let checkboxes = document.querySelectorAll(
        "input[type='checkbox']:checked"
      );
      if (checkboxes.length == 0) {
        emptyChecker[idOfField] = true;
      } else if (emptyChecker[idOfField] == true)
        emptyChecker[idOfField] = false;
    }

    if (target.id == "identity") {
      if (target.value === "Choose Identity Proof") {
        parent.querySelectorAll("#error").innerHTML =
          "*Please Selectean identity proof.";
        emptyChecker[idOfField] = true;
      } else emptyChecker[idOfField] = false;
    }

    // Check if validity of field is true and empty error message if so.
    if (isValid[idOfField] && parent.querySelector("#error"))
      parent.querySelector("#error").innerHTML = "";

    // Give error tag value if it is empty.
    if (emptyChecker[idOfField])
      parent.querySelector("#error").innerHTML = "*Field Can't Be Empty.";
    else if (isValid[idOfField] == undefined || isValid[idOfField] == true)
      parent.querySelector("#error").innerHTML = "";

    //Check empty and valid
    for (let key in emptyChecker) {
      if (emptyChecker[key] == true) empty = true;
    }
    for (let key in isValid) {
      if (isValid[key] == false) valid = false;
    }

    console.log(empty, valid);
    if (empty == false && valid == true)
      document.querySelector(".btn").disabled = false;
    else document.querySelector(".btn").disabled = true;

    //end of function
  })
);
