let record = JSON.parse(localStorage.getItem("record")) ?? [];

function sortBy(event) {
  let value = event.target.value;
  if (value == "name" || value == "email") {
    record.sort((a, b) => {
      let fa = a[value].toLowerCase(),
        fb = b[value].toLowerCase();

      if (fa < fb) return -1;
      else if (fa > fb) return 1;
      else return 0;
    });
  } else {
    record.sort(function (a, b) {
      return a.contact - b.contact;
    });
  }

  localStorage.setItem("record", JSON.stringify(record));
}

export { sortBy };
