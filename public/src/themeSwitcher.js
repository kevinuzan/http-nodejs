window.addEventListener("load", () => {
  const tema = window.localStorage.getItem("theme");

  if (tema == "dark") {
    const bodys = document.querySelectorAll("body");

    bodys.forEach((body) => body.classList.toggle("dark-theme"));
  }
});

if ((buttonSwitcher = document.getElementById("theme-switcher-button"))) {
  if (!(theme = localStorage.getItem("theme")) || theme == "light") {
    buttonSwitcher.checked = false;
    localStorage.setItem("theme", "light");
  } else {
    buttonSwitcher.checked = true;
  }

  buttonSwitcher.addEventListener("change", () => {
    if (buttonSwitcher.checked) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
      return;
    }

    document.body.classList.remove("dark-theme");
    localStorage.setItem("theme", "light");
  });
}
