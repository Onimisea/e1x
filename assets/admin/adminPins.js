import "./generalScript.js";

function page(pageId) {
	let query = searchSub.value;
	loadPins(pageId, query);
}


function loadPins(page, query = "") {
	const loadPin = new XMLHttpRequest();
	const fd = new FormData();
	fd.append("page", page);
	fd.append("query", query);

	loadPin.open("POST", "../pr/processes/loadpins.php", true);

	loadPin.onload = function () {
		if (loadPin.status === 200) {
			let pinsTable = document.getElementById("pins-table");
			pinsTable.innerHTML = loadPin.responseText;
		}
	};

	loadPin.send(fd);
}


    loadPins(1);

const searchSub = document.getElementById("search-sub");
searchSub.addEventListener("input", () => {
	let query = searchSub.value;
	
	loadPins(1, query);
});

// const genPinBtn = document.getElementById("genPinBtn");

// genPinBtn.addEventListener("click", () => {
// 	const modal = document.getElementById("genPinsModal");
	
// 	document.addEventListener("click", (e) => {
// 		if (e.target.id === "genPinBtn") {
// 			openModal(modal);
// 		} else if (e.target.id === "modalClose") {
// 			closeModal(modal);
// 		} else {
// 			// closeModal(modal);
// 		}
// 	});

// 	const openModal = (modal) => {
// 		modal.classList.add("open");
// 		document.body.style.overflow = "hidden";
// 		let overlay = document.getElementById("modal-overlay");
// 		overlay.style.display = "block";
// 	};

// 	const closeModal = (modal) => {
// 		let overlay = document.getElementById("modal-overlay");
// 		let gpForm = document.getElementById("gpForm");
// 		let alertBox = document.getElementById("alertBox");
// 		overlay.style.display = "none";
// 		alertBox.classList.remove("err");
// 		alertBox.classList.remove("suc");
// 		alertBox.style.display = "none";
// 		document.body.style.overflow = "auto";
// 		modal.classList.remove("open");
// 		gpForm.reset();
// 	};
// });

// const generatePinBtn = document.getElementById("generatePinBtn");
// generatePinBtn.addEventListener("click", (e) => {
// 	e.preventDefault();

// 	if (
// 		subtype.value === "" ||
// 		subtype.value === null ||
// 		amount.value === "" ||
// 		amount.value === null
// 	) {
// 		alertBox.classList.add("err");
// 		alertBox.style.display = "block";
// 		alertBox.innerHTML = "All fields are required!";
// 	} else if (amount.value > 10000) {
// 		alertBox.classList.add("err");
// 		alertBox.style.display = "block";
// 		alertBox.innerHTML =
// 			"Amount of pins should not be more than 10000";
// 	} else {
// 		const pinGen = new XMLHttpRequest();
// 		const fd = new FormData();
// 		fd.append("subtype", subtype.value);
// 		fd.append("amount", amount.value);

// 		pinGen.open("post", "../pr/processes/pinGen.php", true);
// 		pinGen.onload = function () {
// 			if (pinGen.status === 200) {
// 				const res = pinGen.responseText;
// 				console.log(res);
// 				if (res.includes("generated successfully")) {
//                     alertBox.style.display = "block";
//                     alertBox.classList.add("suc");
//                 	alertBox.classList.remove("err");
                
//                 	alertBox.innerHTML = `Pins generated successfully!`;
                
//                 	document.documentElement.scrollTop = 0;
//                 	document.body.scrollTop = 0;
//                 }
// 				setTimeout(() => {
// 					location.reload(true);
// 				}, 3000);
// 			}
// 		};
// 		pinGen.send(fd);
// 	}
// });

