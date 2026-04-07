import { renderPhotos } from './draw-mini-pic.js';
import './upload-form.js';
import './validation.js';
import './img-scale.js';
import './img-effects.js';
import { getData } from './server.js';
import { closeModal } from './modal.js';
import { setUserFormSubmit } from './validation.js';

getData().then((photos) => {
  renderPhotos(photos);
})
  .catch((err) => {
    // showAlert(err.message);
    alert(err);
  }
  );

setUserFormSubmit(closeModal);

