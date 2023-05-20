// Form Submission

function SubmitData(e) {
  let record = JSON.parse(localStorage.getItem("record")) ?? [];
  const form = document.querySelector("form");
  e.preventDefault();
  const formData = new FormData(form);
  const obj = Object.fromEntries(formData);
  console.log(obj);
  let Languages = formData.getAll("language");
  obj.language = Languages;
  console.log(obj);
  record.push(obj);
  localStorage.setItem("record", JSON.stringify(record));
  form.reset();

  document.getElementById("submit").disabled = true;
}

export { SubmitData };
