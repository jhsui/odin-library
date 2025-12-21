const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

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

  // if (!new.target) {
  //   throw Error("You must use the 'new' operator to call the constructor.");
  // }

  // this.id = crypto.randomUUID();
  // this.title = title;
  // this.author = author;
  // this.pages = pages;
  // this.read = read === true || read === "true";
}

const book1 = new Book("t", "s", 1, "not read");

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);

  myLibrary.push(book);
}

myLibrary.push(new Book("BookOne", "AuthorOne", 10, true));
myLibrary.push(new Book("BookTwo", "AuthorTwo", 20, false));
myLibrary.push(new Book("BookThree", "AuthorThree", 30, false));

// console.log(myLibrary);

showButton.onclick = function displayAllBooks() {
  const container = document.querySelector(".container");

  container.innerHTML = "";

  for (const book of myLibrary) {
    const bookContainer = document.createElement("div");
    // bookContainer.dataset.id = book.id;
    const article = document.createElement("article");

    article.textContent = book.info();

    const removeBookButton = document.createElement("button");
    removeBookButton.textContent = "Remove";
    removeBookButton.onclick = function () {
      // myLibrary = myLibrary.filter((obj) => obj.id !== book.id);

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

const submitButton = document.getElementById("form-submit-button");
submitButton.onclick = function () {
  addBookToLibrary(
    document.getElementById("title").value,
    document.getElementById("author").value,
    document.getElementById("pages").value,
    document.getElementById("read").value
  );

  showButton.click();
  formContainer.classList.remove("show-form");
  document.querySelector("form").reset();
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

window.addEventListener("click", (e) => {
  e.target === formContainer
    ? formContainer.classList.remove("show-form")
    : false;
});
