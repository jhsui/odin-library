const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();

    this.title = title;
    this.author = author;
    this.pages = pages;
    // this.read = read;
    if (read === "true" || read === true) {
      this.read = true;
    } else {
      this.read = false;
    }

    this.info = function () {
      let readOrNot = "";
      if (this.read) {
        readOrNot = ", already read.";
      } else {
        readOrNot = ", not read yet.";
      }
      return (
        this.title +
        " is written by " +
        this.author +
        ", with " +
        this.pages +
        " pages" +
        readOrNot
      );
    };
  }
}

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);

  myLibrary.push(book);
}

myLibrary.push(new Book("BookOne", "AuthorOne", 10, true));
myLibrary.push(new Book("BookTwo", "AuthorTwo", 20, false));
myLibrary.push(new Book("BookThree", "AuthorThree", 30, false));

showButton.onclick = function displayAllBooks() {
  const container = document.querySelector(".container");

  container.innerHTML = "";

  for (const book of myLibrary) {
    const bookContainer = document.createElement("div");

    const article = document.createElement("article");

    article.textContent = book.info();

    const removeBookButton = document.createElement("button");
    removeBookButton.textContent = "Remove";
    removeBookButton.onclick = function () {
      const index = myLibrary.findIndex((obj) => obj.id === book.id);
      if (index !== -1) {
        myLibrary.splice(index, 1);
      }

      bookContainer.remove();
    };

    const readOrNotButton = document.createElement("button");
    readOrNotButton.textContent = "Read";
    readOrNotButton.onclick = function () {
      book.read = book.read === true ? false : true;
      article.textContent = book.info();
    };

    bookContainer.appendChild(article);
    bookContainer.appendChild(readOrNotButton);
    bookContainer.appendChild(removeBookButton);
    container.appendChild(bookContainer);
  }
};

const form = document.querySelector("form");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");

const validation = (e) => {
  e.preventDefault();

  if (title.validity.valueMissing) {
    title.setCustomValidity("Title required!!!");
  } else {
    title.setCustomValidity("");
  }

  // title.reportValidity();

  if (author.validity.valueMissing) {
    author.setCustomValidity("author required!!!");
  } else {
    author.setCustomValidity("");
  }

  // author.reportValidity();

  if (pages.validity.valueMissing) {
    pages.setCustomValidity("pages required!!!");
  } else {
    pages.setCustomValidity("");
  }

  // pages.reportValidity();

  if (read.validity.valueMissing) {
    read.setCustomValidity("read required!!!");
  } else {
    read.setCustomValidity("");
  }

  // read.reportValidity();
};

const submitButton = document.getElementById("form-submit-button");
submitButton.onclick = function (e) {
  validation(e);

  if (form.checkValidity()) {
    addBookToLibrary(
      document.getElementById("title").value,
      document.getElementById("author").value,
      document.getElementById("pages").value,
      document.getElementById("read").value
    );

    showButton.click();
    formContainer.classList.remove("show-form");
    document.querySelector("form").reset();
  } else {
    form.reportValidity();
  }
};

const formContainer = document.querySelector(".form-container");

const newBookButton = document.getElementById("new-book-btn");

newBookButton.addEventListener("click", () => {
  if (formContainer.classList.contains("show-form")) {
    formContainer.classList.remove("show-form");
    document.querySelector("form").reset();
  } else {
    formContainer.classList.add("show-form");
  }
});

window.addEventListener("click", (e) => {
  e.target === formContainer
    ? formContainer.classList.remove("show-form")
    : false;
});
