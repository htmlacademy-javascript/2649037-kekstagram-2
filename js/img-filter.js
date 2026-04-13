import { getRandomInt } from './util';
import { renderPhotos } from './draw-mini-pic';

const FILTER_RANDOM_COUNT = 10;
const ID_DEFAULT = 'filter-default';
const ID_DISCUSSED = 'filter-discussed';
const ID_RANDOM = 'filter-random';

const imgFilterContainer = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');
let id = ID_DEFAULT;
let photos = [];

const getDefault = () => photos.slice();

const getRandom = () => {
  const photosCopy = photos.slice();
  const result = [];
  let index = 0;
  const maxCount = Math.min(FILTER_RANDOM_COUNT, photosCopy.length);
  for (let i = 0; i < maxCount; i++) {
    index = getRandomInt(0, (photosCopy.length - 1));
    result.push(photosCopy[index]);
    photosCopy.splice(index, 1);
  }

  return result;
};

const getDiscussed = () =>
  photos
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length);

const getPhotos = () => {
  switch (id) {
    case ID_RANDOM:
      return getRandom();

    case ID_DISCUSSED :
      return getDiscussed();

    case ID_DEFAULT:
    default:
      return getDefault();
  }
};

const setImgFilter = (receivedPhotos) => {
  imgFilterContainer.classList.remove('img-filters--inactive');
  photos = receivedPhotos;
  renderPhotos(getPhotos());
};

const onFilterContainerClick = (evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }
  id = evt.target.id;
  filterButtons.forEach((btn) =>
    btn.classList.remove('img-filters__button--active')
  );
  evt.target.classList.add('img-filters__button--active');

  renderPhotos(getPhotos());
};


imgFilterContainer.addEventListener('click', onFilterContainerClick);


export { setImgFilter, getPhotos};
