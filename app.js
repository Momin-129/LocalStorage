let record = JSON.parse(localStorage.getItem("record")) ?? [];
let userInput = document.querySelectorAll("input,select");
let emptyChecker = {
  name: true,
  email: true,
  contact: true,
  address: true,
  language: true,
  identity: true,
};
let isValid = { email: true, contact: true };
const form = document.querySelector("form");

userInput.forEach((input) =>
  input.addEventListener("blur", (event) => {
    let target = event.target; // current input
    let parent = target.parentNode;
    let idOfField = target.id; // get id of input field
    let empty = false,
      valid = true;

    // To check if an error tag already exists.
    if (parent.querySelector("#erro")) {
      let error = document.createElement("span"); // creating a span for errors.
      error.setAttribute("id", "error"); // set id for error span tag.
      parent.appendChild(error); // append span tag in parent of current input tag.
    }

    // To check if an input field is left empty
    if (target.value.length == 0) {
      emptyChecker[idOfField] = true;
    } else if (emptyChecker[idOfField] == true) emptyChecker[idOfField] = false;

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

    // Check if validity of field is true and empty error message if so.
    if (isValid[idOfField] && parent.querySelector("#error"))
      parent.querySelector("#error").innerHTML = "";

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
        parent.querySelector("#error").innerHTML =
          "*Please Provide a valid number.";
        emptyChecker[idOfField] = false;
      } else if (emptyChecker[idOfField] == false)
        emptyChecker[idOfField] = true;
    }

    if (target.id == "identity") {
      if (target.value === "Choose Identity Proof") {
        parent.querySelectorAll("#error").innerHTML =
          "*Please Select an identity proof.";
        emptyChecker[idOfField] = true;
      } else emptyChecker[idOfField] = false;
    }

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

    if (empty == false && valid == true)
      document.querySelector(".btn").disable = false;
    else document.querySelector(".btn").disable = true;

    //end of function
  })
);

// Form Submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const obj = Object.fromEntries(formData);

  let Languages = formData.getAll("language");
  obj.language = Languages;

  record.push(obj);
  localStorage.setItem("record", JSON.stringify(record));
  form.reset();

  document.getElementById("showDetails").style.display = "none";
  document.getElementById("showBtn").style.display = "inline";
});

document.getElementById("showBtn").addEventListener("click", () => {
  let details = document.getElementById("showDetails");
  let row = document.getElementById("gridRow");
  row.innerHTML = "";

  record = JSON.parse(localStorage.getItem("record"));

  for (eachRecord of record) {
    let col = document.createElement("div");
    col.classList.add("col-md-4", "col-sm-12");
    row.appendChild(col);
    let individual = document.createElement("div");
    individual.classList.add("individual");
    col.appendChild(individual);
    let table = document.createElement("table");
    individual.appendChild(table);
    for (item in eachRecord) {
      let tr = document.createElement("tr");
      table.appendChild(tr);
      let th = document.createElement("th");
      let td = document.createElement("td");
      let key = document.createTextNode(item.toUpperCase());
      let value = document.createTextNode(eachRecord[item]);
      th.appendChild(key);
      td.appendChild(value);
      tr.appendChild(th);
      tr.appendChild(td);
    }
  }

  details.style.display = "block";
  document.getElementById("showBtn").style.display = "none";
});

// Search Button
//
document.querySelector("#search").addEventListener("keyup", () => {
  let value = document.getElementById("search").value;
  let details = document.getElementById("showDetails");
  let row = document.getElementById("gridRow");
  row.innerHTML = "";

  record = JSON.parse(localStorage.getItem("record"));

  let filter = record.filter((item) => {
    if (item.name.includes(value)) {
      return item;
    }
  });

  console.log(filter);

  for (eachRecord of filter) {
    let col = document.createElement("div");
    col.classList.add("col-md-4", "col-sm-12");
    row.appendChild(col);
    let individual = document.createElement("div");
    individual.classList.add("individual");
    col.appendChild(individual);
    let table = document.createElement("table");
    individual.appendChild(table);
    for (item in eachRecord) {
      let tr = document.createElement("tr");
      table.appendChild(tr);
      let th = document.createElement("th");
      let td = document.createElement("td");
      let key = document.createTextNode(item.toUpperCase());
      let value = document.createTextNode(eachRecord[item]);
      th.appendChild(key);
      td.appendChild(value);
      tr.appendChild(th);
      tr.appendChild(td);
    }
  }
});
