const library = [];

const container = document.querySelector(".cards");
const showButton = document.getElementById("showModal");
const dialogue = document.getElementById("bookDialogue");
const confirmBtn = document.getElementById("confirm");
const cancel = document.querySelector(".cancel-btn");

// Form inputs
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const isReadInput = document.getElementById("isRead");

showButton.addEventListener("click", () => {
    dialogue.showModal(); // Show the modal when NEW BOOK button is clicked
});

// Constructor function for Book
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead || false;
}

Book.prototype.toggleReadStatus = function () {
    this.isRead = !this.isRead;
};

cancel.addEventListener("click", (e) => {
    e.preventDefault();
    clearForm();
    dialogue.close();
});

confirmBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the form from submitting

    // Validate form inputs
    const isValid = validateForm();
    if (!isValid) return;

    // Retrieve form input values when the confirm button is clicked
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const pages = parseInt(pagesInput.value.trim());
    const isRead = isReadInput.textContent;

    // Create a new book instance
    const newBook = new Book(title, author, pages, isRead);

    // Add the new book to the library array
    library.push(newBook);

    // Log the library array to check if the book is added
    console.log(library);

    // Close the modal after adding the book
    dialogue.close();

    // Add the book to the DOM
    addBookToDOM(newBook);

    // Clear the form
    clearForm();
});

// Validate form inputs
function validateForm() {
    let isValid = true;

    // Title validation
    if (!titleInput.validity.valid) {
        showError(titleInput, "Please provide a valid title (3-100 characters).");
        isValid = false;
    } else {
        clearError(titleInput);
    }

    // Author validation
    if (!authorInput.validity.valid) {
        showError(authorInput, "Please provide a valid author name (3-100 characters).");
        isValid = false;
    } else {
        clearError(authorInput);
    }

    // Pages validation
    if (!pagesInput.validity.valid) {
        showError(pagesInput, "Please provide a positive number for pages.");
        isValid = false;
    } else {
        clearError(pagesInput);
    }

    return isValid;
}

// Show custom error message
function showError(input, message) {
    const errorSpan = input.nextElementSibling;
    errorSpan.textContent = message;
    input.classList.add("invalid");
}

// Clear error message
function clearError(input) {
    const errorSpan = input.nextElementSibling;
    errorSpan.textContent = "";
    input.classList.remove("invalid");
}

// Clear form inputs
function clearForm() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    isReadInput.checked = false;

    clearError(titleInput);
    clearError(authorInput);
    clearError(pagesInput);
}

function addBookToDOM(book) {
    const card = document.createElement("div");
    card.classList.add("card");

    const titleElem = document.createElement("h3");
    titleElem.textContent = book.title;

    const authorElem = document.createElement("p");
    authorElem.textContent = `Author: ${book.author}`;

    const pagesElem = document.createElement("p");
    pagesElem.textContent = `Pages: ${book.pages}`;

    const toggleButton = document.createElement("button");
    toggleButton.textContent = book.isRead ? "Read" : "Not Read";
    toggleButton.classList.add("toggle-btn");

    toggleButton.style.backgroundColor = book.isRead ? "green" : "red";

    // Add event listener to toggle read status and update button text
    toggleButton.addEventListener("click", () => {
        book.toggleReadStatus();
        toggleButton.textContent = book.isRead ? "Read" : "Not Read"; // Update button text
        toggleButton.classList.add("toggle-btn");

        toggleButton.style.backgroundColor = book.isRead ? "green" : "red";
    });

    card.appendChild(titleElem);
    card.appendChild(authorElem);
    card.appendChild(pagesElem);
    card.appendChild(toggleButton);

    container.appendChild(card);
}
