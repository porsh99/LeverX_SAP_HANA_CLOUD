

function goBack()
{
	window.location.href='index.html'
}

function showFlex()
{
	clearBody();

	var box = document.createElement("div");
	box.setAttribute("class", "flex-container");

	var image = document.createElement("img");
	image.setAttribute("src", "img/car.jpg");

	box.appendChild(image);
	document.getElementById("body").appendChild(box);
}

function clearBody(){
    var lista = document.body.childNodes;
    for (var i = lista.length - 2; i >= 0 ;i--){
        document.body.removeChild(lista[i])
    }
}