const myLibrary = [];
const container = document.querySelector('.container');
// container and deleteButtons changes later
let booksDashboard = document.querySelector('.books-dashboard');
let deleteButtons = Array.from(document.querySelectorAll('.deleteButton'));
const formDialog = document.querySelector('.form-dialog');
const newBookButton = document.querySelector('.new-book'); 
const cancelDialogButton = formDialog.querySelector('.cancel'); 
const addBookDialogButton = formDialog.querySelector('.add');
const title = formDialog.querySelector('#title');
const author = formDialog.querySelector('#author');
const pages = formDialog.querySelector('#pages');
const form = formDialog.querySelector('form');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return {
            title: this.title,
            author: this.author,
            pages: this.pages,
            read: this.read,
        };
    }
};

// add book
function addBook(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
};

// delete book
function deleteBook(index) {
    if (index > -1) {
        // remove the book from the library array
        myLibrary.splice(index, 1); 
        // container.removeChild(booksDashboard);

        // display the remaining elements in the array to the booksDashboard
        console.log(myLibrary);
        displayBooks()
    }
}

function displayBooks() {
    // clear the screen first, because previous books are also displaying and this function
    // replace the book dashboard with an empty dashboard
    newBookDashboard = document.createElement('div');
    container.replaceChild(newBookDashboard, booksDashboard);
    newBookDashboard.classList.toggle('books-dashboard');
    booksDashboard = newBookDashboard;

    myLibrary.forEach((book) => {
        // rn adds on top of those books (redundancy) 
        let bookCard = document.createElement('div');
        bookCard.classList.toggle('book');
        
        bookInfo = book.info(); 
        bookCard.innerHTML = `<div class="title">Title: ${book.title}</div>
                            <div class="author">Author: ${book.author}</div>
                            <div class="pages">Pages: ${book.title}</div>
                            <div class="read">Read: ${book.read ? 'read' : 'not read'} </div>`;
        
        booksDashboard.appendChild(bookCard);
        
        // add a delete button to each book whose id = the index of book
        deleteButtonContainer = document.createElement('div');
        deleteButtonContainer.classList.toggle('delete');
        let deleteButton = document.createElement('button');
        deleteButton.classList.toggle('deleteButton');
        deleteButton.setAttribute('id', `${myLibrary.indexOf(book)}`);
        deleteButton.textContent = 'Delete Book';
        deleteButtonContainer.appendChild(deleteButton);
        bookCard.appendChild(deleteButtonContainer);
    });
};

// delete book button handler
booksDashboard.addEventListener('click', (e) => {
    deleteBook(+ e.target.getAttribute('id'));
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