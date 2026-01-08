
let myLibrary = []

function Book(title, author, pages, read) {
    //constructor
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.read = Boolean(read);
};

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    renderLibrary();
};

function removeBookById(id) {
    myLibrary = myLibrary.filter((book) => book.id !== id)
}

function toggleReadById(id) {
    const book = myLibrary.find((book) => book.id === id)
    if (book) {
        book.read = !book.read;
    }
}

function renderLibrary() {
    const library = document.querySelector("#library");
    library.innerHTML = "";

    myLibrary.forEach((book) => {
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
            book.toggleRead();
            renderLibrary();
        });

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.dataset.id = book.id;

        removeBtn.addEventListener("click", () => {
            removeBookById(book.id);
            renderLibrary();
        });

        actions.append(toggleBtn, removeBtn);
        card.append(titleEl, authorEl, pagesEl, readEl, actions);
        library.appendChild(card);
    });
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("Clean Code", "Robert C. Martin", 464, false);

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

    addBookToLibrary(title, author, pages, read);

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
})