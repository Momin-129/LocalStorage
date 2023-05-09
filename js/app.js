let record = JSON.parse(localStorage.getItem("record")) ?? [];
const form = document.querySelector("form");

// Show Data
document.getElementById("showBtn").addEventListener("click", () => {
  let details = document.getElementById("showDetails");
  let table = document.getElementById("userDetails");
  let button = document.createElement("button");
  button.setAttribute("value", "Edit");
  // row.innerHTML = "";

  record = JSON.parse(localStorage.getItem("record"));

  record.forEach((element, index) => {
    let tr = document.createElement("tr");
    table.appendChild(tr);
    for (item in element) {
      let td = document.createElement("td");
      let value = document.createTextNode(element[item]);
      td.appendChild(value);
      tr.appendChild(td);
    }
    let buttonTd = document.createElement("td");
    let edit = document.createElement("button");
    let Delete = document.createElement("button");
    Delete.setAttribute("class", "btn btn-danger");
    Delete.setAttribute("value", index);
    Delete.innerHTML = "Delete";
    edit.setAttribute("class", "btn btn-success");
    edit.setAttribute("value", index);
    edit.innerHTML = "Edit";
    edit.onclick = (e) => {
      let individual = e.target.value;
      console.log(typeof individual);
      localStorage.setItem("individual", individual);
      location.href = "editDetails.html";
    };
    buttonTd.appendChild(edit);
    buttonTd.appendChild(Delete);
    tr.appendChild(buttonTd);
  });
  details.style.display = "block";
  document.getElementById("showBtn").style.display = "none";
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//

// Search Button
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
