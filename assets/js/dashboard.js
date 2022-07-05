import "./general.js";

function loadRefBox() {
	const refBox = new XMLHttpRequest();

	refBox.open("POST", "processes/refBox.php", true);

	refBox.onload = function () {
		if (refBox.status === 200) {
			console.log(refBox.responseText);
			const refBoxWrapper = document.getElementById("refBox");
			refBoxWrapper.innerHTML = refBox.responseText;
		}
	};

	refBox.send();
}

loadRefBox();

function loadCards() {
	const cards = new XMLHttpRequest();

	cards.open("POST", "processes/dashcards.php", true);

	cards.onload = function () {
		if (cards.status === 200) {
			const dashCards = document.getElementById("cards");
			dashCards.innerHTML = cards.responseText;
		}
	};

	cards.send();
}

loadCards();

function loadYLR() {
	const yfr = new XMLHttpRequest();

	yfr.open("POST", "processes/ylr.php", true);

	yfr.onload = function () {
		if (yfr.status === 200) {
			const yfrTable = document.getElementById("ylr");
			yfrTable.innerHTML = yfr.responseText;
		}
	};

	yfr.send();
}

loadYLR();