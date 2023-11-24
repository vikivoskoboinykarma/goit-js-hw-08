
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const STORAGE_KEY = 'feedback-form-state';

// Функція збереження стану форми в локальному сховищі
const saveFormState = throttle(() => {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}, 500);

// Функція для заповнення полів форми зі збереженого стану
const loadFormState = () => {
  const savedFormData = localStorage.getItem(STORAGE_KEY);

  if (savedFormData) {
    const { email, message } = JSON.parse(savedFormData);
    emailInput.value = email;
    messageInput.value = message;
  }
};

// Під час введення даних в поля форми зберігаємо стан у локальне сховище
form.addEventListener('input', saveFormState);

// Під час завантаження сторінки перевіряємо стан сховища і заповнюємо поля форми
window.addEventListener('load', loadFormState);

// Під час сабміту форми очищуємо сховище та виводимо дані у консоль
form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  // Очистка сховища
  localStorage.removeItem(STORAGE_KEY);

  // Очистка полів форми
  emailInput.value = '';
  messageInput.value = '';

  // Виведення у консоль об'єкта з даними форми
  console.log(formData);
});
