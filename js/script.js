let myLibrary = [];
const wrapper = document.querySelector(".wrapper");
const container = document.querySelector(".container");
const main = document.getElementById("main");
const addBookBtn = document.querySelector(".sidebar-addbook");

addBookBtn.addEventListener("click", displayForm);

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

myLibrary.push(new Book("Gamedec. Granica rzeczywistości", "Marcin Przybyłek", "468", true));

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

function displayLibrary() {
    myLibrary.forEach(function (book, index) {
        let newCard = document.createElement("div");
            for (let i = 0; i < Object.keys(book).length; i++) {
                let newDiv = document.createElement("div");
                newDiv.classList.add(`card-${Object.keys(book)[i]}`);
                newCard.appendChild(newDiv);
                if (newDiv.classList.contains("card-read")) {
                    newDiv.addEventListener("click", toggleRead);
                    if (book.read === true) {
                        newDiv.textContent = "Read";
                    } else {
                        newDiv.textContent = "Not read";
                        newDiv.style.color = "rgb(153, 0, 0)";
                    }
                } else if (newDiv.classList.contains("card-pages")) {
                    newDiv.textContent = `${[Object.values(book)[i]]} pages`;
                } else {
                    newDiv.textContent = [Object.values(book)[i]];
                }
            }
        newCard.classList.add("card");
        newCard.dataset.index = index;
        main.appendChild(newCard);

        let cardButtons = document.createElement("div");
        cardButtons.classList.add("card-buttons");
        newCard.appendChild(cardButtons);
        let removeIcon = document.createElement("img");
        cardButtons.appendChild(removeIcon).src = "/img/clear.png";
        removeIcon.addEventListener("click", removeCard);
    });
}

function displayForm() {
    let overlay = document.createElement("div");
    overlay.classList.add("overlay");
    wrapper.appendChild(overlay);
    container.style.filter = "blur(0.2rem) grayscale(100%)";
    let bookForm = document.createElement("div");
    bookForm.classList.add("book-form");
    overlay.appendChild(bookForm);

    let authorInput = document.createElement("input");
    authorInput.setAttribute("type", "text")
    authorInput.setAttribute("name", "form-author");

    let titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text")
    titleInput.setAttribute("name", "form-title");

    let pagesInput = document.createElement("input");
    pagesInput.setAttribute("type", "text")
    pagesInput.setAttribute("name", "form-pages");

    let readToggle = document.createElement("label");
    readToggle.classList.add("read-toggle");
    let readInput = document.createElement("input");
    readInput.setAttribute("type", "checkbox")
    readInput.setAttribute("name", "read-toggle")

    let slider = document.createElement("span");
    slider.classList.add("slider");
    let readMessage = document.createElement("p");

    let submit = document.createElement("button");
    submit.classList.add("submit-button");

    let cancel = document.createElement("button");
    cancel.classList.add("cancel-button");

    let errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");

    let authorText = document.createElement("p");
    let titleText = document.createElement("p");
    let pagesText = document.createElement("p");

    bookForm.appendChild(authorText).textContent = "Author's name:";
    bookForm.appendChild(authorInput);

    bookForm.appendChild(titleText).textContent = "Book's title:";
    bookForm.appendChild(titleInput);

    bookForm.appendChild(pagesText).textContent = "Number of pages:";
    bookForm.appendChild(pagesInput);

    bookForm.appendChild(readMessage);
    readMessage.textContent = "Have you read the book?";

    bookForm.appendChild(readToggle);
    readToggle.appendChild(readInput);
    readToggle.appendChild(slider);

    bookForm.appendChild(errorMessage);

    let buttons = document.createElement("div");
    buttons.classList.add("form-buttons");
    bookForm.appendChild(buttons);
    buttons.appendChild(submit).addEventListener("click", submitForm);
    submit.textContent = "Add book";
    buttons.appendChild(cancel).addEventListener("click", () => {
        wrapper.removeChild(overlay);
        container.style.filter = "";
    });
    cancel.textContent = "Cancel";
}

function toggleRead(e) {
    myLibrary.forEach(function (book, index) {
        if (index == e.target.parentNode.dataset.index) {
            if (book.read === true) {
                book.read = false;
                e.target.textContent = "Not read";
                e.target.style.color = "rgb(153, 0, 0)";
            } else {
                book.read = true;
                e.target.textContent = "Read";
                e.target.style.color = "rgb(51, 102, 0)";
            }
        }
    });
}

function removeAllCards() {
    let cards = document.querySelectorAll(".card");
    cards.forEach(card => main.removeChild(card));
}

function removeCard(e) {
    if (confirm("Are you sure you want to delete this entry?")) {
    myLibrary = myLibrary.filter(function (obj, index) {
        return index != e.target.parentNode.parentNode.dataset.index
    });
    removeAllCards();
    displayLibrary();
    } else {
        return
    }
}

function submitForm() {
    let authorInput = document.querySelector('input[name="form-author"]').value;
    let titleInput = document.querySelector('input[name="form-title"]').value;
    let pagesInput = document.querySelector('input[name="form-pages"]').value;
    let readToggle = document.querySelector('input[name="read-toggle"]').checked;
    let errorMessage = document.querySelector(".error-message");
    let overlay = document.querySelector(".overlay");

    if (authorInput === "" || titleInput === "" || pagesInput === "") {
        errorMessage.textContent = "You must fill in all entry fields!";
    } else if (authorInput.length > 35) {
        errorMessage.textContent = "Author's name length must be less than 35 characters."
    } else if (titleInput.length > 100) {
        errorMessage.textContent = "Title's length must be less than 100 characters."
    } else if (pagesInput > 99999) {
        errorMessage.textContent = "That's a reaaaally long book you're reading..."
    } else if (isNaN(pagesInput)) {
        errorMessage.textContent = "Enter a valid number."
    } else {
        let cards = document.querySelectorAll(".card");
        myLibrary.push(new Book(titleInput, authorInput, pagesInput, readToggle));
        removeAllCards();
        displayLibrary();
        wrapper.removeChild(overlay);
        container.style.filter = "";
    }
}

displayLibrary();