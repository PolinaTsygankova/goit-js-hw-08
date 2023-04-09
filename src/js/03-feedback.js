// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
//* Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.c
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector("input[name='email']");
const messageInput = document.querySelector("textarea[name='message']");
const submitBtn = document.querySelector("button[type='submit']");

const STORAGE_FORM_KEY = 'feedback-form-state';
const data = {
  email: '',
  message: '',
};

function afterPageLoadEnd(e) {
  if (localStorage.getItem(STORAGE_FORM_KEY)) {
    const validData = JSON.parse(localStorage.getItem(STORAGE_FORM_KEY));

    // console.log(validData);
    emailInput.value = validData.email;
    // console.log(emailInput.value);
    messageInput.value = validData.message;
    // console.log(validData.message);
  } else {
    return;
  }
}

function onFormsInputsClick(e) {
  const eventTargetText = e.target.value;
  // const eventTargetText = emailInput.value;

  // console.log(e.target.name);
  //! if (e.target.name === 'email') {
  data.email = emailInput.value;
  // console.log(data.email);
  //! } else if (e.target.name === 'message') {
  data.message = messageInput.value;
  // console.log(data.message);
  //! }
  console.log(data);
  console.log(eventTargetText);

  const jsonData = JSON.stringify(data);
  localStorage.setItem(STORAGE_FORM_KEY, jsonData);
}

function onSubmitBtn(e) {
  e.preventDefault();

  if (
    (emailInput.value === '' ||
    messageInput.value === '') ||
    (emailInput.value === '' && messageInput.value === '')
  ) {
    alert('Заповність усі поля!');
  } else if (localStorage.getItem(STORAGE_FORM_KEY)) {
    const notValidData = localStorage.getItem(STORAGE_FORM_KEY);
    const validData = JSON.parse(notValidData);

    console.log(validData);
    emailInput.value = '';
    messageInput.value = '';
    localStorage.removeItem(STORAGE_FORM_KEY);
  }
}

form.addEventListener('submit', onSubmitBtn);
window.addEventListener('load', afterPageLoadEnd);
form.addEventListener('input', throttle(onFormsInputsClick, 500));
