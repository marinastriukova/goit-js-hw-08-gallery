import galleryItems from "./data/gallery-items.js";

const galleryList = document.querySelector(".js-gallery");
const modalEl = document.querySelector(".lightbox");
const imageBox = document.querySelector(".lightbox__image");
const closeBtn = document.querySelector('[data-action="close-lightbox"]');

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
const gallaryMarkup = createImagesGalleryMarkup(galleryItems);
galleryList.insertAdjacentHTML("beforeend", gallaryMarkup);

function createImagesGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`;
    })
    .join("");
}

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
galleryList.addEventListener("click", onGalleryClick);

function onGalleryClick(evt) {
  const selectedImages = evt.target;
  evt.preventDefault();
  if (selectedImages.nodeName !== "IMG") {
    return;
  }

  // Открытие модального окна по клику на элементе галереи.

  modalEl.classList.add("is-open");

  // Подмена значений src и alt
  imageBox.src = selectedImages.dataset.source;
  imageBox.alt = selectedImages.alt;
}

// Закрытие модалки
closeBtn.addEventListener("click", onCloseModal);

function onCloseModal() {
  modalEl.classList.remove("is-open");
  clearImageBox();
}

function clearImageBox() {
  imageBox.src = "";
  imageBox.alt = "";
  // или
  // imageBox.removeAttribute("src");
  // imageBox.removeAttribute("alt");
}
