import { initCart } from './main.js';

function validateForm(e) {
  e.preventDefault();
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const error = document.getElementById('form-error');
  if (!name.value || !email.value || !message.value) {
    error.textContent = 'Please fill in all fields.';
    error.classList.remove('hidden');
  } else {
    error.classList.add('hidden');
    alert('Thank you for contacting us!');
    e.target.reset();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contact-form').addEventListener('submit', validateForm);
  initCart();
});
