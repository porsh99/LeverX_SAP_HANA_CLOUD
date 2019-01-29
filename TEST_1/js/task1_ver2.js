var cardParentContainerName = "content-container";
var cardContainerName = "content-container";

var cardBoxName = "card";
var cardContainerName = "card-container";
var cardHeaderName = "card-header";
var cardHeaderTextName = "card-header-text";
var cardDescName = "card-desc";
var cardFooterName = "card-footer";

var headerTextContent = "Муждународная сотрудничество во всех сферах дефтельности";
var descTextContent = "Lorem ipsum sit amet consectetur adipsiting elit. Sed magni expedita non in dolor recusandae,repellat officia at, fugit laboriosam incidunt desurant perspicitiantis sint atque eius decimus placeat necessitatibus coluptatem.";
var footerTextContent = "Try";



function generateCards() {

	for (var i = 0; i < 9; i++) {
		addCard(cardParentContainerName);
	}
}

function addCard(parentClassName) {

	var parentCardContainer = document.body.getElementsByClassName(parentClassName)[0];
	console.log(parentCardContainer);

	var headerText = document.createElement("text");
	var descText = document.createElement("text");
	var footerText = document.createElement("text");

	var card = document.createElement("div");
	var cardContainer = document.createElement("div");

	var divHeader = document.createElement("div");
	var divHeaderText = document.createElement("div");
	var divDesc = document.createElement("div");
	var divFooter = document.createElement("div");

	card.setAttribute("class", cardBoxName);

	cardContainer.setAttribute("class", cardContainerName);

	divHeader.setAttribute("class", cardHeaderName);
	divHeaderText.setAttribute("class", cardHeaderTextName);
	divDesc.setAttribute("class", cardDescName);
	divFooter.setAttribute("class", cardFooterName);


	divHeaderText.appendChild(headerText);
	divDesc.appendChild(descText);
	divFooter.appendChild(footerText);

	cardContainer.appendChild(divHeader);
	cardContainer.appendChild(divHeaderText);
	cardContainer.appendChild(divDesc);
	cardContainer.appendChild(divFooter);

	card.appendChild(cardContainer);

	parentCardContainer.appendChild(card);

	headerText.outerHTML = headerTextContent;
	descText.outerHTML = descTextContent;
	footerText.outerHTML = footerTextContent;



}