const myLibrary = [];
const booksDashboard = document.querySelector('.books-dashboard');
const deleteButtons = Array.from(document.querySelectorAll('.deleteButton'));
const formDialog = document.querySelector('.form-dialog');
const newBookButton = document.querySelector('.new-book'); 

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

newBookButton.addEventListener('click', () => {
    formDialog.showModal();
})
