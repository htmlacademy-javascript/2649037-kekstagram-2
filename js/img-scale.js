import { uploadForm } from './upload-form.js';

const SCALE = {
  STEP: 25,
  MAX: 100,
  MIN: 25,
  DEFAULT: 100,
};
const scaleMinus = uploadForm.querySelector('.scale__control--smaller');
const scalePlus = uploadForm.querySelector('.scale__control--bigger');
const scaleValue = uploadForm.querySelector('.scale__control--value');
const uploadImg = uploadForm.querySelector('.img-upload__preview img');

const isScaleInRange = (newScale) => newScale <= SCALE.MAX && newScale >= SCALE.MIN;

const applyScale = (isPlus) => {
  let scale = parseInt(scaleValue.value, 10);
  if (isPlus) {
    scale = scale + SCALE.STEP;
  } else {
    scale = scale - SCALE.STEP ;
  }
  if (isScaleInRange(scale)) {
    scaleValue.value = `${scale}%`;
    uploadImg.style.transform = `scale(${scale / 100})`;
  }
};

const scaleReset = () => {
  scaleValue.value = SCALE.DEFAULT;
  uploadImg.style.transform = `scale(${SCALE.DEFAULT / 100})`;
};

const onClickScaleMinus = () => applyScale(false);
const onClickScalePlus = () => applyScale(true);
scaleMinus.addEventListener('click', onClickScaleMinus);
scalePlus.addEventListener('click', onClickScalePlus);

export {scaleReset, uploadImg};
