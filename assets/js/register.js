import "./globals.js";
import { request } from "./globals.js";

import { statesArr } from "./states.js";
const state = document.getElementById("state");

function getStates() {
	for (let stateId in statesArr) {
		const option = document.createElement("option");
		option.setAttribute("value", `${statesArr[stateId]}`);
		option.innerText = `${statesArr[stateId]}`;
		state.appendChild(option);
	}
}

getStates();

let file = document.getElementById("file");
let fileBtn = document.getElementById("file-btn");
let fileBtnLabel = document.getElementById("file-btn-label");
let pp = document.getElementById("profile-picture");

file.addEventListener("change", (e) => {
	const [file] = e.target.files;
	const { name: fileName, size } = file;
	const fileSize = (size / 1000).toFixed(2);
	const fileNameSize = `${fileName} - ${fileSize}KB`;
	const ppIsValid = ppValidator(file);

	if (ppIsValid) {
		alertBox.classList.remove("err");
		alertBox.classList.remove("suc");
		alertBox.style.display = "none";

		// console.log(fileName);

		const nfn1 = fileName.replace(/\s+/g, "");
		const nfn1Arr = nfn1.split(".");
		const nfn1Ext = nfn1Arr[1];

		// implementing file upload using JavaScript

		let i;
		let image = document.getElementById("profile-picture");
		image.style.display = "inline-block";
		image.src = URL.createObjectURL(e.target.files[0]);
		const imgInp = document.getElementById("file");

		if (imgInp.files.length > 0) {
			for (i = 0; i <= imgInp.files.length - 1; i++) {
				const fsize = imgInp.files.item(i).size;
				const file = Math.round(fsize / 1024);
			}
		}

		fileBtn.innerText = `${fileNameSize}`;
		fileBtnLabel.style.background = "var(--pri-color)";
		fileBtnLabel.style.width = "100%";
	} else {
		alertBox.style.display = "block";
		alertBox.classList.add("err");
		alertBox.innerHTML = `Picture not supported, use a .jpg or .jpeg or .png picture`;
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	}
});

function ppValidator(file) {
	if (
		file.type === "image/jpg" ||
		file.type === "image/jpeg" ||
		file.type === "image/png"
	) {
		return true;
	} else {
		return false;
	}
}

let subpin = document.getElementById("subpin");
let firstname = document.getElementById("firstname");
let lastname = document.getElementById("lastname");
let email = document.getElementById("email");
let username = document.getElementById("username");
let phonenumber = document.getElementById("phone-number");
let country = document.getElementById("country");
let stateOption = document.getElementsByTagName("option");
let password = document.getElementById("password");
let confirmpassword = document.getElementById("confirm-password");
let tos = document.getElementById("tos");
let alertBox = document.getElementById("alertBox");
let pwdAlertBox = document.getElementById("pwdAlertBox");

const regUrl = location.href;

const submitBtn = document.getElementById("submitBtn");
const registerForm = document.getElementById("registerForm");

const csrf_meta_tag = document.querySelector('meta[name="csrf_token"]');
var csrfToken;

if (csrf_meta_tag) {
	csrfToken = csrf_meta_tag.getAttribute("content");
}

submitBtn.addEventListener("click", (e) => {
	e.preventDefault();

	const xhr = new XMLHttpRequest();
	const fd = new FormData(registerForm);

	fd.append("csrfToken", csrfToken);
	fd.append("subpin", subpin.value);
	fd.append("fname", firstname.value);
	fd.append("lname", lastname.value);
	fd.append("email", email.value);
	fd.append("username", username.value);
	fd.append("pn", phonenumber.value);
	fd.append("state", state.value);
	fd.append("country", country.value);
	fd.append("pwd", password.value);
	fd.append("cnfpwd", confirmpassword.value);
	fd.append("pp", file.files[0]);
	fd.append("tos", tos.value);
	fd.append("regUrl", regUrl);

	xhr.open("POST", "pr/processes/user/register.php", true);
	xhr.onload = function () {
		if (xhr.status === 200) {
			const res = xhr.responseText;
			// const resp = res.split(" ");
			// console.log(resp);

			if (res.includes("Invalid")) {
				alertBox.style.display = "block";
				alertBox.classList.add("err");
				alertBox.classList.remove("suc");
				alertBox.innerHTML = `${res[0]}`;
				document.documentElement.scrollTop = 0;
				document.body.scrollTop = 0;
			}
			// if (res.includes("Invalid firstname")) {
			// 	alertBox.style.display = "block";
			// 	alertBox.classList.add("err");
			// 	alertBox.classList.remove("suc");
			// 	alertBox.innerHTML = `Invalid firstname`;
			// 	document.documentElement.scrollTop = 0;
			// 	document.body.scrollTop = 0;
			// }
			// if (res.includes("Invalid lastname")) {
			// 	alertBox.style.display = "block";
			// 	alertBox.classList.add("err");
			// 	alertBox.classList.remove("suc");
			// 	alertBox.innerHTML = `Invalid lastname`;
			// 	document.documentElement.scrollTop = 0;
			// 	document.body.scrollTop = 0;
			// }
			// if (res.includes("Invalid email")) {
			// 	alertBox.style.display = "block";
			// 	alertBox.classList.add("err");
			// 	alertBox.classList.remove("suc");
			// 	alertBox.innerHTML = `Invalid email`;
			// 	document.documentElement.scrollTop = 0;
			// 	document.body.scrollTop = 0;
			// }
			// if (res.includes("Email could not be verified")) {
			// 	alertBox.style.display = "block";
			// 	alertBox.classList.add("err");
			// 	alertBox.classList.remove("suc");
			// 	alertBox.innerHTML = `Email could not be verified`;
			// 	document.documentElement.scrollTop = 0;
			// 	document.body.scrollTop = 0;
			// }
			// if (res.includes("Invalid username")) {
			// 	alertBox.style.display = "block";
			// 	alertBox.classList.add("err");
			// 	alertBox.classList.remove("suc");
			// 	alertBox.innerHTML = `Invalid username`;
			// 	document.documentElement.scrollTop = 0;
			// 	document.body.scrollTop = 0;
			// }
			// if (res.includes("Invalid phone number")) {
			// 	alertBox.style.display = "block";
			// 	alertBox.classList.add("err");
			// 	alertBox.classList.remove("suc");
			// 	alertBox.innerHTML = `Invalid phone number`;
			// 	document.documentElement.scrollTop = 0;
			// 	document.body.scrollTop = 0;
			// }
			// if (res.includes("Invalid state")) {
			// 	alertBox.style.display = "block";
			// 	alertBox.classList.add("err");
			// 	alertBox.classList.remove("suc");
			// 	alertBox.innerHTML = `Invalid state`;
			// 	document.documentElement.scrollTop = 0;
			// 	document.body.scrollTop = 0;
			// }
			// if (res.includes("Invalid country")) {
			// 	alertBox.style.display = "block";
			// 	alertBox.classList.add("err");
			// 	alertBox.classList.remove("suc");
			// 	alertBox.innerHTML = `Invalid country`;
			// 	document.documentElement.scrollTop = 0;
			// 	document.body.scrollTop = 0;
			// }
			// if (res.includes("Invalid password")) {
			// 	alertBox.style.display = "block";
			// 	alertBox.classList.add("err");
			// 	alertBox.classList.remove("suc");
			// 	alertBox.innerHTML = `Invalid password! Password must start with a capital letter, more than 6 characters, contain a number and symbol`;
			// 	document.documentElement.scrollTop = 0;
			// 	document.body.scrollTop = 0;
			// }
			// if (res.includes("Password does not match")) {
			// 	alertBox.style.display = "block";
			// 	alertBox.classList.add("err");
			// 	alertBox.classList.remove("suc");
			// 	alertBox.innerHTML = `Password does not match`;
			// 	document.documentElement.scrollTop = 0;
			// 	document.body.scrollTop = 0;
			// }
			// if (res.includes("Username or email already exists")) {
			// 	alertBox.style.display = "block";
			// 	alertBox.classList.add("err");
			// 	alertBox.classList.remove("suc");
			// 	alertBox.innerHTML = `Username or email already exists`;
			// 	document.documentElement.scrollTop = 0;
			// 	document.body.scrollTop = 0;
			// }
			// if (res.includes("Invalid profile picture uploaded")) {
			// 	alertBox.style.display = "block";
			// 	alertBox.classList.add("err");
			// 	alertBox.classList.remove("suc");
			// 	alertBox.innerHTML = `Invalid profile picture uploaded`;
			// 	document.documentElement.scrollTop = 0;
			// 	document.body.scrollTop = 0;
			// }
			// if (res.includes("Referrer is not a user")) {
			// 	alertBox.style.display = "block";
			// 	alertBox.classList.add("err");
			// 	alertBox.classList.remove("suc");
			// 	alertBox.innerHTML = `Referrer is not a user`;
			// 	document.documentElement.scrollTop = 0;
			// 	document.body.scrollTop = 0;
			// }
			// if (res.includes("Registration failed")) {
			// 	alertBox.style.display = "block";
			// 	alertBox.classList.add("err");
			// 	alertBox.classList.remove("suc");
			// 	alertBox.innerHTML = `Registration failed`;
			// 	document.documentElement.scrollTop = 0;
			// 	document.body.scrollTop = 0;
			// }
			// if (res.includes("USED or invalid pin")) {
			// 	alertBox.style.display = "block";
			// 	alertBox.classList.add("err");
			// 	alertBox.classList.remove("suc");
			// 	alertBox.innerHTML = `USED or invalid pin`;
			// 	document.documentElement.scrollTop = 0;
			// 	document.body.scrollTop = 0;
			// }
			// if (res.includes("Invalid CSRF Token")) {
			// 	alertBox.style.display = "block";
			// 	alertBox.classList.add("err");
			// 	alertBox.classList.remove("suc");
			// 	alertBox.innerHTML = `Invalid CSRF Token`;
			// 	document.documentElement.scrollTop = 0;
			// 	document.body.scrollTop = 0;
			// }

			console.log(res);
		}
	};

	xhr.send(fd);
});

