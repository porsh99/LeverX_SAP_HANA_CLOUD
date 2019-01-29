function serializeBookFromForm() {

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

    var book = new Book(name, science, pagesCount, publisherName, hindingType, avaliability, authorName, onCD, onDVD);

    var moc = new MOC();

    var book_serialize = moc.SerializeBOOK(book);
    var book_deserialize_object = moc.DeserializeBook(book_serialize);

    console.log(book_serialize);

    alert("Serialize object in JSON format:\n" + book_serialize + "\n\nDeserialize BOOK object:" + book_deserialize_object.toString());
}

function serializeAudiBookFromForm() {

    var name = document.getElementById("book_name").value;
    var science = document.getElementById("book_science").value;
    var pagesCount = document.getElementById("book_count_of_pages").value;
    var publisherName = document.getElementById("book_publisher_name").value;
    var hindingType = "";
    var avaliability = document.getElementById("book_avliability").value;
    var authorName = document.getElementById("book_author_name").value;
    var onCD = document.getElementById("book_on_cd").checked;
    var onDVD = document.getElementById("book_on_dvd").checked;
    var audioFormat = document.getElementById("audio_book_sound_format").value;

    var radios = document.getElementsByName('hinding_type');

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            hindingType = radios[i].value;
            break;
        }
    }

    var audioBook = new AudioBook(name, science, pagesCount, publisherName, hindingType, avaliability, authorName, onCD, onDVD, audioFormat);

    var moc = new MOC();

    var bookSerialize = moc.SerializeAudioBOOK(audioBook);
    var bookDeserializeObject = moc.DeserializeAudioBook(bookSerialize);

    console.log(bookSerialize);

    alert("Serialize object in JSON format:\n" + bookSerialize + "\n\nDeserialize Audio BOOK object:" + bookDeserializeObject.toString());
}

function serializeTextBookFromForm() {

    var name = document.getElementById("book_name").value;
    var science = document.getElementById("book_science").value;
    var pagesCount = document.getElementById("book_count_of_pages").value;
    var publisherName = document.getElementById("book_publisher_name").value;
    var hindingType = "";
    var avaliability = document.getElementById("book_avliability").value;
    var authorName = document.getElementById("book_author_name").value;
    var onCD = document.getElementById("book_on_cd").checked;
    var onDVD = document.getElementById("book_on_dvd").checked;
    var language = document.getElementById("text_book_language").value;

    var radios = document.getElementsByName('hinding_type');

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            hindingType = radios[i].value;
            break;
        }
    }

    var audioBook = new TextBook(name, science, pagesCount, publisherName, hindingType, avaliability, authorName, onCD, onDVD, language);

    var moc = new MOC();

    var bookSerialize = moc.SerializeTextBOOK(audioBook);
    var bookDeserializeObject = moc.DeserializeTextBook(bookSerialize);

    console.log(bookSerialize);

    alert("Serialize object in JSON format:\n" + bookSerialize + "\n\nDeserialize Text BOOK object:" + bookDeserializeObject.toString());
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

function AudioBook(_name, _science, _pagesCount, _publicher, _hindingType, _avaliability, _author, _onCD, _onDVD, _audioFormat) {

    Book.call(this, _name, _science, _pagesCount, _publicher, _hindingType, _avaliability, _author, _onCD, _onDVD);

    this.audioFormat = _audioFormat;

    this.getAudioFormat = function () {
        return this.audioFormat;
    }
    this.setAudioFormat = function (value) {
        this.audioFormat = value;
    }

    this.toString = function()
    {
        return "\nName: " + this.name + "\nScience: " + this.science + "\nPageCount: " + this.pagesCount + "\nPublichser: " + this.publicher + " \nHindingType: " + this.hindingType + "\nAvaliability: " + this.avaliability + "\nAuthor: " + this.author + "\nOn CD: " + this.onCD + "\nOn DVD: " + this.onDVD + "\nAudio Format: " + _audioFormat;
    }


}

function TextBook(_name, _science, _pagesCount, _publicher, _hindingType, _avaliability, _author, _onCD, _onDVD, _laguage) {

    Book.call(this,_name, _science, _pagesCount, _publicher, _hindingType, _avaliability, _author, _onCD, _onDVD);

    this.language = _laguage;

    this.getLanguage = function () {
        return this.language;
    }
    this.setLanguage = function (value) {
        this.language = value;
    }

    this.toString = function()
    {
        return "\nName: " + this.name + "\nScience: " + this.science + "\nPageCount: " + this.pagesCount + "\nPublichser: " + this.publicher + " \nHindingType: " + this.hindingType + "\nAvaliability: " + this.avaliability + "\nAuthor: " + this.author + "\nOn CD: " + this.onCD + "\nOn DVD: " + this.onDVD + "\nLanguage: " + _laguage;
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

    this.SerializeAudioBOOK = function (_audioBook) {
        return JSON.stringify(_audioBook);
    }

    this.DeserializeAudioBook = function (_serializeAudioBook) {
        var desAudioBook = JSON.parse(_serializeAudioBook);
        var audioBook = new AudioBook(desAudioBook.name,
            desAudioBook.science,
            desAudioBook.pagesCount,
            desAudioBook.publicher,
            desAudioBook.hindingType,
            desAudioBook.avaliability,
            desAudioBook.author,
            desAudioBook.onCD,
            desAudioBook.onDVD,
            desAudioBook.audioFormat);
        return audioBook;
    }

    this.SerializeTextBOOK = function (_textBook) {
        return JSON.stringify(_textBook);
    }

    this.DeserializeTextBook = function (_serializeTextBook) {
        var desTextBook = JSON.parse(_serializeTextBook);
        var textBook = new TextBook(desTextBook.name,
        desTextBook.science,
        desTextBook.pagesCount,
        desTextBook.publicher,
        desTextBook.hindingType,
        desTextBook.avaliability,
        desTextBook.author,
        desTextBook.onCD,
        desTextBook.onDVD,
        desTextBook.language);
        return textBook;
    }
}