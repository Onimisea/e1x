import "./generalScript.js";

function loadCards() {
	const cards = new XMLHttpRequest();

	cards.open("POST", "../pr/processes/adc.php", true);

	cards.onload = function () {
		if (cards.status === 200) {
			const dashCards = document.getElementById("cards");
			dashCards.innerHTML = cards.responseText;
		}
	};

	cards.send();
}

loadCards();

function loadLR() {
	const yfr = new XMLHttpRequest();

	yfr.open("POST", "../pr/processes/lr.php", true);

	yfr.onload = function () {
		if (yfr.status === 200) {
			const lrTable = document.getElementById("lfr");
			lrTable.innerHTML = yfr.responseText;
		}
	};

	yfr.send();
}

loadLR();

function loadTE() {
	const dashte = new XMLHttpRequest();

	dashte.open("POST", "../pr/processes/dashte.php", true);

	dashte.onprogress = function () {};

	dashte.onload = function () {
		if (dashte.status === 200) {
			const teTable = document.getElementById("te");
			teTable.innerHTML = dashte.responseText;
		}
	};

	dashte.send();
}

loadTE();