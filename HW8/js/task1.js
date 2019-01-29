var data = [];

function start() {
    butGet();
}

function butGet() {
    clearTableData();
    if (getInfo()) {
        upDataToTable(data);
        //show("Load complete", true);
    }
}

function butSelect() {
    clearTableData();
    if (getInfoWithSelect()) {
        upDataToTable(data);
    }
}

function butCount() {
    var count = getCount();
    if (count != -1)
        show("Count of Airlines = " + count, true);
}

function butExpand()
{
    show("Sorry it doesn't work.", true);
    // clearTableData();
    // if (getInfoWithExpand()) {
    //     upDataToTable(data);
    // }
}

function butOrderBy()
{
    clearTableData();
    if (getInfoWithOrderBy()) {
        upDataToTable(data);
    }
}

function butSearch()
{
    clearTableData();
    if (getInfoWithSearchNamePart()) {
        upDataToTable(data);
    }
}

function butSkip()
{
    clearTableData();
    if (getInfoWithSkip()) {
        upDataToTable(data);
    }
}

function butTop()
{
    clearTableData();
    if (getInfoWithTop()) {
        upDataToTable(data);
    }
}

function butFilter()
{
    clearTableData();
    if (getInfoWithFilter()) {
        upDataToTable(data);
    }
}



function getInfo() {

    var resRequest = false;
    $.ajax({
        type: "get",
        async: false,
        url: "https://services.odata.org/V4/(S(4idfi5ct034lf3uarchiewav))/TripPinServiceRW/Airlines?$select=AirlineCode,Name&&$orderby=AirlineCode&&$top=8",
        success: function (_data) {
            data = _data.value;
            show("GET - Load data sucsess");
            resRequest = true;
        },
        error: function (xhr, textStatus, errorMessage) {
            show("ERROR: " + errorMessage);
        }
    });
    return resRequest;
}

function getInfoWithSelect() {

    var resRequest = false;
    $.ajax({
        type: "get",
        async: false,
        url: "https://services.odata.org/V4/(S(4idfi5ct034lf3uarchiewav))/TripPinServiceRW/Airlines?$select=AirlineCode",
        success: function (_data) {
            data = _data.value;
            show("GET - Load data sucsess");
            resRequest = true;
        },
        error: function (xhr, textStatus, errorMessage) {
            show("ERROR: " + errorMessage);
        }
    });
    return resRequest;
}

function getCount() {

    var count = -1;
    $.ajax({
        type: "get",
        async: false,
        url: "https://services.odata.org/V4/TripPinServiceRW/Airlines/$count",
        success: function (_data) {
            show("GET - Load data COUNT sucsess");
            count = _data;
        },
        error: function (xhr, textStatus, errorMessage) {
            show("ERROR: " + errorMessage);
        }
    });
    return count;
}

function getInfoWithExpand() {

    var resRequest = false;
    $.ajax({
        type: "get",
        async: false,
        url: "https://services.odata.org/V4/(S(4idfi5ct034lf3uarchiewav))/TripPinServiceRW/Airlines?$select=AirlineCode/Name&&$expand=AirlineCode",
        success: function (_data) {
            data = _data.value;
            show("GET - Load data sucsess");
            resRequest = true;
        },
        error: function (xhr, textStatus, errorMessage) {
            show("ERROR: " + errorMessage);
        }
    });
    return resRequest;
}

function getInfoWithOrderBy() {

    var resRequest = false;
    $.ajax({
        type: "get",
        async: false,
        url: "https://services.odata.org/V4/(S(4idfi5ct034lf3uarchiewav))/TripPinServiceRW/Airlines?$orderby=Name",
        success: function (_data) {
            data = _data.value;
            show("GET - Load data sucsess");
            resRequest = true;
        },
        error: function (xhr, textStatus, errorMessage) {
            show("ERROR: " + errorMessage);
        }
    });
    return resRequest;
}

function getInfoWithSearchNamePart() {

    var resRequest = false;
    $.ajax({
        type: "get",
        async: false,
        url: "https://services.odata.org/V4/(S(4idfi5ct034lf3uarchiewav))/TripPinServiceRW/Airlines?$search=China",
        success: function (_data) {
            data = _data.value;
            show("GET - Load data sucsess");
            resRequest = true;
        },
        error: function (xhr, textStatus, errorMessage) {
            show("ERROR: " + errorMessage);
        }
    });
    return resRequest;
}

function getInfoWithSkip() {

    var resRequest = false;
    $.ajax({
        type: "get",
        async: false,
        url: "https://services.odata.org/V4/(S(4idfi5ct034lf3uarchiewav))/TripPinServiceRW/Airlines?$skip=8",
        success: function (_data) {
            data = _data.value;
            show("GET - Load data sucsess");
            resRequest = true;
        },
        error: function (xhr, textStatus, errorMessage) {
            show("ERROR: " + errorMessage);
        }
    });
    return resRequest;
}

function getInfoWithTop() {

    var resRequest = false;
    $.ajax({
        type: "get",
        async: false,
        url: "https://services.odata.org/V4/(S(4idfi5ct034lf3uarchiewav))/TripPinServiceRW/Airlines?$top=4",
        success: function (_data) {
            data = _data.value;
            show("GET - Load data sucsess");
            resRequest = true;
        },
        error: function (xhr, textStatus, errorMessage) {
            show("ERROR: " + errorMessage);
        }
    });
    return resRequest;
}

function getInfoWithFilter() {

    var resRequest = false;
    $.ajax({
        type: "get",
        async: false,
        url: "https://services.odata.org/V4/(S(4idfi5ct034lf3uarchiewav))/TripPinServiceRW/Airlines?$filter=Name eq 'American Airlines' or Name eq 'Turkish Airlines' or Name eq 'Emirates'",
        success: function (_data) {
            data = _data.value;
            show("GET - Load data sucsess");
            resRequest = true;
        },
        error: function (xhr, textStatus, errorMessage) {
            show("ERROR: " + errorMessage);
        }
    });
    return resRequest;
}

function upDataToTable(_data) {
    var table = document.getElementById("table-data");
    for (var i = 0; i < _data.length; i++)
        table.appendChild(getRowToDataTable(_data[i]));

}

function getRowToDataTable(dataElement) {
    var row = document.createElement("tr");
    row.appendChild(getTD(dataElement.AirlineCode));
    row.appendChild(getTD(dataElement.Name));

    return row;
}

function getTD(value) {
    var td = document.createElement("td");
    td.innerHTML = value;
    return td;
}


function show(value, isAlert) {
    if (!isAlert) {
        console.log(value);
    } else {
        alert(value);
    }
}

function clearTableData() {
    var table = document.getElementById("table-data");

    while (table.childElementCount != 2) {
        table.removeChild(table.lastChild);
    }
}