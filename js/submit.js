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

  document.getElementById("btn").disabled = true;
  document.getElementById("showDetails").style.display = "none";
  document.getElementById("showBtn").style.display = "inline";
});
