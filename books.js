//let myLibrary = []

class Book {
    constructor(title, author, pages, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = Number(pages);
        this.read = Boolean(read);
    }
    toggleRead() {
        this.read = !this.read;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(title, author, pages, read) {
        const book = new Book(title, author, pages, read);
        this.books.push(book);
        this.render();
    }

    removeBookById(id) {
        this.books = this.books.filter((book) => book.id !== id);
        this.render();
    }

    toggleReadById(id) {
        const book = this.books.find((book) => book.id === id);
        if (book) {
            book.toggleRead();
            this.render();
        }
    }

    render() {
        const libraryEl = document.querySelector("#library");
        libraryEl.innerHTML = "";

        this.books.forEach((book) => {
            const card = this.createBookCard(book);
            libraryEl.appendChild(card);
        });
    }

    createBookCard(book) {
        const card = document.createElement("article");
        card.classList.add("book-card");
        card.dataset.id = book.id;

        const titleEl = document.createElement("h3");
        titleEl.classList.add("book-title");
        titleEl.textContent = book.title;

        const authorEl = document.createElement("p");
        authorEl.classList.add("book-author");
        authorEl.textContent = `Author: ${book.author}`;

        const pagesEl = document.createElement("p");
        pagesEl.classList.add("book-pages");
        pagesEl.textContent = `Pages: ${book.pages}`;

        const readEl = document.createElement("p");
        readEl.classList.add("book-read");
        readEl.textContent = book.read ? "Status: Read" : "Status: Not Read";

        const actions = document.createElement("div");
        actions.classList.add("book-actions");

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle Read";
        toggleBtn.dataset.id = book.id;
        toggleBtn.addEventListener("click", () => {
            this.toggleReadById(book.id);
        });

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.dataset.id = book.id;
        removeBtn.addEventListener("click", () => {
            this.removeBookById(book.id);
        });

        actions.append(toggleBtn, removeBtn);
        card.append(titleEl, authorEl, pagesEl, readEl, actions);

        return card;
    }
}

const myLibrary = new Library();

myLibrary.addBook("The Hobbit", "J.R.R. Tolkien", 310, true);
myLibrary.addBook("Clean Code", "Robert C. Martin", 464, false);

const newBookBtn = document.querySelector("#newBookBtn");
const dialog = document.querySelector("#bookDialog");
const form = document.querySelector("#bookForm");
const cancelBtn = document.querySelector("#cancelBtn");
const closeDialogBtn = document.querySelector("#closeDialogBtn");

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = event.target.title.value.trim();
    const author = event.target.author.value.trim();
    const pages = Number(event.target.pages.value);
    const read = event.target.read.checked;
    
    myLibrary.addBook(title, author, pages, read);
    form.reset();
    dialog.close();
});

cancelBtn.addEventListener("click", () => {
    form.reset();
    dialog.close();
});

closeDialogBtn.addEventListener("click", () => {
    form.reset();
    dialog.close();
});