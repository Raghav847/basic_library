
const myLibrary = []

function Book(title, author, pages, read) {
    //constructor
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.read = Boolean(read);
};

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    renderLibrary();
};

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

        card.append(titleEl, authorEl, pagesEl, readEl, actions);
        library.appendChild(card);
    });
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("Clean Code", "Robert C. Martin", 464, false);