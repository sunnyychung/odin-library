const myLibrary = [
  // new Book("George R.R. Martin", "A Game of Thrones", 694, true)
];

const main = document.querySelector(".books")
const createBtn = document.getElementById("createBtn")
const dialog = document.getElementById("dialog")
const confirmBtn = document.getElementById("confirmBtn")
const closeBtn = document.getElementById("closeBtn")

function addInformation(book, index) {
  const card = document.createElement("div");
  card.classList.add("book")

  const info = document.createElement("div");
  info.classList.add("bookInfo")
  info.textContent = `${book.author}, ${book.title}, ${book.pages}, ${book.read}`;

  const readBtn = document.createElement("button");
  readBtn.textContent = "Read";
  readBtn.classList.add("readBtn");
  readBtn.addEventListener("click", updateRead);

  const removeBtn = document.createElement("button");
  removeBtn.setAttribute("data-index", `${index}`);
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("removeBtn");
  removeBtn.addEventListener("click", removeBook);

  card.appendChild(readBtn);
  card.appendChild(info);
  card.appendChild(removeBtn);
  main.append(card);
}

function showBooks(array) {
  array.forEach((book, index) => {
    addInformation(book, index);
  })
}

function updateRead(event) {
  const index = event.target.parentElement.querySelector(".removeBtn").getAttribute('data-index');
  myLibrary[index].updateRead();
  event.target.parentElement.querySelector(".bookInfo").textContent = `${myLibrary[index].author}, ${myLibrary[index].title}, ${myLibrary[index].pages}, ${myLibrary[index].read}`;
}

Book.prototype.updateRead = function() {
  this.read = !this.read;
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

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(author, title, pages, read) {
  const newBook = new Book(author, title, pages, read);

  addInformation(newBook, myLibrary.length);
  myLibrary.push(newBook);
}

createBtn.addEventListener("click", () => {
  dialog.showModal();
})

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const bookAuthor = document.querySelector("#bookauthor").value;
  const bookName = document.querySelector("#bookname").value;
  const bookPages = document.querySelector("#bookpages").value;
  const bookRead = document.querySelector("#bookread").checked;

  addBookToLibrary(bookAuthor, bookName, bookPages, bookRead);
  dialog.close();
});


showBooks(myLibrary);