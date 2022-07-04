let navToggle = document.getElementById("logo");
let sidebar = document.getElementById("sidebar");
let alertBox = document.getElementById("alertBox");

navToggle.addEventListener("click", () => {
	sidebar.classList.toggle("open");
});

/*
document.addEventListener("click", function (e) {
  if (e.target.id !== "sidebar" && e.target.id !== "nav-toggle") {
    sidebar.classList.remove("open");
  }
});*/
