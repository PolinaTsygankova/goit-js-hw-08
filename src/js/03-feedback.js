// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
//* Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.
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

function onSubmitBtn(e) {
  e.preventDefault();

  if (localStorage.getItem(STORAGE_FORM_KEY)) {
    const notValidData = localStorage.getItem(STORAGE_FORM_KEY);
    const validData = JSON.parse(notValidData);

    console.log(validData);

    emailInput.value = '';
    messageInput.value = '';
    localStorage.removeItem(STORAGE_FORM_KEY);
  } else {
    alert('Заповність усі поля!');
  }
}

function afterPageLoadEnd(e) {
  if (localStorage.getItem(STORAGE_FORM_KEY)) {
    const validData = JSON.parse(localStorage.getItem(STORAGE_FORM_KEY));

    emailInput.value = validData.email;
    messageInput.value = validData.message;
  } else {
    return;
  }
}

function onFormsInputsClick(e) {
  const eventTargetText = e.target.value;

  if (e.target.name === 'email') {
    data.email = eventTargetText;
  } else {
    data.message = eventTargetText;
  }

  const jsonData = JSON.stringify(data);
  localStorage.setItem(STORAGE_FORM_KEY, jsonData);
  //   console.log(data);
}

form.addEventListener('submit', onSubmitBtn);
window.addEventListener('load', afterPageLoadEnd);
form.addEventListener('input', throttle(onFormsInputsClick, 500));
