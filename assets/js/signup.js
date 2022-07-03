import "./general.js";

const pwd = document.getElementById("password");
const cnf_firm = document.getElementById("confirm-password");

const spi1 = document.getElementById("spi1");
const spi2 = document.getElementById("spi2");

spi1.addEventListener("click", () => {
	if (pwd.type === "password") {
		spi1.classList.add("fa-eye");
		spi1.classList.remove("fa-low-vision");
		pwd.type = "text";
	} else {
		spi1.classList.remove("fa-eye");
		spi1.classList.add("fa-low-vision");
		pwd.type = "password";
	}
});

spi2.addEventListener("click", () => {
	if (cnf_firm.type === "password") {
		spi2.classList.add("fa-eye");
		spi2.classList.remove("fa-low-vision");
		cnf_firm.type = "text";
	} else {
		spi2.classList.remove("fa-eye");
		spi2.classList.add("fa-low-vision");
		cnf_firm.type = "password";
	}
});

const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const phone = document.getElementById("phone");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmpassword = document.getElementById("confirm-password");
const referralcode = document.getElementById("referral-code");
const rewardprogram = document.getElementById("reward-program");
const country = document.getElementById("country");
const submit = document.getElementById("submit");
const regForm = document.getElementById("regForm");

submit.addEventListener("click", (e) => {
	e.preventDefault();
	if (
		firstname.value == "" ||
		lastname.value == "" ||
		phone.value == "" ||
		username.value == "" ||
		email.value == "" ||
		country.value == "" ||
		password.value == "" ||
		confirmpassword.value == "" ||
		rewardprogram.value == "null"
	) {
		alertBox.style.display = "block";
		alertBox.classList.remove("suc");
		alertBox.classList.add("err");
		alertBox.innerHTML = `All fields are REQUIRED except referral code!`;
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	} else if (password.value !== confirmpassword.value) {
		alertBox.style.display = "block";
		alertBox.classList.remove("suc");
		alertBox.classList.add("err");
		alertBox.innerHTML = `Password does not match!`;
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	} else {
		alertBox.style.display = "block";
		alertBox.classList.remove("err");
		alertBox.classList.add("suc");
		alertBox.innerHTML = `Creating account...`;
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;

		const xhr = new XMLHttpRequest();
		const fd = new FormData();

		fd.append("fname", firstname.value);
		fd.append("lname", lastname.value);
		fd.append("phone", phone.value);
		fd.append("username", username.value);
		fd.append("email", email.value);
		fd.append("password", password.value);
		fd.append("confirm-password", confirmpassword.value);
		fd.append("refcode", referralcode.value);
		fd.append("rewpro", rewardprogram.value);
		fd.append("country", country.value);

		xhr.open("POST", "processes/register.php", true);
		xhr.onload = function () {
			if (xhr.status === 200) {
				const res = xhr.responseText;
				console.log(res);

				if (
					res.includes("Invalid") ||
					res.includes("invalid") ||
					res.includes("could not be") ||
					res.includes("does not")
				) {
					alertBox.style.display = "block";
					alertBox.classList.remove("suc");
					alertBox.classList.add("err");
					alertBox.innerHTML = `${res}`;
					document.documentElement.scrollTop = 0;
					document.body.scrollTop = 0;
				} else {
					alertBox.style.display = "block";
					alertBox.classList.remove("err");
					alertBox.classList.add("suc");
					alertBox.innerHTML = `${res}`;
					document.documentElement.scrollTop = 0;
					document.body.scrollTop = 0;

					// regForm.reset();

					// setTimeout(() => {
					// 	alertBox.style.display = "none";
					// 	location.reload(true);
					// }, 2000);
				}
			}
		};

		xhr.send(fd);
	}
});
