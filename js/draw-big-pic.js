import { renderComments } from './render-comments';


const bigPictureContainer = document.querySelector('.big-picture');
const buttonCancel = document.querySelector('.big-picture__cancel');

const onButtonCancelClick = () => {
  bigPictureContainer.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeyDown);
};

function onDocumentEscKeyDown (evt) {
  if(evt.key === 'Escape'){
    onButtonCancelClick();
  }
}

const drawBigPicture = function (pictureData){
  bigPictureContainer.classList.toggle('hidden');

  //заполняем данными
  bigPictureContainer.querySelector('.big-picture__img img').src = pictureData.url;
  bigPictureContainer.querySelector('.likes-count').textContent = pictureData.likes;
  bigPictureContainer.querySelector('.social__caption').textContent = pictureData.description;

  //добавляем комментарии
  renderComments(pictureData.comments);

  // need also social__comment-shown-count
  bigPictureContainer.querySelector('.social__comment-total-count').textContent = pictureData.comments.length;

  //скрываем по заданию
  bigPictureContainer.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureContainer.querySelector('.comments-loader').classList.add('hidden');

  //блокируем прокрутку
  document.body.classList.toggle('modal-open');

  //добавляем обработчик Esc
  document.addEventListener('keydown', onDocumentEscKeyDown);
};

buttonCancel.addEventListener('click', onButtonCancelClick);

export {drawBigPicture};
