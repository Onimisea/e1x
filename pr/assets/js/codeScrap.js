// firstname.addEventListener("input", () => {
// 	if (firstname.value !== "") {
// 		firstnameLabel.style.opacity = 1;

// 		firstname.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";
// 	} else {
// 		firstnameLabel.style.opacity = 0;

// 		firstname.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
// 	}
// });

// lastname.addEventListener("input", () => {
// 	if (lastname.value !== "") {
// 		lastnameLabel.style.opacity = 1;

// 		lastname.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";
// 	} else {
// 		lastnameLabel.style.opacity = 0;

// 		lastname.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
// 	}
// });

// email.addEventListener("input", () => {
// 	if (email.value !== "") {
// 		emailLabel.style.opacity = 1;

// 		email.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";
// 	} else {
// 		emailLabel.style.opacity = 0;

// 		email.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
// 	}
// });

// username.addEventListener("input", () => {
// 	if (username.value !== "") {
// 		usernameLabel.style.opacity = 1;

// 		username.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";

// 		username.value = username.value.replace(/\s+/g, "");
// 	} else {
// 		usernameLabel.style.opacity = 0;

// 		username.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
// 	}
// });

// phonenumber.addEventListener("input", () => {
// 	if (phonenumber.value !== "") {
// 		phonenumberLabel.style.opacity = 1;

// 		phonenumber.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";
// 	} else {
// 		phonenumberLabel.style.opacity = 0;

// 		phonenumber.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
// 	}
// });

// states.addEventListener("change", () => {
// 	if (states.value !== "Choose Your State") {
// 		statesLabel.style.opacity = 1;

// 		states.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";
// 	} else {
// 		statesLabel.style.opacity = 0;

// 		states.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
// 	}
// });

// password.addEventListener("input", () => {
// 	let pwdVal = password.value;

// 	if (password.value !== "") {
// 		passwordLabel.style.opacity = 1;

// 		password.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";

// 		const symbCheck = hasSymb(pwdVal);

// 		if (
// 			pwdVal.length < 6 ||
// 			pwdVal[0] !== pwdVal[0].toUpperCase() ||
// 			/\d/.test(pwdVal) === false ||
// 			symbCheck === false
// 		) {
// 			pwdAlertBox.style.display = "block";
// 		} else {
// 			pwdAlertBox.style.display = "none";
// 		}
// 	} else {
// 		passwordLabel.style.opacity = 0;

// 		password.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";

// 		pwdAlertBox.style.display = "none";
// 	}
// });

// confirmpassword.addEventListener("input", () => {
// 	let pwdVal = confirmpassword.value;

// 	if (confirmpassword.value !== "") {
// 		confirmpasswordLabel.style.opacity = 1;

// 		confirmpassword.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";

// 		pwdAlertBox.style.display = "block";

// 		const symbCheck = hasSymb(pwdVal);

// 		if (
// 			pwdVal.length < 6 ||
// 			pwdVal[0] !== pwdVal[0].toUpperCase() ||
// 			/\d/.test(pwdVal) === false ||
// 			symbCheck === false
// 		) {
// 			pwdAlertBox.style.display = "block";
// 		} else {
// 			pwdAlertBox.style.display = "none";
// 		}
// 	} else {
// 		confirmpasswordLabel.style.opacity = 0;

// 		confirmpassword.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";

// 		pwdAlertBox.style.display = "none";
// 	}
// });

// let subpin = document.getElementById("subpin");

// let subpinLabel = document.getElementById("subpin-label");

// subpin.addEventListener("input", () => {
// 	if (subpin.value !== "") {
// 		subpinLabel.style.opacity = 1;

// 		subpin.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";
// 	} else {
// 		subpinLabel.style.opacity = 0;

// 		subpin.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
// 	}
// });

// submit.addEventListener("click", (e) => {
// 	e.preventDefault();

// 	validateSubpin();
// });

// function validateSubpin() {
// 	const subpin = document.getElementById("subpin").value;

// 	var pinSts;

// 	const verifyPin = new XMLHttpRequest();

// 	const fd = new FormData();

// 	fd.append("subpin", subpin);

// 	verifyPin.open("POST", "../pr/processes/verifyPin.php", true);

// 	verifyPin.onload = function () {
// 		if (verifyPin.status === 200) {
// 			const res = verifyPin.responseText;

// 			if (res.includes("VERIFIED")) {
// 				alertBox.style.display = "block";

// 				alertBox.classList.add("suc");

// 				alertBox.classList.remove("err");

// 				alertBox.innerHTML = res;

// 				document.documentElement.scrollTop = 0;

// 				document.body.scrollTop = 0;

// 				pinSts = 1;
// 			}

// 			if (res.includes("USED")) {
// 				alertBox.style.display = "block";

// 				alertBox.classList.add("err");

// 				alertBox.classList.remove("suc");

// 				alertBox.innerHTML = res;

// 				document.documentElement.scrollTop = 0;

// 				document.body.scrollTop = 0;

// 				pinSts = 0;
// 			}

// 			if (res.includes("WRONG")) {
// 				alertBox.style.display = "block";

// 				alertBox.classList.add("err");

// 				alertBox.classList.remove("suc");

// 				alertBox.innerHTML = res;

// 				document.documentElement.scrollTop = 0;

// 				document.body.scrollTop = 0;

// 				pinSts = 0;
// 			}

// 			if (res.includes("INVALID")) {
// 				alertBox.style.display = "block";

// 				alertBox.classList.add("err");

// 				alertBox.classList.remove("suc");

// 				alertBox.innerHTML = res;

// 				document.documentElement.scrollTop = 0;

// 				document.body.scrollTop = 0;

// 				pinSts = 0;
// 			}

// 			// 			if(pinSts === 1) {

// 			// 		        const validated = validateInputs();

// 			// 		        if(validated) {

// 			// 		            const url = location.href;

// 			// 		            if (url.includes("refer=")) {

// 			//                 		const urlArr = url.split("refer=");

// 			//                 		const referrer = urlArr[1];

// 			//                 		console.log(subpin);

// 			//                 	    sendData(

// 			//                 			firstname.value,

// 			//                 			lastname.value,

// 			//             				email.value,

// 			//         					username.value,

// 			//                 			phonenumber.value,

// 			//                 			country.value,

// 			//             				states.value,

// 			//         					password.value,

// 			//                 			subpin,

// 			//                 			file.files[0],

// 			//                 			tos.value,

// 			//                 			referrer

// 			//                 					// url,

// 			//                 					// errUrl,

// 			//                 					// error

// 			//                 			);

// 			//                 	} else {

// 			//                 		const referrer = "";

// 			//                 		const url = "";

// 			//                 		// const errUrl = "";

// 			//                 		// const error = "";

// 			//                 		console.log(subpin);

// 			//                 		sendData(

// 			//                 			firstname.value,

// 			//                 			lastname.value,

// 			//             				email.value,

// 			//         					username.value,

// 			//                 			phonenumber.value,

// 			//                 			country.value,

// 			//                 			states.value,

// 			//                 			password.value,

// 			//                 			subpin,

// 			//                 			file.files[0],

// 			//                 			tos.value,

// 			//                 			referrer

// 			//                 					// url,

// 			//                 					// errUrl,

// 			//                 					// error

// 			//                 			);

// 			//                 	}

// 			// 		        }

// 			// 			}
// 		}

// 		console.log(pinSts);

// 		if (pinSts === 1) {
// 			setTimeout(() => {
// 				const validated = validateInputs();

// 				console.log(validated);

// 				if (validated === false) {
// 					alertBox.style.display = "block";

// 					alertBox.classList.add("err");

// 					alertBox.classList.remove("suc");

// 					document.documentElement.scrollTop = 0;

// 					document.body.scrollTop = 0;
// 				} else {
// 					alertBox.style.display = "block";

// 					alertBox.classList.remove("err");

// 					alertBox.classList.add("suc");

// 					alertBox.innerHTML = `Registering <strong>${
// 						document.getElementById("username").value
// 					}</strong>, please wait...`;

// 					document.documentElement.scrollTop = 0;

// 					document.body.scrollTop = 0;

// 					setTimeout(() => {
// 						if (validated === true) {
// 							const url = location.href;

// 							if (url.includes("refer=")) {
// 								const urlArr = url.split("refer=");

// 								const referrer = urlArr[1];

// 								sendData(
// 									firstname.value,

// 									lastname.value,

// 									email.value,

// 									username.value,

// 									phonenumber.value,

// 									country.value,

// 									states.value,

// 									password.value,

// 									subpin,

// 									file.files[0],

// 									tos.value,

// 									referrer

// 									// url,

// 									// errUrl,

// 									// error
// 								);
// 							} else {
// 								const referrer = "";

// 								const url = "";

// 								sendData(
// 									firstname.value,

// 									lastname.value,

// 									email.value,

// 									username.value,

// 									phonenumber.value,

// 									country.value,

// 									states.value,

// 									password.value,

// 									subpin,

// 									file.files[0],

// 									tos.value,

// 									referrer

// 									// url,

// 									// errUrl,

// 									// error
// 								);
// 							}
// 						}
// 					}, 1500);
// 				}
// 			}, 1500);
// 		}
// 	};

// 	verifyPin.send(fd);
// }

// function validateInputs() {
// 	if (firstname.value == "") {
// 		alertBox.style.display = "block";

// 		alertBox.classList.add("err");

// 		alertBox.innerHTML = `First name is required`;

// 		document.documentElement.scrollTop = 0;

// 		document.body.scrollTop = 0;

// 		return false;
// 	} else if (lastname.value == "") {
// 		alertBox.style.display = "block";

// 		alertBox.classList.add("err");

// 		alertBox.innerHTML = `Last name is required`;

// 		document.documentElement.scrollTop = 0;

// 		document.body.scrollTop = 0;

// 		return false;
// 	} else if (email.value == "") {
// 		alertBox.style.display = "block";

// 		alertBox.classList.add("err");

// 		alertBox.innerHTML = `Email is required`;

// 		document.documentElement.scrollTop = 0;

// 		document.body.scrollTop = 0;

// 		return false;
// 	} else if (username.value == "") {
// 		alertBox.style.display = "block";

// 		alertBox.classList.add("err");

// 		alertBox.innerHTML = `Username is required`;

// 		document.documentElement.scrollTop = 0;

// 		document.body.scrollTop = 0;

// 		return false;
// 	} else if (phonenumber.value == "") {
// 		alertBox.style.display = "block";

// 		alertBox.classList.add("err");

// 		alertBox.innerHTML = `Phone number is required`;

// 		document.documentElement.scrollTop = 0;

// 		document.body.scrollTop = 0;

// 		return false;
// 	} else if (
// 		states.value == "Choose Your State" ||
// 		states.value == "" ||
// 		states.value == undefined ||
// 		states.value == null
// 	) {
// 		alertBox.style.display = "block";

// 		alertBox.classList.add("err");

// 		alertBox.innerHTML = `Your state of residence is required`;

// 		document.documentElement.scrollTop = 0;

// 		document.body.scrollTop = 0;

// 		return false;
// 	} else if (password.value == "") {
// 		alertBox.style.display = "block";

// 		alertBox.classList.add("err");

// 		alertBox.innerHTML = `Password is required`;

// 		document.documentElement.scrollTop = 0;

// 		document.body.scrollTop = 0;

// 		return false;
// 	} else if (confirmpassword.value == "") {
// 		alertBox.style.display = "block";

// 		alertBox.classList.add("err");

// 		alertBox.innerHTML = `Confirm your password`;

// 		document.documentElement.scrollTop = 0;

// 		document.body.scrollTop = 0;

// 		return false;
// 	} else if (password.value !== confirmpassword.value) {
// 		console.log(password);

// 		console.log(confirmpassword);

// 		alertBox.style.display = "block";

// 		alertBox.classList.add("err");

// 		alertBox.innerHTML = `Your password do not match!`;

// 		document.documentElement.scrollTop = 0;

// 		document.body.scrollTop = 0;

// 		return false;
// 	} else if (subpin.value == "") {
// 		alertBox.style.display = "block";

// 		alertBox.classList.add("err");

// 		alertBox.innerHTML = `Please enter your subscription pin`;

// 		document.documentElement.scrollTop = 0;

// 		document.body.scrollTop = 0;

// 		return false;
// 	} else if (file.value == "") {
// 		alertBox.style.display = "block";

// 		alertBox.classList.add("err");

// 		alertBox.innerHTML = `Choose a profile picture`;

// 		document.documentElement.scrollTop = 0;

// 		document.body.scrollTop = 0;

// 		return false;
// 	} else if (tos.checked == false) {
// 		alertBox.style.display = "block";

// 		alertBox.classList.add("err");

// 		alertBox.innerHTML = `Accept our Terms of Service & Privacy Policy`;

// 		document.documentElement.scrollTop = 0;

// 		document.body.scrollTop = 0;

// 		return false;
// 	} else {
// 		return true;
// 	}
// }

// function hasSymb(pwdVal) {
// 	const symbs = "[|<>?:'\"{}[],./;\\=+-_)(*&^%$#@!~`]";

// 	let check = false;

// 	for (let x of symbs) {
// 		if (pwdVal.includes(x)) {
// 			check = true;

// 			return check;
// 		}
// 	}

// 	return check;
// }

// function sendData(
// 	firstname,

// 	lastname,

// 	email,

// 	username,

// 	phonenumber,

// 	country,

// 	states,

// 	password,

// 	subpin,

// 	file,

// 	tos,

// 	referrer
// ) {
// 	const xhr = new XMLHttpRequest();

// 	const fd = new FormData();

// 	fd.append("firstname", firstname);

// 	fd.append("lastname", lastname);

// 	fd.append("email", email);

// 	fd.append("username", username);

// 	fd.append("phonenumber", phonenumber);

// 	fd.append("country", country);

// 	fd.append("state", states);

// 	fd.append("password", password);

// 	fd.append("subpin", subpin);

// 	fd.append("pp", file);

// 	fd.append("tos", tos);

// 	fd.append("referred_by", referrer);

// 	xhr.open("POST", "./pr/processes/registerProcess.php", true);

// 	xhr.onload = function () {
// 		if (xhr.status === 200) {
// 			errorCheck(xhr.responseText);

// 			successCheck(xhr.responseText);
// 		} else {
// 			console.log("connection failed!");
// 		}
// 	};

// 	xhr.send(fd);
// }

// function errorCheck(error) {
// 	if (error.includes("error:") && error.includes("taken")) {
// 		const errorArr1 = error.split("error:");

// 		const errorArr2 = errorArr1[1].split(" ");

// 		const username = errorArr2[0];

// 		alertBox.style.display = "block";

// 		alertBox.classList.add("err");

// 		alertBox.classList.remove("suc");

// 		alertBox.innerHTML = `<strong>${username}</strong> is already registered! Change your username.`;

// 		document.documentElement.scrollTop = 0;

// 		document.body.scrollTop = 0;
// 	}

// 	if (error.includes("error:") && error.includes("notRegistered")) {
// 		const errorArr1 = error.split("error:");

// 		const errorArr2 = errorArr1[1].split(" ");

// 		const username = errorArr2[0];

// 		alertBox.style.display = "block";

// 		alertBox.classList.add("err");

// 		alertBox.classList.remove("suc");

// 		alertBox.innerHTML = `<strong>${username}</strong>, registration failed. Please try again.`;

// 		document.documentElement.scrollTop = 0;

// 		document.body.scrollTop = 0;
// 	}

// 	if (error.includes("error:") && error.includes("notExist")) {
// 		const errorArr1 = error.split("error:");

// 		const errorArr2 = errorArr1[1].split(" ");

// 		const referrer = errorArr2[0];

		
// 	}
// }

// function successCheck(success) {
// 	if (success.includes("success:") && success.includes("registered")) {
// 		const successArr1 = success.split("success:");

// 		const successArr2 = successArr1[1].split(" ");

// 		const username = successArr2[0];

// 		resetInputLabels();

// 		alertBox.style.display = "block";

// 		alertBox.classList.remove("err");

// 		alertBox.classList.add("suc");

// 		alertBox.innerHTML = `<strong>${username}</strong>, registration successful. Check your email to verify your account.`;

// 		document.documentElement.scrollTop = 0;

// 		document.body.scrollTop = 0;

// 		document.getElementById("registerForm").reset();

// 		resetInputLabels();

// 		document.getElementById("submitBtn").style.backgroundColor =
// 			"var(--sec-color)";
// 	}
// }

// function resetInputLabels() {
// 	firstnameLabel.style.opacity = 0;

// 	firstname.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";

// 	lastnameLabel.style.opacity = 0;

// 	lastname.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";

// 	emailLabel.style.opacity = 0;

// 	email.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";

// 	usernameLabel.style.opacity = 0;

// 	username.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";

// 	phonenumberLabel.style.opacity = 0;

// 	phonenumber.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";

// 	statesLabel.style.opacity = 0;

// 	states.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";

// 	passwordLabel.style.opacity = 0;

// 	password.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";

// 	pwdAlertBox.style.display = "none";

// 	confirmpasswordLabel.style.opacity = 0;

// 	confirmpassword.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";

// 	pwdAlertBox.style.display = "none";

// 	fileBtn.innerText = `choose a profile picture`;

// 	fileBtnLabel.style.background = "var(--pri-color)";

// 	fileBtnLabel.style.width = "60%";

// 	document.getElementById("profile-picture").style.display = "none";

// 	subpinLabel.style.opacity = 0;

// 	subpin.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
// }

// 	if (url.includes("refer=")) {

// 		const urlArr = url.split("refer=");

// 		const referrer = urlArr[1];

// 		validateSubpin();

// 		setTimeout(() => {

// // 			if (validated) {

// 				// sendData(

// 				// 	firstname.value,

// 				// 	lastname.value,

// 				// 	email.value,

// 				// 	username.value,

// 				// 	phonenumber.value,

// 				// 	country.value,

// 				// 	states.value,

// 				// 	password.value,

// 				// 	subpin.value,

// 				// 	file.files[0],

// 				// 	tos.value,

// 				// 	// url,

// 				// 	referrer

// 				// 	// errUrl,

// 				// 	// error

// 				// );

// // 			}

// 		}, 2000);

// 	} else {

// // 		const validated = validateInputs();

// // 		console.log(validated);

// 		const referrer = "";

// 		const url = "";

// 		// const errUrl = "";

// 		// const error = "";

// 		setTimeout(() => {

// // 			if (validated) {

// 				// sendData(

// 				// 	firstname.value,

// 				// 	lastname.value,

// 				// 	email.value,

// 				// 	username.value,

// 				// 	phonenumber.value,

// 				// 	country.value,

// 				// 	states.value,

// 				// 	password.value,

// 				// 	subpin.value,

// 				// 	file.files[0],

// 				// 	tos.value,

// 				// 	// url,

// 				// 	referrer

// 				// 	// errUrl,

// 				// 	// error

// 				// );

// // 			}

// 		}, 2000);

// 	}
