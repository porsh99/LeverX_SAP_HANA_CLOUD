var mode = "";
var book = new Book();
var moc = new MOC();
var rowID = 0;

var xhr = new XMLHttpRequest();

function Start() {
    
    var url_string = window.location.href;
    var url = new URL(url_string);
    rowID = url.searchParams.get("rowID");
    mode = url.searchParams.get("mode");
    console.log(rowID + " " + mode);

    LoadDataToForm(rowID);
}


function LoadDataToForm(rowID) {
    if (mode === "edit") {
        console.log("edit mode ..." + rowID);

        var urlGetBook = ('http://localhost:3000/books/').concat(rowID);
        console.log(urlGetBook);

        xhr.open('GET', urlGetBook, false);
        xhr.send();

        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {

            var bookTableElement = JSON.parse(xhr.responseText);

            // console.log(bookTableElement);

            book = moc.GetBookFromObject(bookTableElement.data);
            console.log(book);

            UpBootToForm(book);

        }
    }
}

function UpBootToForm(_book) {
    var name = document.getElementById("book_name");
    var science = document.getElementById("book_science");
    var pagesCount = document.getElementById("book_count_of_pages");
    var publisherName = document.getElementById("book_publisher_name");
    var hindingType = "";
    var avaliability = document.getElementById("book_avliability");
    var authorName = document.getElementById("book_author_name");
    var onCD = document.getElementById("book_on_cd");
    var onDVD = document.getElementById("book_on_dvd");

    var radios = document.getElementsByName('hinding_type');

    name.value = _book.getName();
    science.value = _book.getScience();
    pagesCount.value = _book.getPagesCount();
    publisherName.value = _book.getPusblisher();
    avaliability.value = _book.getAvaliability();
    authorName.value = _book.getAuthor();
    onCD.checked = _book.getOnCD();
    onDVD.checked = _book.getOnDVD();

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].value === _book.getHindingType()) {
            radios[i].checked = true;
            console.log("Select ragio " + _book.getHindingType());
            break;
        }
    }

}

function Book(_name, _science, _pagesCount, _publicher, _hindingType, _avaliability, _author, _onCD, _onDVD) {

    this.name = _name;
    this.science = _science;
    this.pagesCount = _pagesCount;
    this.publicher = _publicher;
    this.hindingType = _hindingType;
    this.avaliability = _avaliability;
    this.author = _author;
    this.onCD = _onCD;
    this.onDVD = _onDVD;

    this.getName = function () {
        return this.name;
    }
    this.setName = function (value) {
        this.name = value;
    }

    this.getScience = function () {
        return this.science;
    }
    this.setScience = function (value) {
        this.science = value;
    }

    this.getPagesCount = function () {
        return this.pagesCount;
    }
    this.setPagesCount = function (value) {
        this.pagesCount = value;
    }

    this.getPusblisher = function () {
        return this.publicher;
    }
    this.setPublisher = function (value) {
        this.publicher = value;
    }

    this.getHindingType = function () {
        return this.hindingType;
    }
    this.setHindingType = function (value) {
        this.hindingType = value;
    }

    this.getAvaliability = function () {
        return this.avaliability;
    }
    this.setAvaliability = function (value) {
        this.avaliability = value;
    }


    this.getAuthor = function () {
        return this.author;
    }
    this.setAuthor = function (value) {
        this.author = value;
    }

    this.getOnCD = function () {
        return this.onCD;
    }
    this.setOnCD = function (value) {
        this.onCD = value;
    }

    this.getOnDVD = function () {
        return this.onDVD;
    }
    this.setOnDVD = function (value) {
        this.onDVD = value;
    }

    Book.prototype.toString = function () {
        return "\nName: " + this.name + "\nScience: " + this.science + "\nPageCount: " + this.pagesCount + "\nPublichser: " + this.publicher + " \nHindingType: " + this.hindingType + "\nAvaliability: " + this.avaliability + "\nAuthor: " + this.author + "\nOn CD: " + this.onCD + "\nOn DVD: " + this.onDVD;
    }
}

function MOC() {
    this.SerializeBOOK = function (_book) {
        return JSON.stringify(_book);
    }

    this.DeserializeBook = function (_serializeBook) {
        var desBook = JSON.parse(_serializeBook);
        var book = new Book(desBook.name, desBook.science,
            desBook.pagesCount,
            desBook.publicher,
            desBook.hindingType,
            desBook.avaliability,
            desBook.author,
            desBook.onCD,
            desBook.onDVD);
        return book;
    }

    this.GetBookFromObject = function (desBook) {
        var book = new Book(desBook.name, desBook.science,
            desBook.pagesCount,
            desBook.publicher,
            desBook.hindingType,
            desBook.avaliability,
            desBook.author,
            desBook.onCD,
            desBook.onDVD);
        return book;
    }
}

function UpdateData() {

    UpdateBookData();

    var DataToUpdate = function (_id, _data) {
        this.id = _id;
        this.data = _data;
    }

    var dataToUpdate = new DataToUpdate(rowID, book);

    if (mode === "edit")
    {
        xhr.open('PUT', 'http://localhost:3000/books/' + rowID);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(dataToUpdate));

        alert("Update row");
    }
    else if (mode === "add")
    {
        xhr.open('POST', 'http://localhost:3000/books');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(dataToUpdate));

        alert("Add new row");
    }
    else
    {
        alert('Error: incorent MODE of work');
    }
}

function UpdateBookData() {
    var name = document.getElementById("book_name").value;
    var science = document.getElementById("book_science").value;
    var pagesCount = document.getElementById("book_count_of_pages").value;
    var publisherName = document.getElementById("book_publisher_name").value;
    var hindingType = "";
    var avaliability = document.getElementById("book_avliability").value;
    var authorName = document.getElementById("book_author_name").value;
    var onCD = document.getElementById("book_on_cd").checked;
    var onDVD = document.getElementById("book_on_dvd").checked;

    var radios = document.getElementsByName('hinding_type');

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            hindingType = radios[i].value;
            break;
        }
    }

    book = new Book(name, science, pagesCount, publisherName, hindingType, avaliability, authorName, onCD, onDVD);
}

function GoBack()
{
    window.location.href = "index.html";
}