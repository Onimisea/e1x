import { enableNQB } from "./userQuiz.js";

let timer = document.getElementById("timer");
let headerTimer = document.getElementById("headerTimer");

function displayTime(maintime) {
	const nq = new Date(maintime).getTime();
	let now = new Date().getTime();

	let timeDiff = nq - now;

	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;
	const week = day * 7;
	const month = week * 4.3;
	const year = month * 12;

	const yrs = Math.floor(timeDiff / year);
	const mnths = Math.floor((timeDiff % year) / month);
	const weeks = Math.floor((timeDiff % month) / week);
	const days = Math.floor((timeDiff % week) / day);
	const hours = Math.floor((timeDiff % day) / hour);
	const minutes = Math.floor((timeDiff % hour) / minute);
	const seconds = Math.floor((timeDiff % minute) / 1000);

	var hrsl = "";
	var minsl = "";
	var secsl = "";

	const url = location.href;

	if (timeDiff > -1) {
		hours > 1 ? (hrsl = "hrs") : (hrsl = "hr");
		minutes > 1 ? (minsl = "mins") : (minsl = "min");
		seconds > 1 ? (secsl = "secs") : (secsl = "sec");
		const time = `${hours + hrsl} : ${minutes + minsl} : ${seconds + secsl}`;

		timer.innerHTML = time;
		headerTimer.innerHTML = time;

		timer.style.pointerEvents = "none";
		headerTimer.style.pointerEvents = "none";

		timer.classList.add("tb");
		headerTimer.classList.add("tb");
		
		timer.classList.remove("btn-disabled");
    	headerTimer.classList.remove("btn-disabled");
	} else {
		if (url.includes(".com/userQuiz")) {
			timer.innerHTML = "Take Quiz";
			headerTimer.innerHTML = "Take Quiz";
			
			timer.classList.remove("tb");
    		headerTimer.classList.remove("tb");
    		
    		timer.classList.add("teb");
    		headerTimer.classList.add("teb");
    		
    		timer.classList.add("btn-disabled");
    		headerTimer.classList.add("btn-disabled");

		} else {
			timer.innerHTML = "Go to Quiz";
			headerTimer.innerHTML = "Go to Quiz";
			
			timer.classList.remove("tb");
    		headerTimer.classList.remove("tb");
    		
    		timer.classList.add("teb");
    		headerTimer.classList.add("teb");
    
    		timer.style.pointerEvents = "auto";
    		headerTimer.style.pointerEvents = "auto";
		}
	}
}

setInterval(() => {
	const getMT = new XMLHttpRequest();

	getMT.open("POST", "../pr/processes/mainTimer.php", true);

	getMT.onload = function () {
		if (getMT.status === 200) {

			displayTime(getMT.responseText);
		}
	};

	getMT.send();
}, 1000);

headerTimer.addEventListener("click", () => {
	manageClicks();
});

timer.addEventListener("click", () => {
	manageClicks();
});

function manageClicks() {
	const url = location.href;
	if (url.includes(".com/userQuiz")) {
		
	} else {
		location.href = "./userQuiz";
	}
}