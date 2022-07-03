import "./generalScript.js";

const searchUser = document.getElementById("search-user");

function page(pageId) {
	let query = searchUser.value;
	loadUsers(pageId, query);
}


function loadUsers(page, query = "") {
	const loadUser = new XMLHttpRequest();
	const fd = new FormData();
	fd.append("page", page);
	fd.append("query", query);

	loadUser.open("POST", "../pr/processes/loadusers.php", true);

	loadUser.onload = function () {
		if (loadUser.status === 200) {
			let usersTable = document.getElementById("users-table");
			usersTable.innerHTML = loadUser.responseText;
		}
	};

	loadUser.send(fd);
}


loadUsers(1);


searchUser.addEventListener("input", () => {
	let query = searchUser.value;
	
	loadUsers(1, query);
});