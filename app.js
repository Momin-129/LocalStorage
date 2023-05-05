let record = JSON.parse(localStorage.getItem("record"));
let dataArray;
const form = document.querySelector("form");
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
