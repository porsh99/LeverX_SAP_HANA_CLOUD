function start() {
    var book = new Book('ASP.NET', 'C# .NET programming', 23, 'TUT.BY', false, true, 'Undefined :)', true, false);

    var book_serialize = book.toJSON();

    book_deserialize = JSON.parse(book_serialize);

    console.log(book_serialize + " return toJSON -  Serialize Data Object Type Book - INCORRECT ");
    console.log(book_deserialize + " first parse");
    console.log(book_deserialize.name);

    book = new DOTBook('ASP.NET', 'C# .NET programming', 23, 'TUT.BY', false, true, 'Undefined :)', true, false);
    console.log(JSON.stringify(book) + "  Serialize Data Object Type Book - NORMAL");

}


function Book(name, science, pagesCount, publicher, hindingType, avaliability, author, onCD, onDVD) {

    var book = new DOTBook(arguments);
    
    this.getName = function () {
        return book.name;
    }
    this.setName = function (value) {
        book.name = value;
    }

    this.getScience = function () {
        return book.science;
    }
    this.setScience = function (value) {
        book.science = value;
    }

    this.getPagesCount = function () {
        return book.pagesCount;
    }
    this.setPagesCount = function (value) {
        book.pagesCount = value;
    }

    this.getPusblisher = function () {
        return book.publicher;
    }
    this.setPublisher = function (value) {
        book.publicher = value;
    }

    this.getHindingType = function () {
        return book.hindingType;
    }
    this.setHindingType = function (value) {
        book.hindingType = value;
    }

    this.getAvaliability = function () {
        return book.avaliability;
    }
    this.setAvaliability = function (value) {
        book.avaliability = value;
    }


    this.getAuthor = function () {
        return book.author;
    }
    this.setAuthor = function (value) {
        book.author = value;
    }

    this.getOnCD = function () {
        return book.onCD;
    }
    this.setOnCD = function (value) {
        book.onCD = value;
    }

    this.getOnDVD = function () {
        return book.onDVD;
    }
    this.setOnDVD = function (value) {
        book.onDVD = value;
    }

    this.toJSON = function (value) {

        console.log(JSON.stringify(book));

        return JSON.stringify(book);
    }

}

function AudioBook(name, science, pagesCount, publicher, hindingType, avaliability, author, onCD, onDVD, audioFormat) {

    Book.call(this, name, science, pagesCount, publicher, hindingType, avaliability, author, onCD, onDVD);

    audioFormat = audioFormat;

    this.getAudioFormat = function () {
        return audioFormat;
    }
    this.setAudioFormat = function (value) {
        audioFormat = value;
    }


}

function TextBook(name, science, pagesCount, publicher, hindingType, avaliability, author, onCD, onDVD, laguage) {

    Book.call(this, name, science, pagesCount, publicher, hindingType, avaliability, author, onCD, onDVD);

    language = laguage;

    this.getLanguage = function () {
        return language;
    }
    this.setLanguage = function (value) {
        language = value;
    }

}


function DOTBook(_name, _science, _pagesCount, _publicher, _hindingType, _avaliability, _author, _onCD, _onDVD)
{
    this.name = _name;
    this.science = _science;
    this.pagesCount = _pagesCount;
    this.publicher = _publicher;
    this.hindingType = _hindingType;
    this.avaliability = _avaliability;
    this.author = _author;
    this.onCD = _onCD;
    this.onDVD = _onDVD;
}