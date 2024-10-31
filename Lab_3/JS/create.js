// Get DOM elements
// const createForm = document.getElementById('create-animal-form');
// const editForm = document.getElementById('edit-animal-form');
// const modal = document.getElementById('modal');
// const modalMessage = document.getElementById('modal-message');
// const closeModal = document.getElementsByClassName('close')[0];

// Form submission handler
// function handleSubmit(event) {
//     event.preventDefault();
//     const form = event.target;
//     const formData = new FormData(form);
//     const animal = Object.fromEntries(formData.entries());

//     if (validateForm(animal)) {
//         // Here you would typically send the data to a server
//         // For now, we'll just show a success message
//         showModal(`Animal "${animal.title}" has been ${form.id === 'create-animal-form' ? 'created' : 'updated'} successfully!`);
//         form.reset();
//     }
// }

// // Form validation
// function validateForm(animal) {
//     let isValid = true;
//     let errorMessage = '';

//     if (animal.title.length < 3) {
//         isValid = false;
//         errorMessage += 'Title must be at least 3 characters long.\n';
//     }

//     if (animal.description.length < 10) {
//         isValid = false;
//         errorMessage += 'Description must be at least 10 characters long.\n';
//     }

//     if (isNaN(animal['daily-expense']) || parseFloat(animal['daily-expense']) < 0) {
//         isValid = false;
//         errorMessage += 'Daily expense must be a positive number.\n';
//     }

//     if (!animal['animal-type']) {
//         isValid = false;
//         errorMessage += 'Please select an animal type.\n';
//     }

//     if (!isValid) {
//         showModal(errorMessage, true);
//     }

//     return isValid;
// }

// // Modal functions
// function showModal(message, isError = false) {
//     modalMessage.textContent = message;
//     modalMessage.className = isError ? 'error-message' : '';
//     modal.style.display = 'block';
// }

// function closeModalHandler() {
//     modal.style.display = 'none';
// }

// // Event listeners
// createForm.addEventListener('submit', handleSubmit);
// editForm.addEventListener('submit', handleSubmit);
// closeModal.addEventListener('click', closeModalHandler);
// window.addEventListener('click', (event) => {
//     if (event.target === modal) {
//         closeModalHandler();
//     }
// });

// // For demonstration purposes, let's populate the edit form
// // In a real application, you'd fetch this data from a server
// function populateEditForm() {
//     document.getElementById('edit-animal-form').elements['title'].value = 'Sample Animal';
//     document.getElementById('edit-animal-form').elements['description'].value = 'This is a sample animal description.';
//     document.getElementById('edit-animal-form').elements['daily-expense'].value = '50';
//     document.getElementById('edit-animal-form').elements['animal-type'].value = 'mammal';
// }

// // Call this function when the page loads
// populateEditForm();

import { currentlyDisplayedTools, 
        tools,
        renderTools,
        Tool } from "./main";

const toolName = document.getElementById('tool-type');
const description = document.getElementById('description');
const power = document.getElementById('power');
const chainRevolutions = document.getElementById('chainRevolutions');
const price = document.getElementById('price');
const removeButton = document.querySelector('.remove-btn');


// function searchValidImage(){
//   const image = 
// }

function addNewTool() {

}

function getInputs() {
  return{
    
  }
}
