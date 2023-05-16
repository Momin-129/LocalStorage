let record = JSON.parse(localStorage.getItem("record")) ?? [];

function sortBy(event) {
  let value = event.target.value;
  if (value == "name") {
    record.sort((a, b) => {
      let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();

      if (fa < fb) return -1;
      else if (fa > fb) return 1;
      else return 0;
    });
  } else if (value == "email") {
    record.sort((a, b) => {
      let fa = a.email.toLowerCase(),
        fb = b.email.toLowerCase();

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
