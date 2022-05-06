// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);
const galleryContainer = document.querySelector('.gallery');
const cardsMarkup = createColorCardsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);

galleryContainer.addEventListener('click', onGalleryContainerClick);

function createColorCardsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
      <a class="gallery__item" href="${original}">
      <img class="gallery__image" src="${preview}"
       alt="${description}" />
    </a> `;
    })
    .join('');
}

var lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250 /* options */,
});
console.log(lightbox);

function onGalleryContainerClick(evt) {
  evt.preventDefault();
  const isColorSwatchEl = evt.target.classList.contains('gallery__image');
  if (!isColorSwatchEl) {
    return;
  }

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      instance.close();
    }
  });
}
