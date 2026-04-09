import { renderPhotos } from './draw-mini-pic.js';
//import './upload-form.js';

import './img-scale.js';
import './img-effects.js';
import { getData } from './server-api.js';
import { closeModal } from './modal.js';
import { showLoadDataError } from './data-messages.js';
import { setUserFormSubmit } from './upload-form.js';
import './validation.js';

getData().then((photos) => {
  renderPhotos(photos);
})
  .catch(() => {
    showLoadDataError();
  }
  );

setUserFormSubmit(closeModal);

