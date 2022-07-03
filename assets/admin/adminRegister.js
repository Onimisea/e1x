import "./generalScript.js";

let firstname = document.getElementById("firstname");
let firstnameLabel = document.getElementById("firstname-label");
let lastname = document.getElementById("lastname");
let lastnameLabel = document.getElementById("lastname-label");
let email = document.getElementById("email");
let emailLabel = document.getElementById("email-label");
let username = document.getElementById("username");
let usernameLabel = document.getElementById("username-label");
let phonenumber = document.getElementById("phone-number");
let phonenumberLabel = document.getElementById("phonenumber-label");
let password = document.getElementById("password");
let passwordLabel = document.getElementById("password-label");
let confirmpassword = document.getElementById("confirm-password");
let confirmpasswordLabel = document.getElementById("confirmpassword-label");
let submit = document.getElementById("submitBtn");
let alertBox = document.getElementById("alertBox");
let pwdAlertBox = document.getElementById("pwdAlertBox");
let formLabel = document.querySelector(".form-label");


firstname.addEventListener("input", () => {
	if (firstname.value !== "") {
		firstnameLabel.style.opacity = 1;
		firstname.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";
	} else {
		firstnameLabel.style.opacity = 0;
		firstname.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
	}
});

lastname.addEventListener("input", () => {
	if (lastname.value !== "") {
		lastnameLabel.style.opacity = 1;
		lastname.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";
	} else {
		lastnameLabel.style.opacity = 0;
		lastname.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
	}
});

email.addEventListener("input", () => {
	if (email.value !== "") {
		emailLabel.style.opacity = 1;
		email.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";
	} else {
		emailLabel.style.opacity = 0;
		email.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
	}
});

username.addEventListener("input", () => {
	if (username.value !== "") {
		usernameLabel.style.opacity = 1;
		username.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";
		username.value = username.value.replace(/\s+/g, "");
	} else {
		usernameLabel.style.opacity = 0;
		username.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
	}
});

phonenumber.addEventListener("input", () => {
	if (phonenumber.value !== "") {
		phonenumberLabel.style.opacity = 1;
		phonenumber.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";
	} else {
		phonenumberLabel.style.opacity = 0;
		phonenumber.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
	}
});

password.addEventListener("input", () => {
	let pwdVal = password.value;

	if (password.value !== "") {
		passwordLabel.style.opacity = 1;
		password.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";

		const symbCheck = hasSymb(pwdVal);

		if (
			pwdVal.length < 6 ||
			pwdVal[0] !== pwdVal[0].toUpperCase() ||
			/\d/.test(pwdVal) === false ||
			symbCheck === false
		) {
			pwdAlertBox.style.display = "block";
		} else {
			pwdAlertBox.style.display = "none";
		}
	} else {
		passwordLabel.style.opacity = 0;
		password.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
		pwdAlertBox.style.display = "none";
	}
});

confirmpassword.addEventListener("input", () => {
	let pwdVal = confirmpassword.value;

	if (confirmpassword.value !== "") {
		confirmpasswordLabel.style.opacity = 1;
		confirmpassword.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";
		pwdAlertBox.style.display = "block";

		const symbCheck = hasSymb(pwdVal);

		if (
			pwdVal.length < 6 ||
			pwdVal[0] !== pwdVal[0].toUpperCase() ||
			/\d/.test(pwdVal) === false ||
			symbCheck === false
		) {
			pwdAlertBox.style.display = "block";
		} else {
			pwdAlertBox.style.display = "none";
		}
	} else {
		confirmpasswordLabel.style.opacity = 0;
		confirmpassword.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
		pwdAlertBox.style.display = "none";
	}
});

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

submit.addEventListener("click", (e) => {
	e.preventDefault();
	
	const validated = validateInputs();

		setTimeout(() => {
			if (validated) {
				sendData(
					firstname.value,
					lastname.value,
					email.value,
					username.value,
					phonenumber.value,
					password.value,
					file.files[0],
				);
			}
		}, 2000);
});

function validateInputs() {
	if (firstname.value == "") {
		alertBox.style.display = "block";
		alertBox.classList.add("err");
		alertBox.innerHTML = `First name is required`;
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	} else if (lastname.value == "") {
		alertBox.style.display = "block";
		alertBox.classList.add("err");
		alertBox.innerHTML = `Last name is required`;
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	} else if (email.value == "") {
		alertBox.style.display = "block";
		alertBox.classList.add("err");
		alertBox.innerHTML = `Email is required`;
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	} else if (username.value == "") {
		alertBox.style.display = "block";
		alertBox.classList.add("err");
		alertBox.innerHTML = `Username is required`;
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	} else if (phonenumber.value == "") {
		alertBox.style.display = "block";
		alertBox.classList.add("err");
		alertBox.innerHTML = `Phone number is required`;
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	} else if (password.value == "") {
		alertBox.style.display = "block";
		alertBox.classList.add("err");
		alertBox.innerHTML = `Password is required`;
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	} else if (confirmpassword.value == "") {
		alertBox.style.display = "block";
		alertBox.classList.add("err");
		alertBox.innerHTML = `Confirm your password`;
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	} else if (password.value !== confirmpassword.value) {
		console.log(password);
		console.log(confirmpassword);
		alertBox.style.display = "block";
		alertBox.classList.add("err");
		alertBox.innerHTML = `Your password do not match!`;
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	} else if (file.value == "") {
		alertBox.style.display = "block";
		alertBox.classList.add("err");
		alertBox.innerHTML = `Choose a profile picture`;
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	} else {
		alertBox.style.display = "block";
		alertBox.classList.remove("err");
		alertBox.classList.add("suc");

		alertBox.innerHTML = `Registering <strong>${
			document.getElementById("username").value
		}</strong>, please wait...`;
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;

		resetInputLabels();

		return true;
	}
}

function hasSymb(pwdVal) {
	const symbs = "[|<>?:'\"{}[],./;\\=+-_)(*&^%$#@!~`]";
	let check = false;
	for (let x of symbs) {
		if (pwdVal.includes(x)) {
			check = true;
			return check;
		}
	}
	return check;
}

function sendData(
	firstname,
	lastname,
	email,
	username,
	phonenumber,
	password,
	file,
) {
	const xhr = new XMLHttpRequest();
	const fd = new FormData();

	fd.append("firstname", firstname);
	fd.append("lastname", lastname);
	fd.append("email", email);
	fd.append("username", username);
	fd.append("phonenumber", phonenumber);
	fd.append("password", password);
	fd.append("pp", file);

	xhr.open("POST", "./pr/processes/arp.php", true);

	xhr.onload = function () {
		if (xhr.status === 200) {
			console.log(xhr.responseText);
			errorCheck(xhr.responseText);
			successCheck(xhr.responseText);
		} else {
			console.log("connection failed!");
		}
	};

	xhr.send(fd);
}

function errorCheck(error) {
	if (error.includes("error:") && error.includes("taken")) {
		const errorArr1 = error.split("error:");
		const errorArr2 = errorArr1[1].split(" ");
		const username = errorArr2[0];

		alertBox.style.display = "block";
		alertBox.classList.add("err");
		alertBox.classList.remove("suc");

		alertBox.innerHTML = `<strong>${username}</strong> is already registered! Change your username.`;

		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	}

	if (error.includes("error:") && error.includes("notRegistered")) {
		const errorArr1 = error.split("error:");
		const errorArr2 = errorArr1[1].split(" ");
		const username = errorArr2[0];

		alertBox.style.display = "block";
		alertBox.classList.add("err");
		alertBox.classList.remove("suc");

		alertBox.innerHTML = `<strong>${username}</strong>, registration failed. Please try again.`;

		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	}

	if (error.includes("error:") && error.includes("notExist")) {
		const errorArr1 = error.split("error:");
		const errorArr2 = errorArr1[1].split(" ");
		const referrer = errorArr2[0];

		alertBox.style.display = "block";
		alertBox.classList.add("err");
		alertBox.classList.remove("suc");

		alertBox.innerHTML = `<strong>${referrer}</strong> that referred you does not have an account with us!`;

		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	}
	
	if (error.includes("error:") && error.includes("admins exceeded")) {
		const errorArr1 = error.split("error:");
		const errorArr2 = errorArr1[1].split(" ");
		const referrer = errorArr2[0];

		alertBox.style.display = "block";
		alertBox.classList.add("err");
		alertBox.classList.remove("suc");

		alertBox.innerHTML = `Can't register new <strong>Admin</strong>. Number of Admins reached! `;

		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	}
}

function successCheck(success) {
	if (success.includes("success:") && success.includes("registered")) {
		const successArr1 = success.split("success:");
		const successArr2 = successArr1[1].split(" ");
		const username = successArr2[0];

		alertBox.style.display = "block";
		alertBox.classList.remove("err");
		alertBox.classList.add("suc");

		alertBox.innerHTML = `<strong>${username}</strong>, registration successful`;

		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;

		document.getElementById("registerForm").reset();
		resetInputLabels();
		document.getElementById("submitBtn").style.backgroundColor =
			"var(--sec-color)";
	}
}

function resetInputLabels() {
	firstnameLabel.style.opacity = 0;
	firstname.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";

	lastnameLabel.style.opacity = 0;
	lastname.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";

	emailLabel.style.opacity = 0;
	email.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";

	usernameLabel.style.opacity = 0;
	username.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";

	phonenumberLabel.style.opacity = 0;
	phonenumber.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";

	passwordLabel.style.opacity = 0;
	password.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
	pwdAlertBox.style.display = "none";

	confirmpasswordLabel.style.opacity = 0;
	confirmpassword.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
	pwdAlertBox.style.display = "none";

	fileBtn.innerText = `choose a profile picture`;
	fileBtnLabel.style.background = "var(--pri-color)";
	fileBtnLabel.style.width = "60%";

	document.getElementById("profile-picture").style.display = "none";
}
