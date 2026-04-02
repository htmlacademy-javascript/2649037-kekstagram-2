import { uploadForm } from './upload-form.js';
import { uploadImg } from './img-scale.js';

const EFFECTS = {
  none: {
    filter: () => 'none',
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
  },
  chrome: {
    filter: (value) => `grayscale(${value})`,
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
  },
  sepia: {
    filter: (value) => `sepia(${value})`,
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
  },
  marvin: {
    filter: (value) => `invert(${value}%)`,
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
  },
  phobos: {
    filter: (value) => `blur(${value}px)`,
    range: { min: 0, max: 3 },
    start: 3,
    step: 0.1,
  },
  heat: {
    filter: (value) => `brightness(${value})`,
    range: { min: 1, max: 3 },
    start: 3,
    step: 0.1,
  },
};
const slider = uploadForm.querySelector('.effect-level__slider');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');
const effectsList = uploadForm.querySelector('.effects__list');
const effectValue = uploadForm.querySelector('.effect-level__value');


let effectName = 'none';
let effect = EFFECTS[effectName];

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value,
    from: (value) => parseFloat(value)
  },
});

const onUpdateSlider = () => {
  const currentSliderValue = slider.noUiSlider.get();
  effectValue.value = currentSliderValue;
  uploadImg.style.filter = effect.filter(currentSliderValue);
};


const effectReset = () => {
  sliderContainer.classList.add('hidden');
  effectName = 'none';
  effect = EFFECTS[effectName];
  uploadImg.style.filter = 'none';
  slider.noUiSlider.set(effect.start);
};

slider.noUiSlider.on('update', onUpdateSlider);


effectsList.addEventListener('change', (evt) => {
  effectName = evt.target.value;
  if (effectName !== 'none') {
    effect = EFFECTS[effectName];

    // обновляем параметры слайдера
    slider.noUiSlider.updateOptions({
      range: effect.range,
      start: effect.start,
      step: effect.step,
    });
    sliderContainer.classList.remove('hidden');

    // применяем значение на старте
    uploadImg.style.filter = effect.filter(effect.start);
    slider.noUiSlider.set(effect.start);
    effectValue.value = effect.start;
  } else {
    effectReset();
  }
});

export {effectReset};
