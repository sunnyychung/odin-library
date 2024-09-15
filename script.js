const myLibrary = [{author: "George R.R. Martin",
  title: "A Game of Thrones",
  pages: 694,
  read: true
}];

const main = document.querySelector(".books")
const createBtn = document.getElementById("createBtn")
const dialog = document.getElementById("dialog")
const confirmBtn = document.getElementById("confirmBtn")
const closeBtn = document.getElementById("closeBtn")

function addInformation(book) {
  const card = document.createElement("div");
  card.classList.add("book")

  const info = document.createElement("div");
  info.classList.add("bookInfo")
  info.textContent = `${book.author}, ${book.title}, ${book.pages}, ${book.read}`;

  const updateRead = document.createElement("button");
  updateRead.textContent = "Read";
  updateRead.classList.add("updateRead");

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("removeBtn");

  card.appendChild(updateRead);
  card.appendChild(info);
  card.appendChild(removeBtn);
  main.append(card);
}

function showBooks(array) {
  array.forEach((book) => {
    addInformation(book);
  })
}

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(author, title, pages, read) {
  const newBook = new Book(author, title, pages, read);

  addInformation(newBook);
  myLibrary.push(newBook);
}

createBtn.addEventListener("click", () => {
  dialog.showModal();
})

confirmBtn.addEventListener("click", () => {
  event.preventDefault()

  const bookAuthor = document.querySelector("#bookauthor").value;
  const bookName = document.querySelector("#bookname").value;
  const bookPages = document.querySelector("#bookpages").value;
  const bookRead = document.querySelector("#bookread").checked ? true : false;

  addBookToLibrary(bookAuthor, bookName, bookPages, bookRead);
  dialog.close();
})





showBooks(myLibrary);