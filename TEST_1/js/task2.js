var parentContainerIDName = "chats-container";

var divImageBoxClassName = "chat-image-box";
var divTextBoxClassName = "chat-text-box";

var chatClassName = "chat";

var chatHeaderClassName = "chat-header";
var chatLastMessageClassName = "chat-last-message";

var headerTextContent = "Name Surname";
var lastMessageContent = " Last message...";
var chatImageSource = "img/car1.jpg";


var userAvatarSources = ['img/car1.jpg', 'img/car2.jpg', 'img/car3.jpg', 'img/car4.jpg', 'img/car5.jpg', 'img/car6.jpg', 'img/car7.jpg', 'img/car8.jpg', 'img/car9.jpg', 'img/car10.jpg', ];

var DELMeMESSAGeCONTENT = "Lorem ipsum sit amet consectetur adipsiting elit. Sed magni expedita non in dolor recusandae,repellat officia at, fugit laboriosam incidunt desurant perspicitiantis sint atque eius decimusplaceat necessitatibus coluptatem.";

var parentMessageContainerName = "chat-messages-container";

var ownAvatarSourseImage = 'img/car0.jpg';


var chatNames = ['Max Solidsky', 'Petter Parker', 'Tony Stark', 'Mad Max', 'Some One', 'Brus Banned', 'Work', 'Study', 'Preferences', 'Anonymus'];
var messages = [
	['hi', '..', 'help me with ....', 'hi, 5 min please...', 'ok', '..', 'oh? maby you see that too?', 'yes', '..', 'try that ...'],
	['1hi', '..', 'help me with ....', 'hi, 5 min please...', 'ok', '..', 'oh? maby you see that too?', 'yes', '..', 'try that ...'],
	['3hi', '..', 'help me with ....', 'hi, 5 min please...', 'ok', '..', 'oh? maby you see that too?', 'yes', '..', 'try that ...'],
	['4hi', '..', 'help me with ....', 'hi, 5 min please...', 'ok', '..', 'oh? maby you see that too?', 'yes', '..', 'try that ...'],
	['5hi', '..', 'help me with ....', 'hi, 5 min please...', 'ok', '..', 'oh? maby you see that too?', 'yes', '..', 'try that ...'],
	['6hi', '..', 'help me with ....', 'hi, 5 min please...', 'ok', '..', 'oh? maby you see that too?', 'yes', '..', 'try that ...'],
	['7hi', '..', 'help me with ....', 'hi, 5 min please...', 'ok', '..', 'oh? maby you see that too?', 'yes', '..', 'try that ...'],
	['8hi', '..', 'help me with ....', 'hi, 5 min please...', 'ok', '..', 'oh? maby you see that too?', 'yes', '..', 'try that ...'],
	['9hi', '..', 'help me with ....', 'hi, 5 min please...', 'ok', '..', 'oh? maby you see that too?', 'yes', '..', 'try that ...'],
	['no messages']
];



function generateChats() {

	for (var i = 0; i < chatNames.length; i++) {
		generateChat(parentContainerIDName, i, userAvatarSources[i], chatNames[i], messages[i][messages[i].length-1]);
	}
}

function generateChat(parentContainerID, chatID, chatImageSource, chatName, chatLastMessage) {

	var parentContainer = document.getElementById(parentContainerID);
	//console.log(parentContainer);

	var headerText = document.createElement("text");
	var lastMessageText = document.createElement("text");
	var chatImage = document.createElement("img");

	var chat = document.createElement("div");

	var divImageBox = document.createElement("div");
	var divChatTextBox = document.createElement("div");

	var divChatHeader = document.createElement("div");
	var divChatLastMessage = document.createElement("div");


	chat.setAttribute("class", chatClassName);

	divImageBox.setAttribute("class", divImageBoxClassName);
	divChatTextBox.setAttribute("class", divTextBoxClassName);
	chatImage.setAttribute("src", chatImageSource);
	chatImage.setAttribute("onerror", chatImageSource);

	divChatHeader.setAttribute("class", chatHeaderClassName);
	divChatLastMessage.setAttribute("class", chatLastMessageClassName);

	chat.setAttribute("onclick", 'selectChat(' + chatID + ')');
	chatImage.setAttribute("onerror", "reloadToEmptyPhoto('" + chatImageSource + "')");

	divChatHeader.appendChild(headerText);
	divChatLastMessage.appendChild(lastMessageText);

	divChatTextBox.appendChild(divChatHeader);
	divChatTextBox.appendChild(divChatLastMessage);

	divImageBox.appendChild(chatImage);


	chat.appendChild(divImageBox);
	chat.appendChild(divChatTextBox);

	parentContainer.appendChild(chat);

	headerText.innerHTML = chatName;
	lastMessageText.innerHTML = chatLastMessage;
}

function generateChatMessages(parentContainerID, imageSource, messageTextContent) {
	var parentContainer = document.getElementById(parentContainerID);

	var divMessageBox = document.createElement("div");
	var divMessageImageBox = document.createElement("div");
	var divTryangleBox = document.createElement("div");
	var divMessageTextBox = document.createElement("div");

	var messageImage = document.createElement("img");
	var messageText = document.createElement("text");

	divMessageBox.setAttribute("class", "message-box");
	divMessageImageBox.setAttribute("class", "message-image-box");
	divTryangleBox.setAttribute("class", "triangle-container");
	divMessageTextBox.setAttribute("class", "message-text-box");

	messageImage.setAttribute("onerror", "reloadToEmptyPhoto('" + imageSource + "')");

	messageImage.setAttribute("src", imageSource);
	divMessageImageBox.appendChild(messageImage);

	divMessageTextBox.appendChild(messageText);

	divMessageBox.appendChild(divMessageImageBox);
	divMessageBox.appendChild(divTryangleBox);
	divMessageBox.appendChild(divMessageTextBox);

	parentContainer.appendChild(divMessageBox);

	messageText.outerHTML = messageTextContent;
}

function reloadToEmptyPhoto(imgSource) {
	var imagesOnPage = document.getElementsByTagName('img');

	for (var i = 0; i < imagesOnPage.length; i++) {
		if (imagesOnPage[i].hasAttribute('src')) {
			if (imagesOnPage[i].getAttribute('src') == imgSource) {
				imagesOnPage[i].setAttribute('src', 'img/noimage.png');
			}
		}
	}
}


function selectChat(chatNumber) {

	console.log(messages[chatNumber].length);

	clearChildren(parentMessageContainerName);

	if (messages[chatNumber].length > 0) {
		for (var i = 0; i < messages[chatNumber].length;) {

			if (messages[chatNumber][i] !== ".." && messages[chatNumber][i] !== "no messages")
				generateChatMessages(parentMessageContainerName, userAvatarSources[chatNumber], messages[chatNumber][i]);

			if (i+1 < messages[chatNumber].length && messages[chatNumber][i + 1] !== ".." && messages[chatNumber][i+1] !== "no messages") {
				generateChatMessages(parentMessageContainerName, ownAvatarSourseImage, messages[chatNumber][i + 1]);
			}
			i += 2;

		}
	}
}

function clearChildren(parentID)
{
	var parentContainer = document.getElementById(parentID);
	while (parentContainer.firstChild) {
		parentContainer.removeChild(parentContainer.firstChild);
	}
}