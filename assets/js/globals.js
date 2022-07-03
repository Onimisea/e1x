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

console.log("This is from the globals...");

// global functions
/* 
export function request(url, data, callback) {
	const xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);

	 spinning or blinking loader

	var loader = document.createElement("div");
	loader.className = "loader";
	document.body.appendChild(loader);

	xhr.addEventListener("readystatechange", function () {
		if (xhr.readyState === 4) {
			if (callback) {
				callback(xhr.response);
			}
			 loader.remove();
		}
	});

	const formdata = data
		? data instanceof FormData
			? data
			: new FormData(document.querySelector(data))
		: new FormData();

	const csrfMetaTag = document.querySelector('meta[name="csrf_token"]');
	if (csrfMetaTag) {
		formdata.append("csrf_token", csrfMetaTag.getAttribute("content"));
	}

	xhr.send(formdata);
}

*/