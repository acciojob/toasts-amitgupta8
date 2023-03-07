//your JS code here. If required.
// Get the necessary DOM elements
const addButton = document.querySelector('#add-button');
const clearButton = document.querySelector('#clear-button');
const successRadio = document.querySelector('#success');
const errorRadio = document.querySelector('#error');
const messageTextarea = document.querySelector('#message-content');
const durationInput = document.querySelector('#duration');
const cancelableCheckbox = document.querySelector('#cancelable');
const toastsDiv = document.querySelector('#toasts');

// Set default values for toast options
let toastType = 'success';
let toastMessage = '';
let toastDuration = 500;
let toastCancelable = false;

// Helper function to create a new toast
function createToast() {
  // Create the toast element
  const toast = document.createElement('div');
  toast.classList.add('toast', `${toastType}-toast`);

  // Create the message element
  const message = document.createElement('p');
  message.classList.add('message');
  message.textContent = toastMessage;
  toast.appendChild(message);

  // Create the cancel button element, if necessary
  if (toastCancelable) {
    const cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel-button');
    cancelButton.textContent = 'X';
    cancelButton.addEventListener('click', () => {
      toast.remove();
    });
    toast.appendChild(cancelButton);
  }

  // Add the toast to the page
  toastsDiv.insertBefore(toast, toastsDiv.firstChild);

  // Set a timeout to remove the toast after the specified duration
  setTimeout(() => {
    toast.remove();
  }, toastDuration);
}

// Add an event listener to the add button
addButton.addEventListener('click', () => {
  // Update the toast options based on the user's selections
  if (successRadio.checked) {
    toastType = 'success';
  } else if (errorRadio.checked) {
    toastType = 'error';
  }
  if (messageTextarea.value.trim() === '') {
    toastMessage = toastType === 'success' ? 'Success!' : 'Error.';
  } else {
    toastMessage = messageTextarea.value.trim();
  }
  toastDuration = parseInt(durationInput.value);
  if (isNaN(toastDuration) || toastDuration < 500) {
    toastDuration = 500;
  }
  toastCancelable = cancelableCheckbox.checked;

  // Create the new toast
  createToast();
});

// Add an event listener to the clear button
clearButton.addEventListener('click', () => {
  // Remove all existing toasts from the page
  const toasts = document.querySelectorAll('.toast');
  toasts.forEach((toast) => {
    toast.remove();
  });
});
