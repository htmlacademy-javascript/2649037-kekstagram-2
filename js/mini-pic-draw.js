import {createPhotoCard} from './photo-card-generator';

const photoCardsData = createPhotoCard();
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const pictureFragment = document.createDocumentFragment();
/**
 * Функция принимает информации о фотографии и записывает в
 * соответствующую графу.
 * @param {object} pictureData
 */
const photoDataFiller = (pictureData) => {
  const picture = pictureTemplate.cloneNode(true);
  const pictureImg = picture.querySelector('.picture__img');
  const pictureCommentsCount = picture.querySelector('.picture__comments');
  const pictureLikesCount = picture.querySelector('.picture__likes');

  pictureImg.src = pictureData.url;
  pictureImg.alt = pictureData.description;
  pictureLikesCount.textContent = pictureData.likes;
  pictureCommentsCount.textContent = pictureData.comments.length;

  pictureFragment.append(picture);
};

photoCardsData.forEach(photoDataFiller);

export const pictureDraw = () => picturesContainer.append(pictureFragment);

