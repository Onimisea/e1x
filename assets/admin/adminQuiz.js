import "./generalScript.js";

let searchQuestion = document.getElementById("search-question");
let pageLink = document.querySelector("pageLink");

function loadQuestions(page, query = "") {
	const loadQuestion = new XMLHttpRequest();
	const fd = new FormData();
	fd.append("page", page);
	fd.append("query", query);

	loadQuestion.open("POST", "../pr/processes/loadquestions.php", true);

	loadQuestion.onprogress = function () {};

	loadQuestion.onload = function () {
		if (loadQuestion.status === 200) {
			let questionsTable = document.getElementById("questions-table");
			questionsTable.innerHTML = loadQuestion.responseText;
		}
	};
 
	loadQuestion.send(fd);
}

loadQuestions(1);

searchQuestion.addEventListener("input", () => {
	let query = searchQuestion.value;
	loadQuestions(1, query);
});

function page(pageId) {
	let query = searchQuestion.value;
	loadQuestions(pageId, query);
}

const addQuizBtn = document.getElementById("addQuiz");
addQuizBtn.addEventListener("click", () => {
	const modal = document.getElementById("addQuizModal");
	addQuiz(modal);
});

function addQuiz(modal) {
	document.addEventListener("click", (e) => {
		if (e.target.id === "addQuiz") {
			openModal(modal);
		} else if (e.target.id === "modalClose") {
			closeModal(modal);
		} else {
			// closeModal(modal);
		}
	});

	const openModal = (modal) => {
		modal.classList.add("open");
		document.body.style.overflow = "hidden";
		let overlay = document.getElementById("modal-overlay");
		overlay.style.display = "block";
	};

	const closeModal = (modal) => {
		let overlay = document.getElementById("modal-overlay");
		overlay.style.display = "none";
		document.body.style.overflow = "auto";
		modal.classList.remove("open");
	};

	const submitBtn = document.getElementById("submitQuizBtn");
	submitBtn.addEventListener("click", (e) => {
		e.preventDefault();

    const alertBox = document.getElementById("alertBox");

		const modalBody = document.getElementById("aqModalBody");
		const question = document.getElementById("question");
		const optionA = document.getElementById("oa");
		const optionB = document.getElementById("ob");
		const optionC = document.getElementById("oc");
		const optionD = document.getElementById("od");
		const correctOption = document.getElementById("co");

		if (question.value == "") {
			alertBox.style.display = "block";
			alertBox.classList.add("err");
			alertBox.innerHTML = `Question cannot be empty`;
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
		} else if (
			optionA.value == "" ||
			optionB.value == "" ||
			optionC.value == "" ||
			optionD.value == "" ||
			correctOption.value == ""
		) {
			alertBox.style.display = "block";
			alertBox.classList.add("err");
			alertBox.innerHTML = `Options cannot be empty`;
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
		} else {
		    submitBtn.classList.add("btn-disabled");
			alertBox.classList.remove("err");
			alertBox.classList.remove("suc");
			alertBox.style.display = "none";

			const addQuiz = new XMLHttpRequest();
			const fd = new FormData();

			fd.append("question", question.value);
			fd.append("optionA", optionA.value);
			fd.append("optionB", optionB.value);
			fd.append("optionC", optionC.value);
			fd.append("optionD", optionD.value);
			fd.append("correctOption", correctOption.value);

			addQuiz.open("POST", "../pr/processes/addQuestion.php", true);
			addQuiz.onload = function () {
			    
				if (addQuiz.status === 200) {
					const res = addQuiz.responseText;
					
					if (res.includes("successfully")) {
						alertBox.style.display = "block";
						alertBox.classList.add("suc");
						alertBox.innerHTML = `Quiz added successfully.`;
						document.documentElement.scrollTop = 0;
						document.body.scrollTop = 0;
						location.reload(true);
						setTimeout(() => {
							document.getElementById("aqForm").reset();
							alertBox.classList.remove("err");
							alertBox.classList.remove("suc");
							alertBox.style.display = "none";
						}, 2000);
					}

					if (res.includes("failed")) {
						alertBox.style.display = "block";
						alertBox.classList.add("err");
						alertBox.innerHTML = `Quiz could not be added, try again.`;
						document.documentElement.scrollTop = 0;
						document.body.scrollTop = 0;
						location.reload(true);
				// 		setTimeout(() => {
				// 			document.getElementById("aqForm").reset();
				// 			alertBox.classList.remove("err");
				// 			alertBox.classList.remove("suc");
				// 			alertBox.style.display = "none";
				// 		}, 2000);
					}
				}
			};

			addQuiz.send(fd);
		}
	});
}

// function viewQuiz(id) {
// 	const qId = document.getElementById(id).getAttribute("id2");

// 	let modal;
// 	document.addEventListener("click", (e) => {
// 		if (e.target.id === id) {
// 			modal = document.getElementById("viewQuizModal");
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
// 	};

// 	const modalTitle = document.getElementById("vqModalTitle");
// 	const modalBody = document.getElementById("vqModalBody");

// 	modalTitle.innerHTML = `Question #${qId}`;

// 	const getQuiz = new XMLHttpRequest();
// 	const fd = new FormData();

// 	fd.append("id", qId);

// 	getQuiz.open("POST", "./data/getQuestion.php", true);
// 	getQuiz.onload = function () {
// 		if (getQuiz.status === 200) {
// 			modalBody.innerHTML = getQuiz.responseText;
// 		}
// 	};

// 	getQuiz.send(fd);
// }

// function editQuiz(id) {
// 	const qId = document.getElementById(id).getAttribute("id2");

// 	const modal = document.getElementById("editQuizModal");
// 	document.addEventListener("click", (e) => {
// 		if (e.target.id === id) {
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
// 	};

// 	const modalTitle = document.getElementById("eqModalTitle");
// 	const modalBody = document.getElementById("eqModalBody");
// 	const question = document.getElementById("equestion");
// 	const optionA = document.getElementById("eoptionA");
// 	const optionB = document.getElementById("eoptionB");
// 	const optionC = document.getElementById("eoptionC");
// 	const optionD = document.getElementById("eoptionD");
// 	const correctOption = document.getElementById("ecorrectOption");

// 	modalTitle.innerHTML = `Edit Quiz #${qId}`;

// 	const getQuiz2edit = new XMLHttpRequest();
// 	const fd = new FormData();
// 	fd.append("id", qId);

// 	getQuiz2edit.open("post", "./data/getQuestion2edit.php", true);
// 	getQuiz2edit.onload = function () {
// 		if (getQuiz2edit.status === 200) {
// 			const quiz2edit = JSON.parse(getQuiz2edit.responseText);

// 			question.value = quiz2edit[0];
// 			optionA.value = quiz2edit[1];
// 			optionB.value = quiz2edit[2];
// 			optionC.value = quiz2edit[3];
// 			optionD.value = quiz2edit[4];
// 			correctOption.value = quiz2edit[5];
// 		}
// 	};
// 	getQuiz2edit.send(fd);

// 	const editQuizBtn = document.getElementById("saveQuiz");
// 	editQuizBtn.addEventListener("click", (e) => {
// 		e.preventDefault();

// 		const modalBody = document.getElementById("aqModalBody");
//     const alertBox = document.getElementById("alertBox");

// 		if (question.value == "") {
// 			alertBox.style.display = "block";
// 			alertBox.classList.add("err");
// 			alertBox.innerHTML = `Question cannot be empty`;
// 			document.documentElement.scrollTop = 0;
// 			document.body.scrollTop = 0;
// 		} else if (
// 			optionA.value == "" ||
// 			optionB.value == "" ||
// 			optionC.value == "" ||
// 			optionD.value == "" ||
// 			correctOption.value == ""
// 		) {
// 			alertBox.style.display = "block";
// 			alertBox.classList.add("err");
// 			alertBox.innerHTML = `Options cannot be empty`;
// 			document.documentElement.scrollTop = 0;
// 			document.body.scrollTop = 0;
// 		} else {
// 			alertBox.classList.remove("err");
// 			alertBox.classList.remove("suc");
// 			alertBox.style.display = "none";

// 			const editQuiz = new XMLHttpRequest();
// 			const fd = new FormData();

// 			fd.append("id", id);
// 			fd.append("question", question.value);
// 			fd.append("optionA", optionA.value);
// 			fd.append("optionB", optionB.value);
// 			fd.append("optionC", optionC.value);
// 			fd.append("optionD", optionD.value);
// 			fd.append("correctOption", correctOption.value);

// 			editQuiz.open("POST", "./data/editQuestion.php", true);
// 			editQuiz.onload = function () {
// 				if (editQuiz.status === 200) {
// 					const res = editQuiz.responseText;
// 					if (res.includes("successfully")) {
// 						alertBox.style.display = "block";
// 						alertBox.classList.add("suc");
// 						alertBox.innerHTML = `Quiz edited successfully.`;
// 						document.documentElement.scrollTop = 0;
// 						document.body.scrollTop = 0;
// 						setTimeout(() => {
// 							document.getElementById("aqForm").reset();
// 							alertBox.classList.remove("err");
// 							alertBox.classList.remove("suc");
// 							alertBox.style.display = "none";
// 							closeModal(modal);
// 							location.reload(true);
// 						}, 2000);
// 					}

// 					if (res.includes("failed")) {
// 						alertBox.style.display = "block";
// 						alertBox.classList.add("err");
// 						alertBox.innerHTML = `Quiz could not be edited, try again.`;
// 						document.documentElement.scrollTop = 0;
// 						document.body.scrollTop = 0;
// 						setTimeout(() => {
// 							document.getElementById("aqForm").reset();
// 							alertBox.classList.remove("err");
// 							alertBox.classList.remove("suc");
// 							alertBox.style.display = "none";
// 							closeModal(modal);
// 							location.reload(true);
// 						}, 2000);
// 					}
// 				}
// 			};

// 			editQuiz.send(fd);
// 		}
// 	});
// }

// function deleteQuiz(id) {
// 	const qId = document.getElementById(id).getAttribute("id2");

// 	let modal;
// 	document.addEventListener("click", (e) => {
// 		if (e.target.id === id) {
// 			modal = document.getElementById("deleteQuizModal");
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
// 	};

// 	const modalTitle = document.getElementById("dqModalTitle");
// 	const modalBody = document.getElementById("dqModalBody");

// 	modalTitle.innerHTML = `Delete Quiz #${qId}`;
// 	modalBody.innerHTML = `<h3>Are you sure you want to delete this quiz?</h3>`;

// 	const deleteQuizBtn = document.getElementById("deleteQuizBtn");

// 	deleteQuizBtn.addEventListener("click", () => {
// 		const deleteQuiz = new XMLHttpRequest();
// 		const fd = new FormData();

// 		fd.append("id", qId);

// 		deleteQuiz.open("POST", "./data/deleteQuestion.php", true);
// 		deleteQuiz.onload = function () {
// 			if (deleteQuiz.status === 200) {
// 				const res = deleteQuiz.responseText;
// 				if (res.includes("successfully")) {
// 					modalBody.classList.remove("err");
// 					modalBody.classList.add("suc");
// 					modalBody.style.padding = "20px";
// 					modalBody.innerHTML = `Quiz ${qId} deleted successfully.`;
// 					document.documentElement.scrollTop = 0;
// 					document.body.scrollTop = 0;
// 					setTimeout(() => {
// 						modalBody.innerHTML = ``;
// 						modalBody.classList.remove("suc");
// 						closeModal(modal);
// 						location.reload(true);
// 					}, 2000);
// 				}

// 				if (res.includes("failed")) {
// 					modalBody.classList.remove("suc");
// 					modalBody.classList.add("err");
// 					modalBody.style.padding = "20px";
// 					modalBody.innerHTML = `Quiz ${qId} could not be deleted, try again.`;
// 					document.documentElement.scrollTop = 0;
// 					document.body.scrollTop = 0;
// 					setTimeout(() => {
// 						modalBody.innerHTML = ``;
// 						modalBody.classList.remove("err");
// 						closeModal(modal);
// 						location.reload(true);
// 					}, 2000);
// 				}
// 			}
// 		};

// 		deleteQuiz.send(fd);
// 	});
// }