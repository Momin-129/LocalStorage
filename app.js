let record = JSON.parse(localStorage.getItem("record")) ?? [];
let userInput = document.querySelectorAll("input");
let empty = false;
let emptyCheck = false;
let valid = true;
const form = document.querySelector("form");

userInput.forEach((input) =>
  input.addEventListener("blur", (event) => {
    // empty = false;
    let target = event.target;
    let parent = target.parentNode;
    let error = document.createElement("span");
    error.setAttribute("id", "error");

    // For validating required each filed
    if (target.type == "text") {
      if (target.value.length === 0) {
        if (!parent.querySelector("#error")) {
          parent.appendChild(error);
          error.innerHTML = "Field Can't Be Empty";
        }
        valid = false;
      } else {
        if (parent.querySelector("#error")) {
          parent.querySelector("#error").innerHTML = "";
        }
        valid = true;
      }
    }

    // For Email Validation
    if (target.id == "email") {
      let regex = new RegExp(
        /^([a-zA-z0-9_\.\-])+\@(([a-zA-z0-9])+\.)+([a-zA-z0-9]{2,4})+$/g
      );
      let result = regex.test(target.value);
      if (!result) {
        if (!parent.querySelector("#error")) {
          parent.appendChild(error);
          error.innerHTML = "Invalid Email";
        } else {
          parent.querySelector("#error").innerHTML += " Invalid Email";
        }
        valid = false;
      } else {
        if (parent.querySelector("#error")) {
          parent.querySelector("#error").innerHTML = "";
        }
        valid = true;
      }
    }

    // to check contact have only digits and also 10 digits
    if (target.id == "contact") {
      if (!/^\d+$/.test(target.value)) {
        if (!parent.querySelector("#error")) {
          parent.appendChild(error);
          error.innerHTML = "Only Numbers Allowed";
        } else {
          parent.querySelector("#error").innerHTML += "Only Numbers Allowed";
        }
        valid = false;
      } else {
        if (parent.querySelector("#error")) {
          parent.querySelector("#error").innerHTML = "";
        }
        valid = true;
      }
      if (target.value.length != 10) {
        if (!parent.querySelector("#error")) {
          parent.appendChild(error);
          error.innerHTML = "Numbers Should be of 10 digits";
        } else {
          parent.querySelector("#error").innerHTML +=
            "Numbers Should be of 10 digits";
        }
        valid = false;
      } else {
        if (parent.querySelector("#error")) {
          parent.querySelector("#error").innerHTML = "";
        }
        valid = true;
      }
    }

    // To check Whether all fieds are filled and atleast once checkbox is checked
    for (let input of userInput) {
      if (input.value.length === 0) {
        empty = true;
        break;
      } else {
        empty = false;
      }
    }

    let checkbox = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    ).length;
    if (checkbox == 0) {
      emptyCheck = true;
    } else emptyCheck = false;

    // Final Check to enable submit button
    if (empty == false && emptyCheck == false && valid == true) {
      document.querySelector("#btn").disabled = false;
    } else {
      document.querySelector("#btn").disabled = true;
    }

    //end of function
  })
);

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
