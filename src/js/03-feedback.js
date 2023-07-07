// Вимога до модуля lodash.throttle
import throttle from 'lodash.throttle';

// Вибір форми по класу CSS
const formEL = document.querySelector('.feedback-form');

// Константа для зберігання ключа сховища та об'єкт для зберігання даних форми
const STORAGE_KEY = 'feedback-form-state';
let formData = {};

// Функція для зберігання стану форми в об'єкті formData та збереження його в локальне сховище
const saveFormState = evt => {
  formData[evt.target.name] = evt.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

// Додавання обробника події input на форму з використанням функції throttle, яка викликає saveFormState не частіше одного разу на 500 мс
formEL.addEventListener('input', throttle(saveFormState, 500));

// Додавання обробника події load на вікно для завантаження збереженого стану форми з локального сховища при перезавантаженні сторінки
window.addEventListener('load', function () {
  try {
    const data = this.localStorage.getItem(STORAGE_KEY);
    if (!data) return;
    formData = JSON.parse(data);
    Object.entries(formData).forEach(([key, val]) => {
      formEL.elements[key].value = val;
    });
  } catch (error) {
    console.log(error.message);
  }
});

// Додавання обробника події submit на форму для очищення сховища, скидання полів форми та виведення даних форми у консоль
formEL.addEventListener('submit', function (evt) {
  evt.preventDefault();
  localStorage.removeItem(STORAGE_KEY);
  evt.target.reset();
  console.log(formData);
});
