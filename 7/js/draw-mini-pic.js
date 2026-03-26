import {drawBigPicture} from './draw-big-pic';
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const pictureFragment = document.createDocumentFragment();

/**
 * Принимает объект с данными фотографии и возвращает DOM-элемент карточки.
 * @param {object} pictureData
 * @returns picture
 */
const renderPhoto = (pictureData) => {
  const picture = pictureTemplate.cloneNode(true);
  const pictureImg = picture.querySelector('.picture__img');
  pictureImg.src = pictureData.url;
  pictureImg.alt = pictureData.description;
  picture.querySelector('.picture__likes').textContent = pictureData.likes;
  picture.querySelector('.picture__comments').textContent = pictureData.comments.length;

  pictureImg.addEventListener('click', () => drawBigPicture(pictureData));
  return picture;
};

const renderPhotos = (pictures) => {
  pictures?.forEach((picture) => {
    pictureFragment.append(renderPhoto(picture));
  });

  picturesContainer.append(pictureFragment);
};

export {renderPhotos};
