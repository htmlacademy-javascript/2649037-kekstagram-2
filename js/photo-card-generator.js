import {getRandomInt} from './util.js';
import {getPhotoData} from './data.js';

// объявляем константы, переменные
const PHOTO_COUNT = 25;
const COMMENTS_MAX_COUNT = 30;
const Likes = {
  MIN: 15,
  MAX: 200
};

const AVATAR_MAX_NUM = 6;
const photoData = getPhotoData;

// создаем переменные
const photosDataBase = [];
let commentId = 0;

// описываем функции добавления комментариев.
const getMessage = () => {
  let message = '';
  for (let i = 0; i < 2; i++) {
    const commentsDataIndex = getRandomInt(0, photoData.commentsData.length - 1);
    if(message !== photoData.commentsData[commentsDataIndex]) { //если такое сообщение уже есть, то будет одно, если нет - то два.
      message += photoData.commentsData[commentsDataIndex];
    }
  }
  return message;
};

const getComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomInt(1, AVATAR_MAX_NUM)}.svg`,
  message: getMessage(),
  name: photoData.names[getRandomInt(0, photoData.names.length - 1)]
});

const getComments = () => {
  const photoComments = [];
  for (let i = 0; i < getRandomInt(0, COMMENTS_MAX_COUNT); i++) {
    photoComments.push(getComment());
  }
  return photoComments;
};

// описываем функции добавления фотографий.
const addPhoto = (index) => ({
  id: index,
  url: `photos/${index + 1}.jpg`,
  description: photoData.photoDescriptions[getRandomInt(0, photoData.photoDescriptions.length - 1)],
  likes: getRandomInt(Likes.MIN, Likes.MAX),
  comments: getComments()
});

const addPhotos = () => {
  for (let i = 0; i < PHOTO_COUNT; i++) {
    photosDataBase.push(addPhoto(i));
  }
};

export const createPhotoCard = () => {
  addPhotos();
  return photosDataBase;
};
