import "./generalScript.js";
import "./mainTimer.js";

function loadRefBox() {
	const refBox = new XMLHttpRequest();

	refBox.open("POST", "pr/processes/user/refBox.php", true);

	refBox.onload = function () {
		if (refBox.status === 200) {
			const refBoxWrapper = document.getElementById("refBox");
			refBoxWrapper.innerHTML = refBox.responseText;
		}
	};

	refBox.send();
} 

function loadCards() {
	const cards = new XMLHttpRequest();

	cards.open("POST", "pr/processes/user/dashcards.php", true);

	cards.onload = function () {
		if (cards.status === 200) {
			const dashCards = document.getElementById("cards");
			dashCards.innerHTML = cards.responseText;
		}
	};

	cards.send();
}

function loadLR() {
	const yfr = new XMLHttpRequest();

	yfr.open("POST", "pr/processes/user/yfr.php", true);

	yfr.onload = function () {
		if (yfr.status === 200) {
			const yfrTable = document.getElementById("lfr");
			yfrTable.innerHTML = yfr.responseText;
		}
	};

	yfr.send();
}

function loadTE() {
	const dashte = new XMLHttpRequest();

	dashte.open("POST", "pr/processes/user/dashte.php", true);

	dashte.onprogress = function () {};

	dashte.onload = function () {
		if (dashte.status === 200) {
			const teTable = document.getElementById("te");
			teTable.innerHTML = dashte.responseText;
		}
	};

	dashte.send();
}

function loadDashboard() {
    loadRefBox();
	loadCards();
	loadLR();
	loadTE();
}

loadDashboard();