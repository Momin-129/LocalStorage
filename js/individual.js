(function loadData() {
  let record = JSON.parse(localStorage.getItem("record"));
  let individual = parseInt(localStorage.getItem("individual"));
  let eachRecord = record[individual];
  let userInput = document.querySelectorAll("input,select");
  let languages = document.querySelectorAll("input[type='checkbox']");
  for (let item in eachRecord) {
    document.getElementById(item).value = eachRecord[item];
    if (item == "gender") {
      if (document.getElementById(item).value == eachRecord[item]) {
        document.getElementById(item).checked = true;
      }
    }
    if (item == "language") {
      eachRecord[item].forEach((lang) => {
        languages.forEach((language) => {
          if (language.value == lang) {
            language.checked = true;
          }
        });
      });
    }
  }
})();
