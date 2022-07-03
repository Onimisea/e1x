import "./generalScript.js";
import "./mainTimer.js";

const crlCopied = document.getElementById("crl-copied");
const crlBtn = document.getElementById("crl-btn");
const referral_link = document.getElementById("crl_link");
const crlRefs = document.getElementById("crlReferrals");

function loadRefBox() {
	const refBox = new XMLHttpRequest();

	refBox.open("POST", "../pr/processes/refBox.php", true);

	refBox.onload = function () {
		if (refBox.status === 200) {
			const refBoxWrapper = document.getElementById("refBox");
			refBoxWrapper.innerHTML = refBox.responseText;
		}
	};

	refBox.send();
}

loadRefBox();

function getRefLink() {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "../pr/processes/getRefLink.php", true);
    
    xhr.onload = function () {
    	if (xhr.status === 200) {
    	    const res = xhr.responseText;
    	    
    		const crlLink = document.getElementById("crl_link");
    		
    		crlLink.innerHTML = res;
    	}
    };
    
    xhr.send();
}

getRefLink();

crlBtn.addEventListener("click", () => {
	navigator.clipboard.writeText(referral_link.innerText);
	referral_link.style.color = "#00007c";
	crlCopied.style.display = "block";
});

function loadLR() {
	const yfr = new XMLHttpRequest();

	yfr.open("POST", "../pr/processes/yfr2.php", true);

	yfr.onload = function () {
		if (yfr.status === 200) {
			crlRefs.innerHTML = yfr.responseText;
		}
	};

	yfr.send();
}

loadLR();