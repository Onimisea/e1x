let navToggle = document.getElementById("nav-toggle");
let sidebar = document.getElementById("sidebar");
let b2t = document.getElementById("b2t");

let alertBox = document.getElementById("alertBox");

let pwd = document.getElementById("pwd");
let pwdLabel = document.getElementById("pwd-label");
let cnfpwd = document.getElementById("cnf-pwd");
let cnfpwdLabel = document.getElementById("cnf-pwd-label");

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

pwd.addEventListener("input", () => {
	if (pwd.value !== "") {
		pwdLabel.style.opacity = 1;
		pwd.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";
	} else {
		pwdLabel.style.opacity = 0;
		pwd.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
	}
});

cnfpwd.addEventListener("input", () => {
	if (cnfpwd.value !== "") {
		cnfpwdLabel.style.opacity = 1;
		cnfpwd.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";
	} else {
		cnfpwdLabel.style.opacity = 0;
		cnfpwd.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
	}
});

submitNp.addEventListener("click", (e) => {
	e.preventDefault();

	const pwdValue = pwd.value;
	const cnfpwdValue = cnfpwd.value;
	const pwdSymbs = "|<;>?:'\"{}[\\],./;=+-_)(*&^%$#@!~`";

  let hasSymb = false;

	for (let x of pwd.value) {
		for (let y of pwdSymbs) {
			if (x === y) {
				hasSymb = true;
			}
		}
	}

	if (pwd.value === "" || null) {
		alertBox.style.display = "block";
	} else if (cnfpwd.value === "" || null) {
		alertBox.style.display = "block";
		alertBox.innerHTML = "Confirm your new password.";
	} else if (pwdValue.length < 6) {
		alertBox.style.display = "block";
		alertBox.innerHTML = "Password must be more than 6 characters.";
	} else if (!(pwdValue[0] == pwdValue[0].toUpperCase())) {
		alertBox.style.display = "block";
		alertBox.innerHTML = "Password must start with a Capital letter.";
	} else if (/\d/.test(pwdValue) == false) {
		alertBox.style.display = "block";
		alertBox.innerHTML = "Password must contain a number.";
	} else if (!hasSymb) {
		alertBox.style.display = "block";
		alertBox.innerHTML = "Password must contain a symbol.";
	} else if (!(pwd.value === cnfpwd.value)) {
		alertBox.style.display = "block";
		alertBox.innerHTML = "Your new password do not match.";
	} else {
		document.getElementById("alertBox").style.display = "none";

		let xhr = new XMLHttpRequest();
		let fd = new FormData();
		fd.append("newPassword", pwd.value);

		xhr.open("POST", "./processes/reset-password.php", true);

		xhr.onprogress = function () {};

		xhr.onload = function () {
			if (xhr.status === 200) {
        const res = xhr.responseText;

        alertBox.classList.remove("err");
				alertBox.classList.add("suc");
				alertBox.style.display = "block";
				verifySub.style.display = "none";

        if(res.includes("your new password is")) {
          alertBox.innerHTML = res;
          setTimeout(() => {
            alertBox.innerHTML = "Password changed!";
          }, 5000);
        }
			} else {
				alertBox.classList.remove("suc");
				alertBox.classList.add("err");
				alertBox.style.display = "block";
				alertBox.innerHTML = xhr.responseText;
			}
		};

		xhr.send(fd);
	}
});
