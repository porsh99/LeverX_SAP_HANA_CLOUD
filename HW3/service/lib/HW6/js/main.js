var books = [];
var moc = new MOC();
var xhr = new XMLHttpRequest();
var booksTable;


function LoadBooks() {

    xhr.open('GET', 'http://localhost:3000/books', false);
    xhr.send();

    var tableBooks = document.getElementById("table-books");

    if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {

        booksTable = JSON.parse(xhr.responseText);

        for (var i = 0; i < booksTable.length; i++) {
            books.push(moc.GetBookFromObject(booksTable[i].data));
            tableBooks.appendChild(GetRowToBookTable(books[i], booksTable[i].id));
        }

        console.log(books);
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

    this.SerializeAudioBOOK = function (_audioBook) {
        return JSON.stringify(_audioBook);
    }
}

function GetRowToBookTable(book, rowID) {
    var row = document.createElement("tr");
    row.appendChild(GetTD(book.getName()));
    row.appendChild(GetTD(book.getScience()));
    row.appendChild(GetTD(book.getPagesCount()));
    row.appendChild(GetTD(book.getPusblisher()));
    row.appendChild(GetTD(book.getHindingType()));
    row.appendChild(GetTD(book.getAvaliability()));
    row.appendChild(GetTD(book.getAuthor()));
    row.appendChild(GetTD(book.getOnCD()));
    row.appendChild(GetTD(book.getOnDVD()));
    row.appendChild(GetEditTD(rowID));
    row.appendChild(GetDeleteTD(rowID));

    return row;
}

function GetTD(value) {
    var td = document.createElement("td");
    td.innerHTML = value;
    return td;
}

function GetEditTD(rowID) {
    var td = document.createElement("td");
    var button = document.createElement("button");
    button.innerHTML = "Edit";
    button.setAttribute("onclick", "EditRow(" + rowID + ")");
    td.appendChild(button)
    return td;
}


function GetDeleteTD(rowID) {
    var td = document.createElement("td");
    var button = document.createElement("button");
    button.innerHTML = "Delete";
    button.setAttribute("onclick", "DeleteRow(" + rowID + ")");
    td.appendChild(button)
    return td;
}


function EditRow(rowID) {
    var a = "form.html";
    rowID = rowID;
    window.location.href = (a + '?rowID=' + rowID + '&&mode=edit');
}

function DeleteRow(rowID) {
    var delRow = confirm("Do you want to delete row?");
    if (delRow) {
        xhr.open('DELETE', 'http://localhost:3000/books/' + rowID);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
    }
}

function AddBook() {
    var maxID = 0;
    for (var i = 0; i < booksTable.length; i++) {
        if (maxID < booksTable[i].id)
            maxID = booksTable[i].id;
    }

    var a = "form.html";
    window.location.href = (a + '?rowID=' + ++maxID + '&&mode=add');
}