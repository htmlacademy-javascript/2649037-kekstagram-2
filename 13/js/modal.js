import { uploadForm, fileInput, unblockSubmitButton, previewImg } from './upload-form.js';
import { scaleReset } from './img-scale.js';
import { effectReset } from './img-effects.js';
import { pristine } from './validation.js';
import { isEsc } from './util.js';

const PREVIEW_IMG_DEFAULT_SRC = 'img/upload-default-image.jpg';

let activeModal = '';

const enableFormEsc = () => document.addEventListener('keydown', onEscKeyDown);
const disabledFormEsc = () => document.removeEventListener('keydown', onEscKeyDown);

function onEscKeyDown(evt) {
  if (isEsc && activeModal) {
    // если фокус в поле комментария или хештега — ничего не делаем
    if (evt.target.classList.contains('text__description') ||
      evt.target.classList.contains('text__hashtags')) {
      return;
    }
    closeModal(activeModal);
  }
}

function resetForm() {
  fileInput.value = '';
  if (previewImg.src.startsWith('blob:')) {
    URL.revokeObjectURL(previewImg.src);
  }
  previewImg.src = PREVIEW_IMG_DEFAULT_SRC;
  uploadForm.reset();
  scaleReset();
  effectReset();
  pristine.reset();
  unblockSubmitButton();
}

function openModal(modalElement) {
  activeModal = modalElement;
  modalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
}

function closeModal() {
  if (!activeModal) {
    return;
  }
  activeModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  //Сброс
  if (activeModal.classList.contains('img-upload__overlay')) {
    resetForm();
  }
  activeModal = null;
}

export { openModal, closeModal, resetForm, enableFormEsc, disabledFormEsc };
