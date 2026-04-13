import { getData } from './server-api.js';
import { closeModal } from './modal.js';
import { showLoadDataError } from './data-messages.js';
import { setUserFormSubmit } from './upload-form.js';
import { setImgFilter } from './img-filter.js';


getData().then((photos) => {
  setImgFilter(photos);
})
  .catch(() => {
    showLoadDataError();
  }
  );

setUserFormSubmit(closeModal);

