const myLibrary = [];
const container = document.querySelector('.container');
// container and deleteButtons changes later
const booksDashboard = document.querySelector('.books-dashboard');
const formDialog = document.querySelector('.form-dialog');
const newBookButton = document.querySelector('.new-book'); 
const cancelDialogButton = formDialog.querySelector('.cancel'); 
const addBookDialogButton = formDialog.querySelector('.add');
const title = formDialog.querySelector('#title');
const author = formDialog.querySelector('#author');
const pages = formDialog.querySelector('#pages');
const form = formDialog.querySelector('form');
const booksRead = document.querySelector('.books-read');
const booksUnRead = document.querySelector('.books-unread');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

Book.prototype.info = function() {
    return {
        title: this.title,
        author: this.author,
        pages: this.pages,
        read: this.read,
    };
}

Book.prototype.markRead = function () {
    this.read = true;
}

// add book
function addBook(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
};

// delete book
function deleteBook(index) {
    if (+ index > -1) {
        // remove the book from the library array
        myLibrary.splice(index, 1); 
        // container.removeChild(booksDashboard);

        // display the remaining elements in the array to the booksDashboard
        displayBooks()
    }
}

// mark the book as read
function readBook(index) {
    if (+ index > -1) {
        let book = myLibrary.at(index);
        book.markRead();

        displayBooks();
    }
}

// update books read (each time the displayBooks() is triggered)
function updateBooksRead() {
    let alreadyRead = myLibrary.filter((book) => book.read);
    alreadyRead = alreadyRead.map((book) => book.title);

    // only run this if the array is not empty
    if (alreadyRead.toString()) {
        booksRead.textContent = alreadyRead.join(', ');
    } else {
        booksRead.textContent = 'None, go read some!'
    }
}

// update books read (each time the displayBooks() is triggered)
function updateBooksUnRead() {
    let unRead = myLibrary.filter((book) => !book.read);
    unRead = unRead.map((book) => book.title);
    if (unRead.toString()) {
        booksUnRead.textContent = unRead.join(', ');
    } else {
        booksUnRead.textContent = 'None, no books at all!'
    }
} 

// clear the dashboard
function clearBookDashboard() {
    let bookCards = Array.from(document.querySelectorAll('.book'));
    bookCards.forEach(book => {
        booksDashboard.removeChild(book);
    });
}

function displayBooks() {
    // clear the screen first, because previous books are also displaying and this function
    // replace the book dashboard with an empty dashboard
    clearBookDashboard();

    myLibrary.forEach((book) => {
        // rn adds on top of those books (redundancy) 
        let bookCard = document.createElement('div');
        bookCard.classList.toggle('book');
        
        bookInfo = book.info(); 
        bookCard.innerHTML = `<div class="title-container card-info-container">
                                <div class="card-label"> Title: </div>
                                <div class="title"> ${book.title} </div>
                              </div>
                              <div class="author-container card-info-container">
                                <div class="card-label"> Author: </div>
                                <div class="author"> ${book.author} </div>
                              </div>
                              <div class="pages-container card-info-container">
                                <div class="card-label"> Pages: </div>
                                <div class="pages"> ${book.pages} </div>
                              </div>
                              <div class="read-container card-info-container">
                                <div class="card-label"> Read: </div>
                                <div class="read"> ${book.read ? "Read" : "Unread"} </div>
                              </div>`;
        
        booksDashboard.appendChild(bookCard);

        // button container for add and delete
        buttonContainer = document.createElement('div');
        buttonContainer.classList.toggle('card-buttons');
        buttonContainer.setAttribute('id', `${myLibrary.indexOf(book)}`);
        
        // add a delete button to each book whose id = the index of book
        let deleteButton = document.createElement('button');
        deleteButton.classList.toggle('deleteButton');
        deleteButton.textContent = 'Delete Book';
        buttonContainer.appendChild(deleteButton);

        // add a read button to each book whose id = the index of book
        let readButton = document.createElement('button');
        readButton.classList.toggle('readButton');
        readButton.textContent = 'Mark Read';
        buttonContainer.appendChild(readButton);
        
        bookCard.appendChild(buttonContainer);

        // update books read and unread list in the user profile
        updateBooksRead();
        updateBooksUnRead();
    });
};

// delete book button handler
booksDashboard.addEventListener('click', (e) => {
    parent = e.target.parentElement;
    if (e.target.getAttribute('class') === 'deleteButton') {
        deleteBook(parent.getAttribute('id'));
    } else {
        readBook(parent.getAttribute('id'));
    }
});

// dialog
newBookButton.addEventListener('click', () => {
    formDialog.showModal();
});

cancelDialogButton.addEventListener('click', () => {
    formDialog.close()
});

addBookDialogButton.addEventListener('click', (event) => {
    event.preventDefault();
    // readStatus couldn't be checked at the top because by default, not-read is checked
    // and since its set to const, readStatus would be checked every time by default
    // we want to see the value of checked when button is clicked
    let readStatus = formDialog.querySelector('.read-status :checked');
    let read = (readStatus.value === 'read') ? true : false;
    addBook(title.value, author.value, pages.value, read);
    
    // dispatchEvent() doesn't work because it only triggers the user defined event listeners
    // and not the default ones [security concerns]
    form.reset();
    formDialog.close();
    displayBooks();
})