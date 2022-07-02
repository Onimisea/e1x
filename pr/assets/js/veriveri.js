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

let url = location.href;

if (url.includes("vericode=")) {
    const urlArr = url.split("=");
    const vericode = urlArr[1];
    
	document.getElementById("alertBox").style.display = "block";
	
	const xhr = new XMLHttpRequest();
	const fd = new FormData();

	fd.append("vericode", vericode);

	xhr.open("POST", "./pr/processes/verifyVericode.php", true);

	xhr.onload = function () {
		if (xhr.status === 200) {
		    alertBox.innerHTML = xhr.responseText;
		} else {
			console.log("connection failed!");
		}
	};

	xhr.send(fd);
}

