import "./general.js";

const spi = document.getElementById("spi");
const pwd = document.getElementById("password");

spi.addEventListener("click", () => {
	if (pwd.type === "password") {
		spi.classList.add("fa-eye");
		spi.classList.remove("fa-low-vision");
		pwd.type = "text";
	} else {
		spi.classList.remove("fa-eye");
		spi.classList.add("fa-low-vision");
		pwd.type = "password";
	}
});

const usrema = document.getElementById("usrema");
const password = document.getElementById("password");
const loginForm = document.getElementById("loginForm");
const alertBox = document.getElementById("alertBox");

submit.addEventListener("click", (e) => {
	e.preventDefault();
	if (usrema.value == "" || password.value == "") {
		alertBox.style.display = "block";
		alertBox.classList.remove("suc");
		alertBox.classList.add("err");
		alertBox.innerHTML = `All fields are REQUIRED!`;
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	} else {
		alertBox.style.display = "block";
		alertBox.classList.remove("err");
		alertBox.classList.add("suc");
		alertBox.innerHTML = `Logging in...`;
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;

		const xhr = new XMLHttpRequest();
		const fd = new FormData();

		fd.append("usrema", usrema.value);
		fd.append("password", password.value);

		xhr.open("POST", "processes/login.php", true);
		xhr.onload = function () {
			if (xhr.status === 200) {
				const res = xhr.responseText;
				console.log(res);

				if (
					res.includes("Invalid") ||
					res.includes("invalid") ||
					res.includes("could not be") ||
					res.includes("does not") ||
					res.includes("already")
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

					setTimeout(() => {
						alertBox.style.display = "none";
						loginForm.reset();
						location.href = "dashboard.php";
					}, 2000);
				}
			}
		};

		xhr.send(fd);
	}
});

const url = location.href;

if (url.includes("notLoggedIn")) {
	alertBox.style.display = "block";
	alertBox.classList.add("err");
	alertBox.classList.remove("suc");

	alertBox.innerHTML = `Login to access your dashboard`;

	document.documentElement.scrollTop = 0;
	document.body.scrollTop = 0;
}

if (url.includes("success=loggedOut")) {
	alertBox.style.display = "block";
	alertBox.classList.add("suc");
	alertBox.classList.remove("err");

	alertBox.innerHTML = `Logged out successfully`;

	document.documentElement.scrollTop = 0;
	document.body.scrollTop = 0;
}
