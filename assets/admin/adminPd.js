import "./generalScript.js";

let searchPd = document.getElementById("search-pd");
let pageLink = document.querySelector("pageLink");

function loadDispatchers(page, query = "") {
	const loadPd = new XMLHttpRequest();
	const fd = new FormData();
	fd.append("page", page);
	fd.append("query", query);

	loadPd.open("POST", "../pr/processes/loadpd.php", true);

	loadPd.onload = function () {
		if (loadPd.status === 200) {
			let pdTable = document.getElementById("pd-table");
			pdTable.innerHTML = loadPd.responseText;
		}
	};

	loadPd.send(fd);
}

setInterval(()=>{
    loadDispatchers(1);
}, 1000)

searchPd.addEventListener("input", () => {
	let query = searchPd.value;
	
	loadDispatchers(1, query);
});



const addPdBtn = document.getElementById("addPd");

// addPdBtn.addEventListener("click", () => {
// 	const modal = document.getElementById("addPdModal");
// 	addPd(modal);
// });

// function addPd(modal) {
// 	document.addEventListener("click", (e) => {
// 		if (e.target.id === "addPd") {
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
// 		overlay.style.display = "none";
// 		document.body.style.overflow = "auto";
// 		modal.classList.remove("open");
// 		document.getElementById("pdForm").reset();
// 	};

// 	const submitBtn = document.getElementById("submitPdBtn");
// 	submitBtn.addEventListener("click", (e) => {
// 		e.preventDefault();

//     const alertBox = document.getElementById("alertBox");
    
//     const modalBody = document.getElementById("pdModalBody");
		
// 		const firstname = document.getElementById("firstname");
// 		const lastname = document.getElementById("lastname");
// 		const email = document.getElementById("email");
// 		const phonenumber = document.getElementById("phonenumber");

// 		if (firstname.value === "" || lastname.value === "" ||
// 			email.value === "" ||
// 			phonenumber.value === "") {
// 			alertBox.style.display = "block";
// 			alertBox.classList.add("err");
// 			alertBox.innerHTML = `All fields are required. None can be empty!`;
// 			document.documentElement.scrollTop = 0;
// 			document.body.scrollTop = 0;
// 		}  else {
// 			alertBox.classList.remove("err");
// 			alertBox.classList.add("suc");
// 			alertBox.style.display = "block";
			
// 			alertBox.innerHTML = `Adding <strong>${firstname.value}</strong>, please wait...`;
// 			document.documentElement.scrollTop = 0;
// 			document.body.scrollTop = 0;
			
// 			const addPd = new XMLHttpRequest();
// 			const fd = new FormData();

// 			fd.append("firstname", firstname.value);
// 			fd.append("lastname", lastname.value);
// 			fd.append("email", email.value);
// 			fd.append("phonenumber", phonenumber.value);

// 			addPd.open("POST", "../pr/processes/addDispatcher.php", true);
// 			addPd.onload = function () {
// 				if (addPd.status === 200) {
// 					const res = addPd.responseText;
					
// 					if (res.includes("added successfully")) {
// 						alertBox.style.display = "block";
// 						alertBox.classList.add("suc");
// 						alertBox.innerHTML = `Pin Dispatcher added successfully.`;
// 						document.documentElement.scrollTop = 0;
// 						document.body.scrollTop = 0;
// 						setTimeout(() => {
// 							document.getElementById("pdForm").reset();
// 							alertBox.classList.remove("err");
// 							alertBox.classList.remove("suc");
// 							alertBox.style.display = "none";
// 						}, 2000);
// 					}

// 					if (res.includes("failed")) {
// 						alertBox.style.display = "block";
// 						alertBox.classList.add("err");
// 						alertBox.innerHTML = `Pin Dispatcher could not be added, try again.`;
// 						document.documentElement.scrollTop = 0;
// 						document.body.scrollTop = 0;
// 					}
// 				}
// 			};

// 			addPd.send(fd);
// 		}
// 	})
// }

