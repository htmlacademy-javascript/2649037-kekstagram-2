import { openModal, closeModal } from './modal.js';
import { pristine } from './validation.js';
import { showDataMessage } from './data-messages.js';
import { sendData } from './server-api.js';
import { showLoadDataError } from './data-messages.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const uploadForm = document.querySelector('.img-upload__form');
const fileInput = uploadForm.querySelector('.img-upload__input');
const overlay = uploadForm.querySelector('.img-upload__overlay');
const uploadButtonCancel = uploadForm.querySelector('.img-upload__cancel');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const hashTagInput = uploadForm.querySelector('.text__hashtags');
const commentTextArea = uploadForm.querySelector('.text__description');
const previewImg = document.querySelector('.img-upload__preview img');

//Настраиваем состояние кнопки отправки для разных условий
const submitButtonState = () => {
  const isValid = pristine.validate();
  submitButton.disabled = !isValid;
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

//Отправляем данные, если прошла валидация.
const setUserFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess(); // закрываем модалку
          showDataMessage('success'); // показываем успех
        })
        .catch(() => {
          showDataMessage('error'); // показываем ошибку
        })
        .finally(() => {
          unblockSubmitButton(); // только разблокировка
        });
    }
  });
};

//Функции обработчики событий
const onFileInputChange = () => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((ext) => fileName.endsWith(ext));

  if (matches) {
    previewImg.src = URL.createObjectURL(file);
    openModal(overlay);
  } else {
    showLoadDataError();
  }
};
const onUploadButtonCancelClick = () => closeModal();
const onInputHashTagInput = () => submitButtonState();
const onInputTextAreaInput = () => submitButtonState();


hashTagInput.addEventListener('input', onInputHashTagInput);
commentTextArea.addEventListener('input', onInputTextAreaInput);
fileInput.addEventListener('change', onFileInputChange);
uploadButtonCancel.addEventListener('click', onUploadButtonCancelClick);

export { uploadForm, fileInput, setUserFormSubmit, unblockSubmitButton, previewImg };
