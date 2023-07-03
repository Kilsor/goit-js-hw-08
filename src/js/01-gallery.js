// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
// Change code below this line

const list = document.querySelector('.gallery');

// Додаємо розмітку елементів галереї на основі масиву даних
list.insertAdjacentHTML('beforeend', createMarkupItems(galleryItems));

// Функція для створення розмітки елементів галереї
function createMarkupItems(arr) {
  return arr
    .map(
      ({ preview, original, description }) => `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            alt="${description}"
            data-source="${original}"
          />
        </a>
      </li>`
    )
    .join('');
}

// Ініціалізація SimpleLightbox
new SimpleLightbox('.gallery a', {
  captions: true, // Включення підписів до зображень
  captionsData: 'alt', // Використання значення атрибуту "alt" для підпису
  captionPosition: 'bottom', // Позиція підпису (bottom, top)
  captionDelay: 250, // Затримка перед з'явленням підпису (мс)
});
