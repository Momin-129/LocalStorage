// Show Data

function showData() {
  let table = document.getElementById("userDetails");
  table.innerHTML = "";

  let tr = document.createElement("tr");
  table.appendChild(tr);
  for (let item of record) {
    for (let element in item) {
      let th = document.createElement("th");
      let value = document.createTextNode(element.toUpperCase());
      th.appendChild(value);
      tr.appendChild(th);
    }
    let th = document.createElement("th");
    th.innerHTML = "Edit/Delete";
    tr.appendChild(th);

    break;
  }

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
      localStorage.setItem("individual", individual);
      location.href = "editDetails.html";
    };
    Delete.onclick = (e) => {
      let individual = e.target.value;
      if (individual == 0) {
        record.shift();
      } else {
        record.splice(individual, individual);
      }
      localStorage.setItem("record", JSON.stringify(record));
      location.href = "showForm.html";
    };
    buttonTd.appendChild(edit);
    buttonTd.appendChild(Delete);
    tr.appendChild(buttonTd);
  });
}
showData();

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

  console.log("IN");
  record = JSON.parse(localStorage.getItem("record"));

  let table = document.getElementById("userDetails");
  table.innerHTML = "";

  let tr = document.createElement("tr");
  table.appendChild(tr);
  for (let item of record) {
    for (let element in item) {
      let th = document.createElement("th");
      let value = document.createTextNode(element.toUpperCase());
      th.appendChild(value);
      tr.appendChild(th);
    }
    let th = document.createElement("th");
    th.innerHTML = "Edit/Delete";
    tr.appendChild(th);

    break;
  }

  let button = document.createElement("button");
  button.setAttribute("value", "Edit");
  record.forEach((element, index) => {
    if (element.name.toLowerCase().includes(value.toLowerCase())) {
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
        console.log(individual);
        localStorage.setItem("individual", individual);
        location.href = "editDetails.html";
      };
      buttonTd.appendChild(edit);
      buttonTd.appendChild(Delete);
      tr.appendChild(buttonTd);
    }
  });
});
