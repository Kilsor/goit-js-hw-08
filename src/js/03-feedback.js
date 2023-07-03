import throttle from 'lodash.throttle';

//Виберіть форму і поля вводу у файлі скрипта:
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

//Використовуємо подію input на полях вводу, щоб зберігати значення полів у локальне сховище з використанням lodash.throttle:
const saveFormState = () => {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

emailInput.addEventListener('input', throttle(saveFormState, 500));
messageInput.addEventListener('input', throttle(saveFormState, 500));

//Під час завантаження сторінки перевіряємо стан сховища і заповнюємо поля форми збереженими значеннями, якщо вони є:
window.addEventListener('load', function () {
  const savedFormData = localStorage.getItem('feedback-form-state');
  if (savedFormData) {
    const formData = JSON.parse(savedFormData);
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
});

//Додаємо обробник події submit до форми для очищення сховища та полів форми, і виводимо дані форми у консоль:
form.addEventListener('submit', function (event) {
  event.preventDefault();
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(formData);
});
