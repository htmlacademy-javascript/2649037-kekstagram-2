import { renderComments } from './render-comments.js';
import { openModal, closeModal } from './modal.js';

const bigPictureContainer = document.querySelector('.big-picture');
const buttonCancel = document.querySelector('.big-picture__cancel');

const drawBigPicture = function (pictureData){
  bigPictureContainer.classList.toggle('hidden');

  //заполняем данными
  bigPictureContainer.querySelector('.big-picture__img img').src = pictureData.url;
  bigPictureContainer.querySelector('.likes-count').textContent = pictureData.likes;
  bigPictureContainer.querySelector('.social__caption').textContent = pictureData.description;

  //добавляем комментарии
  renderComments(pictureData.comments);

  //включаем модальное окно
  openModal(bigPictureContainer);
};

const onButtonCancelClick = () => closeModal(bigPictureContainer);
buttonCancel.addEventListener('click', onButtonCancelClick);

export {drawBigPicture};
