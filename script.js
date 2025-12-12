const myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor.");
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read === "true";

  this.info = function () {
    console.log(
      this.title + " by " + this.author + ", " + this.pages + " pages."
    );
  };
}

const book1 = new Book("t", "s", 1, "not read");

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);

  myLibrary.push(book);
}

myLibrary.push(new Book("BookOne", "AuthorOne", 10, true));
myLibrary.push(new Book("BookTwo", "AuthorTwo", 20, false));
myLibrary.push(new Book("BookThree", "AuthorThree", 30, true));

// console.log(myLibrary);

showButton.onclick = function displayAllBooks() {
  const container = document.querySelector(".container");

  container.innerHTML = "";

  for (const book of myLibrary) {
    const article = document.createElement("article");

    let readOrNot = ", not read yet.";
    if (book.read) {
      readOrNot = ", already read.";
    }

    article.textContent =
      book.title +
      " is written by " +
      book.author +
      ", with " +
      book.pages +
      " pages" +
      readOrNot;

    container.appendChild(article);
  }
};

const submitButton = document.getElementById("form-submit-button");
submitButton.onclick = function () {
  addBookToLibrary(
    document.getElementById("title").value,
    document.getElementById("author").value,
    document.getElementById("pages").value,
    document.getElementById("read").value
  );

  showButton.click();
};

const formContainer = document.querySelector(".form-container");
// const formContainer = document.getElementsById("form-container");
const newBookButton = document.getElementById("new-book-btn");

newBookButton.addEventListener("click", () => {
  if (formContainer.classList.contains("show-form")) {
    formContainer.classList.remove("show-form");
    document.querySelector("form").reset();
  } else {
    formContainer.classList.add("show-form");
  }
});
