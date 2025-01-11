// initialization 
let counter = 0;
const addCardBtn = document.getElementById('addCardBtn');
const newCardContainer = document.getElementById('newCardContainer');
const term = document.getElementById("add-term");
const definition = document.getElementById("addDefinition");
const body = document.querySelector("body");
const title = document.querySelector(".title");

const h1YourFlashcard = document.createElement('h1');
h1YourFlashcard.textContent = "Your Flashcard";
h1YourFlashcard.style.display = 'none'; 
h1YourFlashcard.classList.add('h1YourFlashcard');
newCardContainer.appendChild(h1YourFlashcard);

const pFlashcardCtr = document.createElement('p');
pFlashcardCtr.textContent = `this is your flashcard(${counter})`;
pFlashcardCtr.style.display = 'none'; 
pFlashcardCtr.style.marginBottom = "50px";
pFlashcardCtr.classList.add('pFlashcardCtr');
newCardContainer.appendChild(pFlashcardCtr);

const cancelBtn = document.querySelector('.contain-cancel-save button:nth-child(1)');

// this function is used if the input field hasnt been filled yet
function flashRedOutline(element) {
    element.style.outline = "solid 1px red";
    setTimeout(() => {
        element.style.outline = "";
    }, 1000); 
}

// this function is used to delete the card when the delete button is clicked
function deleteCard(event) {
    const cardToDelete = event.target.closest('.newCard');
    if (cardToDelete) {
        newCardContainer.removeChild(cardToDelete);
        counter--;
        pFlashcardCtr.textContent = `your flashcard(${counter})`;
        if (counter === 0) {
            h1YourFlashcard.style.display = 'none';
            pFlashcardCtr.style.display = 'none';
            newCardContainer.style.border = "none";
        }
        saveFlashcards();
    }
}

// this function is used to save flashcards to localStorage
function saveFlashcards() {
    const flashcards = [];
    const cards = newCardContainer.querySelectorAll('.newCard');
    cards.forEach(card => {
        const term = card.querySelector('.termDisplay').textContent;
        const definition = card.querySelector('.definitionDisplay').textContent;
        flashcards.push({ term, definition });
    });
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
}

// this function is used to load flashcards from localStorage
function loadFlashcards() {
    const flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
    flashcards.forEach(flashcard => {
        addFlashcard(flashcard.term, flashcard.definition);
    });
}

// this function is used to edit the card when the edit button is clicked
const editModal = document.getElementById('editModal');
const editTermInput = document.getElementById('edit-term');
const editDefinitionInput = document.getElementById('edit-definition');
const saveEditBtn = document.getElementById('saveEditBtn');
let currentCardToEdit = null;

function openModal(card) {
    currentCardToEdit = card;
    const termH1 = card.querySelector('.termDisplay');
    const definitionP = card.querySelector('.definitionDisplay');
    editTermInput.value = termH1.textContent;
    editDefinitionInput.value = definitionP.textContent;
    editModal.style.display = 'block';
}

function closeModal() {
    editModal.style.display = 'none';
    currentCardToEdit = null;
}

saveEditBtn.addEventListener('click', () => {
    if (currentCardToEdit) {
        const termH1 = currentCardToEdit.querySelector('.termDisplay');
        const definitionP = currentCardToEdit.querySelector('.definitionDisplay');
        termH1.textContent = editTermInput.value;
        definitionP.textContent = editDefinitionInput.value;
        saveFlashcards();
        closeModal();
    }
});

function editCard(event) {
    const cardToEdit = event.target.closest('.newCard');
    if (cardToEdit) {
        openModal(cardToEdit);
    }
}

// this function is used to add a flashcard to the DOM and save it to localStorage
function addFlashcard(termValue, definitionValue) {
    if (counter === 0) { 
        h1YourFlashcard.style.display = 'block'; 
        pFlashcardCtr.style.display = 'block'; 
    }

    counter++;
    pFlashcardCtr.textContent = `your flashcard(${counter})`; 
    newCardContainer.style.border = "solid 1px #3c3a4d"; 

    const newCard = document.createElement('div');
    newCard.classList.add('newCard');
    newCardContainer.appendChild(newCard);

    const textDiv = document.createElement("div");
    textDiv.classList.add("textDiv");
    newCard.appendChild(textDiv);

    const termH1 = document.createElement("h1");
    termH1.textContent = termValue; 
    termH1.classList.add("termDisplay");
    textDiv.appendChild(termH1);

    const definitionP = document.createElement("p");
    definitionP.textContent = definitionValue; 
    definitionP.classList.add("definitionDisplay");
    textDiv.appendChild(definitionP);

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("buttonDiv");
    newCard.appendChild(buttonDiv);
    
    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn");
    editBtn.addEventListener('click', editCard);
    buttonDiv.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener('click', deleteCard);
    buttonDiv.appendChild(deleteBtn);

    saveFlashcards();
}

function viewCards() {
    setTimeout(() => {
        window.location.href = 'cards.html';
    }, 500); // Adjust the delay as needed
}

cancelBtn.addEventListener('click', () => {
    term.value = "";
    definition.value = "";
    newCardContainer.innerHTML = "";
    newCardContainer.style.border = "none";
    counter = 0;
    h1YourFlashcard.style.display = 'none';
    pFlashcardCtr.style.display = 'none';
    localStorage.removeItem('flashcards');
});

addCardBtn.addEventListener('click', () => {
    if (term.value === "" || definition.value === "") {
        flashRedOutline(term);
        flashRedOutline(definition);
    } else {
        addFlashcard(term.value, definition.value);
        term.value = "";
        definition.value = "";
    }
});

document.addEventListener('DOMContentLoaded', loadFlashcards);