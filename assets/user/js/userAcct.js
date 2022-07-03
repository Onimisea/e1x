import "./generalScript.js";
import "./mainTimer.js";

function loadMA() {
	const xhr = new XMLHttpRequest();

	xhr.open("POST", "../pr/processes/ma.php", true);

	xhr.onload = function () {
		if (xhr.status === 200) {
		    const ma = document.getElementById("maw");
			ma.innerHTML = xhr.responseText;
		}
	};

	xhr.send();
}

loadMA();

function ppValidator(file) {
	if (
		file.type === "image/jpg" ||
		file.type === "image/jpeg" ||
		file.type === "image/png"
	) {
		return true;
	} else {
		return false;
	}
}

let alertBox = document.getElementById("alertBox");

setTimeout(()=>{
let file = document.getElementById("file");

let fileBtn = document.getElementById("file-btn");
let fileBtnLabel = document.getElementById("file-btn-label");
let pp = document.getElementById("profile-picture");

file.addEventListener("change", (e) => {
	const [file] = e.target.files;
	const { name: fileName, size } = file;
	const fileSize = (size / 1000).toFixed(2);
	const fileNameSize = `${fileName} - ${fileSize}KB`;

	const ppIsValid = ppValidator(file);

	if (ppIsValid) {
		alertBox.classList.remove("err");
		alertBox.classList.remove("suc");
		alertBox.style.display = "none";

		// console.log(fileName);

		const nfn1 = fileName.replace(/\s+/g, "");
		const nfn1Arr = nfn1.split(".");
		const nfn1Ext = nfn1Arr[1];

		// implementing file upload using JavaScript
		let i;
		let image = document.getElementById("profile-picture");
		image.style.display = "inline-block";
		image.src = URL.createObjectURL(e.target.files[0]);
		const imgInp = document.getElementById("file");
		if (imgInp.files.length > 0) {
			for (i = 0; i <= imgInp.files.length - 1; i++) {
				const fsize = imgInp.files.item(i).size;
				const file = Math.round(fsize / 1024);
			}
		}

		fileBtnLabel.innerText = `${fileNameSize}`;
		fileBtnLabel.style.background = "var(--pri-color)";
		fileBtnLabel.style.color = "#fff";
		fileBtnLabel.style.width = "100%";
	} else {
		alertBox.style.display = "block";
		alertBox.classList.add("err");
		alertBox.innerHTML = `Picture not supported, use a .jpg or .jpeg or .png picture`;
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	}
});
}, 2000)


setTimeout(()=>{
    const updfBtn = document.getElementById("updfBtn");
    const alertBox = document.getElementById("alertBox");
    
    updfBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        updfBtn.classList.add("btn-disabled");
        
        const file = document.getElementById("file");
        const firstname = document.getElementById("firstname");
        const lastname = document.getElementById("lastname");
        const states = document.getElementById("state");
        const acct_num = document.getElementById("acct_num");
        const acct_name = document.getElementById("acct_name");
        const acct_type = document.getElementById("acct_type");
        const bank_name = document.getElementById("bank_name");

        if (firstname.value === "" || lastname.value === "" || state.value === "" || acct_num.value === "" || acct_name.value === "" || acct_type.value === "" || bank_name.value === "") {
            alertBox.style.display = "block";
        		alertBox.classList.add("err");
        		alertBox.classList.remove("suc");
        		alertBox.innerHTML = "All fields are required!";
        		document.documentElement.scrollTop = 0;
        		document.body.scrollTop = 0;
        } else {
        	alertBox.classList.remove("err");
        	alertBox.classList.add("suc");
        	alertBox.style.display = "block";
        	
        	alertBox.innerHTML = "Updating...";
        	
        	const xhr = new XMLHttpRequest();
        	const fd = new FormData();
        
        	fd.append("firstname", firstname.value);
        	fd.append("lastname", lastname.value);
        	fd.append("state", state.value);
        	fd.append("pp", file.files[0]);
        	fd.append("acct_num", acct_num.value);
        	fd.append("acct_name", acct_name.value);
        	fd.append("acct_type", acct_type.value);
        	fd.append("bank_name", bank_name.value);
        
        	xhr.open("POST", "./pr/processes/updateUA.php", true);
        
        	xhr.onload = function () {
        		if (xhr.status === 200) {
        			const res = xhr.responseText;
        			setTimeout(()=>{
        			    alertBox.classList.remove("err");
                    	alertBox.classList.add("suc");
                    	alertBox.style.display = "block";
                    	
                    	alertBox.innerHTML = res;
        			}, 1500)
        		} else {
        			console.log("connection failed!");
        		}
        	};
        
        	xhr.send(fd);
        }
    })
}, 2000)


// upgBtn.addEventListener("click", ()=>{
//     let pin = upgPin.value;
//     const cspv = csp.innerText;
    
//     let upgs = "";
    
//     if(pin.includes("GLD:")) {
//         upgs = "Gold";
//     }
    
//     if(pin.includes("SIL:")) {
//         upgs = "Silver";
//     }
    
//     if(pin.includes("BRZ:")) {
//         upgs = "Bronze";
//     }
    
//     const xhr = new XMLHttpRequest();
//     const fd = new FormData();
    
//     fd.append("upgPin", pin);
//     fd.append("upgType", upgs);

//     xhr.open("POST", "../pr/processes/upg.php", true);
    
//     xhr.onload = function () {
//     	if (xhr.status === 200) {
//     	    const res = xhr.responseText;
    	    
//     	    if(res.includes("successfully")) {
//     	        upgBtn.style.background = "var(--success-color)";
//         		upgBtn.style.color = "#00007c";
//         		upgBtn.style.padding = "20px";
//         		upgBtn.innerHTML = res;
//     	    }
    	    
//     	    if(res.includes("Used or")) {
//     	        upgBtn.style.background = "var(--error-color)";
//         		upgBtn.style.color = "#fff";
//         		upgBtn.style.padding = "20px";
//         		upgBtn.innerHTML = res;
//     	    }
    	    
//     	    console.log(res);
//     	}
//     };
    
//     xhr.send(fd);
// })
