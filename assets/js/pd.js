let navToggle = document.getElementById("nav-toggle");
let sidebar = document.getElementById("sidebar");
let b2t = document.getElementById("b2t");

let verifyPinInput = document.getElementById("verifyPin");
let verifyPinInputLabel = document.getElementById("pin-label");

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

verifyPinInput.addEventListener("input", () => {
	if (verifyPinInput.value !== "") {
		verifyPinInputLabel.style.opacity = 1;
		verifyPinInput.style.borderBottom = "4px solid rgba(23, 48, 88, 0.7)";
	} else {
		verifyPinInputLabel.style.opacity = 0;
		verifyPinInput.style.borderBottom = "2px solid rgba(23, 48, 88, 0.5)";
	}
});

const submit = document.getElementById("submit");
const alertBox = document.getElementById("alertBox");

submit.addEventListener("click", (e)=>{
    e.preventDefault();
    if(verifyPinInput.value !== "") {
        const xhr = new XMLHttpRequest();
        const fd = new FormData();
        
        fd.append("subpin", verifyPinInput.value);

    	xhr.open("POST", "../pr/processes/verifyPin.php", true);
    
    	xhr.onload = function () {
    		if (xhr.status === 200) {
    			const res = xhr.responseText;
    			
    			if (res.includes("VERIFIED")) {
    			    alertBox.style.display = "block";
            		alertBox.classList.add("suc");
            		alertBox.classList.remove("err");
            		alertBox.innerHTML = "Pin is Valid and Available for use";
            		document.documentElement.scrollTop = 0;
            		document.body.scrollTop = 0;
    			}
    			
    			if (res.includes("USED")) {
    			    alertBox.style.display = "block";
            		alertBox.classList.add("err");
            		alertBox.classList.remove("suc");
            		alertBox.innerHTML = "Pin has already been USED!";
            		document.documentElement.scrollTop = 0;
            		document.body.scrollTop = 0;
    			}
    			
    			if (res.includes("WRONG") || res.includes("INVALID")) {
    			    alertBox.style.display = "block";
            		alertBox.classList.add("err");
            		alertBox.classList.remove("suc");
            		alertBox.innerHTML = "Wrong or Invalid Pin";
            		document.documentElement.scrollTop = 0;
            		document.body.scrollTop = 0;
    			}
    		}
    	};
    
    	xhr.send(fd);
    }
})



setInterval(() => {
	var xhr = new XMLHttpRequest();

	xhr.open("POST", "../pr/processes/loadpd2.php", true);

	xhr.onload = function () {
		if (xhr.status === 200) {
			let pdTable = document.getElementById("pdTable");
			pdTable.innerHTML = xhr.responseText;
		}
	};

	xhr.send();
}, 1000);
