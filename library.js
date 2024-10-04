const library = [];

const container = document.querySelector(".cards");
const showButton = document.getElementById("showModal");
const dialogue = document.getElementById("bookDialogue");
const confirmBtn = document.getElementById("confirm");
const cancel = document.querySelector(".cancel-btn");

showButton.addEventListener("click", () => {
    dialogue.showModal();  // Show the modal when NEW BOOK button is clicked
});

// Constructor function for Book
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

cancel.addEventListener("click", (e) =>{
    e.preventDefault();

    dialogue.close();
})

confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();  // Prevent the form from submitting

    // Retrieve form input values when the confirm button is clicked
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("isRead").value;


    if (title === "" || author === "" || pages === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Create a new book instance
    const newBook = new Book(title, author, pages, isRead);

    // Add the new book to the library array
    library.push(newBook);

    // Log the library array to check if the book is added
    console.log(library);

    // Close the modal after adding the book
    dialogue.close();

    addBookToDOM(newBook);
});




function addBookToDOM(book) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    const titleElem = document.createElement('h3');
    titleElem.textContent = book.title;
    
    const authorElem = document.createElement('p');
    authorElem.textContent = `Author: ${book.author}`;
    
    const pagesElem = document.createElement('p');
    pagesElem.textContent = `Pages: ${book.pages}`;
    
    const isReadElem = document.createElement('p');
    isReadElem.textContent = `Read: ${book.isRead === 'true' ? 'Yes' : 'No'}`;
    
    card.appendChild(titleElem);
    card.appendChild(authorElem);
    card.appendChild(pagesElem);
    card.appendChild(isReadElem);
    
    container.appendChild(card);
}