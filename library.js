const library = [];

const container = document.querySelector(".cards");
const showButton = document.getElementById("showModal");
const dialogue = document.getElementById("bookDialogue");


showButton.addEventListener("click", () => {
    dialogue.showModal();
})




function Book(title,author,pages,isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead= isRead;
}



function addBookToLibrary(){
    
}

function displayBook(){
    
    library.forEach(book => {
        const file = document.createElement("div");
    
        file.textContent = book;
    
        file.classList.add("book");
    
        container.appendChild(file);
    })
}