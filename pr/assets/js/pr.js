let navToggle = document.getElementById("nav-toggle");
let sidebar = document.getElementById("sidebar");
let b2t = document.getElementById("b2t");

let alertBox = document.getElementById("alertBox");

let sendPr = document.getElementById("sendPr");
let prLabel = document.getElementById("pr-label");

let submit = document.getElementById("submit");
let submitNp = document.getElementById("submitNp");
let verifySub = document.getElementById("verifySub");

navToggle.addEventListener("click", () => {
	sidebar.classList.toggle("open");
	navToggle.classList.toggle("open");
});

document.addEventListener("click", function (e) {
	if (e.target.id !== "sidebar" && e.target.id !== "nav-toggle") {
		sidebar.classList.remove("open");
		navToggle.classList.remove("open");
	}
});

let showOnPix = 400;

const scrollContainer = () => {
	return document.documentElement || document.body;
};

document.addEventListener("scroll", () => {
	if (scrollContainer().scrollTop > showOnPix) {
		b2t.classList.add("show");
	} else {
		b2t.classList.remove("show");
	}
});

b2t.addEventListener("click", () => {
	document.documentElement.scrollTop = 0;
	document.body.scrollTop = 0;
});

sendPr.addEventListener("input", () => {
	if (sendPr.value !== "") {
		prLabel.style.opacity = 1;
		sendPr.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";
	} else {
		prLabel.style.opacity = 0;
		sendPr.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
	}
});

submit.addEventListener("click", (e) => {
	e.preventDefault();

	if (sendPr.value === "") {
		document.getElementById("alertBox").style.display = "block";
	} else {
		document.getElementById("alertBox").style.display = "none";

		let xhr = new XMLHttpRequest();
		let fd = new FormData();
		let username = sendPr.value;
		fd.append("username", username);

		xhr.open("POST", "./processes/password-reset.php", true);

		xhr.onprogress = function () {};

		xhr.onload = function () {
			if (xhr.status === 200) {
				alertBox.innerHTML = xhr.responseText;
				alertBox.classList.remove("err");
				alertBox.classList.add("suc");
				alertBox.style.display = "block";
				verifySub.style.display = "none";
			} else {
				alertBox.innerHTML = xhr.responseText;
				alertBox.classList.remove("suc");
				alertBox.classList.add("err");
				alertBox.style.display = "block";
			}
		};

		xhr.send(fd);
	}
});
