let navToggle = document.getElementById("nav-toggle");
let sidebar = document.getElementById("sidebar");
let acdBtn = document.getElementsByClassName("acdBtn");
let b2t = document.getElementById("b2t");
let verifyPinInput = document.getElementById("verifyPin");
let verifyPinInputLabel = document.getElementById("pin-label");

let inputname = document.getElementById("name");
let inputnameLabel = document.getElementById("name-label");
let inputemail = document.getElementById("email");
let inputemailLabel = document.getElementById("email-label");
let inputsubject = document.getElementById("subject");
let inputsubjectLabel = document.getElementById("subject-label");
let inputmessage = document.getElementById("message");
let inputmessageLabel = document.getElementById("message-label");

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

let i;
let activeArr = [];

for (i = 0; i < acdBtn.length; i++) {
	acdBtn[i].addEventListener("click", function () {
		let acdBtns = document.getElementsByClassName("acdBtn");

		for (i = 0; i < acdBtns.length; i++) {
			if (acdBtns[i].classList.contains("active")) {
				acdBtns[i].classList.remove("active");
				let acdPanel = acdBtns[i].nextElementSibling;
				acdPanel.style.display = "none";
			} else {
				this.classList.add("active");
				let acdPanel = this.nextElementSibling;
				acdPanel.style.display = "block";
			}

			if (acdBtns[i].classList.contains("active")) {
				this.classList.remove("active");
				this.nextElementSibling.style.display = "none";
			}
		}
	});
}

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

setInterval(() => {
	const xhr = new XMLHttpRequest();

	xhr.open("POST", "pr/processes/lr.php", true);

	xhr.onload = function () {
		if (xhr.status === 200) {
			const lrTable = document.getElementById("lrTable");
			lrTable.innerHTML = xhr.responseText;
		}
	};

	xhr.send();

	var xhr2 = new XMLHttpRequest();

	xhr2.open("GET", "pr/processes/te.php", true);

	xhr2.onprogress = function () {};

	xhr2.onload = function () {
		if (xhr2.status === 200) {
			const lwTable = document.getElementById("lwTable");
			lwTable.innerHTML = xhr2.responseText;
		}
	};

	xhr2.send();
}, 3000);
