import { disableNQB, quizEnded, updateNQ } from "./userQuiz.js";
export function queTimer() {
	const stopQd = setInterval(() => {
		const getQT = new XMLHttpRequest();
		getQT.open("POST", "pr/processes/user/quizTimer.php", true);
		getQT.onload = function () {
			if (getQT.status === 200) {
				displayTime(getQT.responseText, stopQd);
			}
		};
		getQT.send();
	}, 1000);
}

function displayTime(quiztime, stopQd) {
	const qd = new Date(quiztime).getTime();
	let now = new Date().getTime();
	let timeDiff = qd - now;
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
		disableNQB();
		hours > 1 ? (hrsl = "hrs") : (hrsl = "hr");
		minutes > 1 ? (minsl = "mins") : (minsl = "min");
		seconds > 1 ? (secsl = "secs") : (secsl = "sec");
		const time = `${seconds + secsl}`;
		qt.innerHTML = time;
		qt.innerHTML = time;
		sessionStorage.setItem("quiz_started", 1);
	} else {
		clearInterval(stopQd);
		quizEnded();
		setTimeout(() => {
			updateNQ();
		}, 3000);
		sessionStorage.setItem("quiz_started", 0);
	}
}
