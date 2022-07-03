import "./generalScript.js";

let username = document.getElementById("username");
let usernameLabel = document.getElementById("username-label");
let password = document.getElementById("password");
let passwordLabel = document.getElementById("password-label");

username.addEventListener("input", () => {
	if (username.value !== "") {
		usernameLabel.style.opacity = 1;
		username.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";
	} else {
		usernameLabel.style.opacity = 0;
		username.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
	}
});

password.addEventListener("input", () => {
	if (password.value !== "") {
		passwordLabel.style.opacity = 1;
		password.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";
	} else {
		passwordLabel.style.opacity = 0;
		password.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
	}
});

let submit = document.getElementById("submit");

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


submit.addEventListener("click", (e) => {
	e.preventDefault();

	const xhr = new XMLHttpRequest();
  const fd = new FormData();
  fd.append("username", username.value);
  fd.append("password", password.value);

	xhr.open("POST", "../pr/processes/alp.php", true);

	xhr.onload = function () {
		if (xhr.status === 200) {
      const res = xhr.responseText;

      if (res.includes("emptyUsername")) {
				alertBox.style.display = "block";
				alertBox.classList.add("err");
				alertBox.classList.remove("suc");

				alertBox.innerHTML = `Username cannot be empty`;

				document.documentElement.scrollTop = 0;
				document.body.scrollTop = 0;
			} else if (res.includes("emptyPassword")) {
				alertBox.style.display = "block";
				alertBox.classList.add("err");
				alertBox.classList.remove("suc");

				alertBox.innerHTML = `Password cannot be empty`;

				document.documentElement.scrollTop = 0;
				document.body.scrollTop = 0;
			} else {
        alertBox.style.display = "block";
				alertBox.classList.add("suc");
				alertBox.classList.remove("err");

				alertBox.innerHTML = `Logging in...`;

				document.documentElement.scrollTop = 0;
				document.body.scrollTop = 0;

                if (res.includes("invalidLogin")) {
					alertBox.style.display = "block";
					alertBox.classList.add("err");
					alertBox.classList.remove("suc");

					alertBox.innerHTML = `Invalid password`;

					document.documentElement.scrollTop = 0;
					document.body.scrollTop = 0;
				} else if (res.includes("noAccountFound")) {
					alertBox.style.display = "block";
					alertBox.classList.add("err");
					alertBox.classList.remove("suc");

					alertBox.innerHTML = `You're not registered with us`;

					document.documentElement.scrollTop = 0;
					document.body.scrollTop = 0;
				} else if (res.includes("loggedIn")) {
					alertBox.style.display = "block";
					alertBox.classList.add("suc");
					alertBox.classList.remove("err");

					alertBox.innerHTML = `Logged in successfully...`;

					document.documentElement.scrollTop = 0;
					document.body.scrollTop = 0;
				
					location.href = "../adminDashboard";
				}
      }
      
      
      
      console.log(res);
		} else {
			console.log("connection failed!");
		}
	};

	xhr.send(fd);
})
