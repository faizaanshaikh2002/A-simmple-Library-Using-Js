let tableObj = JSON.parse(localStorage.getItem('table-data'));
if(tableObj == null){
    tableObj = [];
}
let tableBody = document.getElementById('tableBody');
tableObj.forEach(function (element) {
    let uiString = `<tr>
                        <td>${element.bname}</td>
                        <td>${element.bauthor}</td>
                        <td>${element.btype}</td>
                    </tr>`;
    console.log(element)
    tableBody.innerHTML += uiString;
})

console.log('Hii')

console.log('This is ES6 version of Project 2');
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    add(book) {
        console.log("Adding to UI");
        let tableBody = document.getElementById('tableBody');
        let uiString = `<tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                        </tr>`;
        tableBody.innerHTML += uiString;
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false
        }
        else {
            return true;
        }
    }

    savingTolocalStorage(book) {
        let data = {
            bname: book.name,
            bauthor: book.author,
            btype: book.type
        };

        let tableObj = JSON.parse(localStorage.getItem('table-data'))
        console.log(tableObj)
        if (tableObj == null) {
            tableObj = [data]
        }
        else {
            tableObj.push(data);
        }
        localStorage.setItem('table-data', JSON.stringify(tableObj));
        this.clear()
    }
    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if (type === 'success') {
            boldText = 'Success';
        }
        else {
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);

    }
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);


function libraryFormSubmit(e) {
    console.log('YOu have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');


    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();

    if (display.validate(book)) {

        display.add(book);
        display.savingTolocalStorage(book);
        display.clear();
        display.show('success', 'Your book has been successfully added')
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
    }

    e.preventDefault();
}
// savingTolocalStorage();
// function savingTolocalStorage(){
//     let name = document.getElementById('bookName').value;
//     let author = document.getElementById('author').value;
//     let type;
//     let fiction = document.getElementById('fiction');
//     let programming = document.getElementById('programming');
//     let cooking = document.getElementById('cooking');

//     if (fiction.checked) {
//         type = fiction.value;
//     }
//     else if (programming.checked) {
//         type = programming.value;
//     }
//     else if (cooking.checked) {
//         type = cooking.value;
//     }

//     let book1 = new Book(name, author, type);
//     console.log(book1);

//     let tableValues = localStorage.getItem('content')
//     if(tableValues == null){
//         tableObj = [];
//     }else{
//         tableObj = JSON.parse(tableValues);
//     }
//     tableObj.push([name, author, type]);
// }