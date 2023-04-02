import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';

const gallery = document.querySelector('.gallery');

const photosMarkup = addImagesItems(galleryItems);
gallery.insertAdjacentHTML('beforeend', photosMarkup);

function addImagesItems(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
         <li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img class="gallery__image" src="${preview}" alt="${description}" />
            </a>
         </li>`;
    })
    .join('');
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
