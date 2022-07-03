let navToggle = document.getElementById("nav-toggle");
let sidebar = document.getElementById("sidebar");
let b2t = document.getElementById("b2t");

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

let inputname = document.getElementById("name");
let inputnameLabel = document.getElementById("name-label");
let inputemail = document.getElementById("email");
let inputemailLabel = document.getElementById("email-label");
let inputsubject = document.getElementById("subject");
let inputsubjectLabel = document.getElementById("subject-label");
let inputmessage = document.getElementById("message");
let inputmessageLabel = document.getElementById("message-label");

inputname.addEventListener("input", () => {
	if (inputname.value !== "") {
		inputnameLabel.style.opacity = 1;
		inputname.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";
	} else {
		inputnameLabel.style.opacity = 0;
		inputname.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
	}
});

inputemail.addEventListener("input", () => {
	if (inputemail.value !== "") {
		inputemailLabel.style.opacity = 1;
		inputemail.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";
	} else {
		inputemailLabel.style.opacity = 0;
		inputemail.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
	}
});

inputsubject.addEventListener("input", () => {
	if (inputsubject.value !== "") {
		inputsubjectLabel.style.opacity = 1;
		inputsubject.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";
	} else {
		inputsubjectLabel.style.opacity = 0;
		inputsubject.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
	}
});

inputmessage.addEventListener("input", () => {
	if (inputmessage.value !== "") {
		inputmessageLabel.style.opacity = 1;
		inputmessage.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";
	} else {
		inputmessageLabel.style.opacity = 0;
		inputmessage.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
	}
});
