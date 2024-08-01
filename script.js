const myLibrary = [];
const booksDashboard = document.querySelector('.books-dashboard');
const deleteButtons = Array.from(document.querySelectorAll('.deleteButton'));
const formDialog = document.querySelector('.form-dialog');
const newBookButton = document.querySelector('.new-book'); 
const cancelDialogButton = formDialog.querySelector('.cancel'); 
const addBookDialogButton = formDialog.querySelector('.add');
const title = formDialog.querySelector('#title');
const author = formDialog.querySelector('#author');
const pages = formDialog.querySelector('#pages');

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

function displayBooks() {
    myLibrary.forEach((book) => {
        bookCard.classList.toggle('book');
        let bookCard = document.createElement('div');
        
        bookInfo = book.info(); 
        bookCard.innerHTML = `<div class="title">Title: ${book.title}</div>
                            <div class="author">Author: ${book.author}</div>
                            <div class="pages">Pages: ${book.title}</div>
                            <div class="read">Read: ${book.read ? 'read' : 'not read'} </div>`;
        
        booksDashboard.appendChild(bookCard);
                            
        // add a delete button to each book
        deleteButtonContainer = document.createElement('div');
        deleteButtonContainer.classList.toggle('delete');
        deleteButton = document.createElement('button');
        deleteButton.classList.toggle('deleteButton');
        deleteButton.textContent = 'Delete Book';
        deleteButtonContainer.appendChild(deleteButton);
        bookCard.appendChild(deleteButtonContainer);
    });
};

// add book
function addBook(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
};

// delete book
function deleteBook(event) {
    if (event.target in deleteButtons) {
        // TODO
    }
}

booksDashboard.addEventListener('click', (e) => {
    deleteBook(e);
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
    console.log(readStatus.value)
    addBook(title.value, author.value, pages.value, read);
    
    // TODO: clear the screen first, and then only display book (cause display books
    // iterates over each book otherwise)
    formDialog.close();
})