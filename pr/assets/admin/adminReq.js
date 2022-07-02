import "./generalScript.js";

const searchReq = document.getElementById("search-req");

function page(pageId) {
	let query = searchReq.value;
	loadReqs(pageId, query);
}


function loadReqs(page, query = "") {
	const loadReq = new XMLHttpRequest();
	const fd = new FormData();
	fd.append("page", page);
	fd.append("query", query);

	loadReq.open("POST", "../pr/processes/loadreqs.php", true);

	loadReq.onload = function () {
		if (loadReq.status === 200) {
			let reqsTable = document.getElementById("reqs-table");
			reqsTable.innerHTML = loadReq.responseText;
		}
	};

	loadReq.send(fd);
}


loadReqs(1);


searchReq.addEventListener("input", () => {
	let query = searchReq.value;
	
	loadReqs(1, query);
});