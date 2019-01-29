start();

function start() {
	var userName = prompt("Input your username");
	var isNumbersInUserName = checkForNumbers(userName);

	if (isNumbersInUserName) {
		alert(upperCharsAfterOne(userName));
	} else {
		alert(reverseStr(userName));
	}
	window.location.href='index.html';
}

function checkForNumbers(itemElem) {
	if (itemElem.search(/\d/) != -1) {
		return true;
	} else {
		return false;
	}
}

function reverseStr(str) {
	return str.split("").reverse().join("");
}

function upperCharsAfterOne(str) {
	var lStr = "";
	for (var i = 0; i < str.length; i++) {
		lStr += str[i];
		if (++i < str.length)
			lStr += str[i].toUpperCase();
	}
	return lStr;
}