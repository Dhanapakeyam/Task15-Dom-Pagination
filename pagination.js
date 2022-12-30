var res = new XMLHttpRequest();
res.open("GET", "https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json");
res.send();
var result;
var lastUsedbuttonValue;

res.onload = () => {
    result = JSON.parse(res.response);
    displayNavButton(10);

}




function displayNavButton(indexcount) {

    var heading = document.createElement("h1");
    heading.setAttribute("class", "text-center");
    heading.setAttribute("id", "title");
    heading.innerText = "PAGINATION";
    document.body.append(heading);


    var row1El = document.createElement("div");
    row1El.setAttribute("id", "buttons");
    row1El.setAttribute("style", "width:50%");
    row1El.setAttribute("class", "d-flex");
    row1El.classList.add("justify-content-center", "mx-auto");

    var navButtonContent = ["First", "Previous", "Next", "Last"];
    for (let i = 0; i < navButtonContent.length; i++) {
        var button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("class", "btn");
        button.classList.add("btn-primary", "m-1", "col-2");
        button.innerHTML = navButtonContent[i];
        button.addEventListener("click", checkClick);
        row1El.append(button);


    }



    for (let i = 0; i < indexcount; i++) {

        var button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("class", "btn");
        button.classList.add("btn-primary", "m-1", "col");
        button.innerHTML = `${i + 1}`;
        button.addEventListener("click", checkClick);
        row1El.append(button);

    }
    document.body.append(row1El);
}



function checkClick() {
    var clickedValue = this.innerHTML;

    if (clickedValue == "First") {
        buttonValue = 01;
    }
    else if (clickedValue == "Last") {
        buttonValue = 10;
    }
    else if ((clickedValue != "1") && (clickedValue == "Previous")) {
        buttonValue = +lastUsedbuttonValue - 1;
    }
    else if ((clickedValue != "10") && (clickedValue == "Next")) {
        buttonValue = +lastUsedbuttonValue + 1;
    }

    else {
        buttonValue = clickedValue;
    }

    lastUsedbuttonValue = buttonValue;
    displayTable(result, buttonValue);
}


function displayTable(apidata, buttonValue) {

    var remtag = document.getElementById("tableid");
    if (remtag) {
        remtag.remove();
    }

    var table = document.createElement("table");
    table.setAttribute("id", "tableid");
    table.setAttribute("class", "table");
    table.classList.add("table-bordered", "table-responsive", "w-50", "mx-auto");

    var tbody = document.createElement("tbody");
    var thead = document.createElement("thead");

    var th1 = document.createElement("th");
    th1.innerText = "id";
    var th2 = document.createElement("th");
    th2.innerText = "name";
    var th3 = document.createElement("th");
    th3.innerText = "email";
    var tr = document.createElement("tr");
    tr.append(th1, th2, th3);
    thead.append(tr);
    table.append(thead);

    for (let i = (buttonValue - 1) * 10; i < buttonValue * 10; i++) {

        var td1 = document.createElement("td");
        td1.innerHTML = apidata[i].id;
        var td2 = document.createElement("td");
        td2.innerHTML = apidata[i].name;
        var td3 = document.createElement("td");
        td3.innerHTML = apidata[i].email;

        var tr1 = document.createElement("tr");
        tr1.append(td1, td2, td3);
        tbody.append(tr1);

    }


    table.append(tbody);
    document.body.append(table);

}