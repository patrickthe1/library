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
    this.isRead = isRead || false;
}

Book.prototype.toggleReadStatus = function() {
    this.isRead = !this.isRead;
};

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
    
    const toggleButton = document.createElement('button');
    toggleButton.textContent = book.isRead ? 'Read' : 'Not Read';
    toggleButton.style.backgroundColor = book.isRead ? 'green' : 'red';
    
    // Add event listener to toggle read status and update button text
    toggleButton.addEventListener('click', () => {
        book.toggleReadStatus();
        toggleButton.textContent = book.isRead ? 'Read' : 'Not Read';  // Update button text
        toggleButton.classList.add('toggle-btn');

        toggleButton.style.backgroundColor = book.isRead ? 'green' : 'red';
    });
    
    card.appendChild(titleElem);
    card.appendChild(authorElem);
    card.appendChild(pagesElem);    
    card.appendChild(toggleButton);
    
    container.appendChild(card);
}
