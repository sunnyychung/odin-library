const myLibrary = [
  // new Book("George R.R. Martin", "A Game of Thrones", 694, true)
];

const main = document.querySelector(".books")
const createBtn = document.getElementById("createBtn")
const dialog = document.getElementById("dialog")
const confirmBtn = document.getElementById("confirmBtn")
const closeBtn = document.getElementById("closeBtn")

const bookAuthor = document.querySelector("#bookauthor");
const bookName = document.querySelector("#bookname");
const bookPages = document.querySelector("#bookpages");
const bookRead = document.querySelector("#bookread");

class Book {
  constructor(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }

  addInformation() {
    const card = document.createElement("div");
    card.classList.add("book")

    const info = document.createElement("div");
    info.classList.add("bookInfo")
    info.textContent = `${this.author}, ${this.title}, ${this.pages}, ${this.read}`;

    const readBtn = document.createElement("button");
    readBtn.textContent = "Read";
    readBtn.classList.add("readBtn");
    readBtn.addEventListener("click", updateRead);

    const removeBtn = document.createElement("button");
    removeBtn.setAttribute("data-index", myLibrary.length);
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("removeBtn");
    removeBtn.addEventListener("click", removeBook);

    card.appendChild(readBtn);
    card.appendChild(info);
    card.appendChild(removeBtn);
    main.append(card);
  }
}

function updateRead(event) {
  const index = event.target.parentElement.querySelector(".removeBtn").getAttribute('data-index');
  myLibrary[index].updateRead();
  event.target.parentElement.querySelector(".bookInfo").textContent = `${myLibrary[index].author}, ${myLibrary[index].title}, ${myLibrary[index].pages}, ${myLibrary[index].read}`;
}

function updateIndex() {
  const removeBtns = document.querySelectorAll(".removeBtn").forEach((button, index) => {
    button.setAttribute("data-index", `${index}`);
  });
}

function removeBook(event) {
  const index = event.target.getAttribute('data-index');
  myLibrary.splice(index, 1);
  event.target.parentElement.remove();

  updateIndex();
}

function addBookToLibrary(author, title, pages, read) {
  const newBook = new Book(author, title, pages, read);

  newBook.addInformation();
  myLibrary.push(newBook);
}

// Client Side Validation Lesson

function checkValid(element) {
  if (!element.validity.valid) {
    element.setCustomValidity("Oops! You need to enter something.");  
  }
  else {
    element.setCustomValidity("");
  }
}

function validatePage() {
  if (!bookPages.validity.valid) {
    bookPages.setCustomValidity("Hopefully your book has pages.");
  }
  else {
    bookPages.setCustomValidity("");
  }
}

createBtn.addEventListener("click", () => {
  dialog.showModal();
})

closeBtn.addEventListener("click", () => {
  dialog.close();
})

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  addBookToLibrary(bookAuthor.value, bookName.value, bookPages.value, bookRead.checked);
  dialog.close();
});

bookAuthor.addEventListener("input", () => checkValid(bookAuthor));
bookName.addEventListener("input", () => checkValid(bookName));
bookPages.addEventListener("input", () => validatePage());