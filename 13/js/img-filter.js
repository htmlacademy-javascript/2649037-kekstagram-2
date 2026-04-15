import { renderPhotos } from './draw-mini-pic.js';
import { debounce, shuffleArray } from './util.js';


const FILTER_RANDOM_COUNT = 10;
const ID_DEFAULT = 'filter-default';
const ID_DISCUSSED = 'filter-discussed';
const ID_RANDOM = 'filter-random';
const DEBOUNCE_TIME_DELAY = 500;

const imgFilterContainer = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');
let id = ID_DEFAULT;
let photos = [];


const getDefault = () => photos.slice();

const getRandom = () => shuffleArray(photos.slice()).slice(0, FILTER_RANDOM_COUNT) ;

const getDiscussed = () =>
  photos
    .slice()
    .sort((firstElement, secondElement) => secondElement.comments.length - firstElement.comments.length);

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

const debouncedRender = debounce(
  () => renderPhotos(getPhotos()),
  DEBOUNCE_TIME_DELAY
);

const onFilterContainerClick = (evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }
  id = evt.target.id;
  filterButtons.forEach((btn) =>
    btn.classList.remove('img-filters__button--active')
  );
  evt.target.classList.add('img-filters__button--active');

  debouncedRender();

};


imgFilterContainer.addEventListener('click', onFilterContainerClick);


export { setImgFilter, getPhotos};
