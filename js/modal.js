import { uploadForm, fileInput } from './upload-form.js';

let activeModal = '';
/**
 * Закрывает активное модальное окно при нажатии клавиши Escape.
 * @param {KeyboardEvent} evt — объект события клавиатуры.
 */
function onEscKeyDown(evt) {
  if (evt.key === 'Escape' && activeModal) {
    // если фокус в поле комментария или хештега — ничего не делаем
    if (evt.target.classList.contains('text__description') ||
        evt.target.classList.contains('text__hashtags')) {
      return;
    }
    closeModal(activeModal);
  }
}

/**
 * Открывает модальное окно:
 * удаляет класс hidden, блокирует прокрутку страницы
 * и добавляет обработчик закрытия по Esc.
 * @param {HTMLElement} modalElement — DOM‑элемент модального окна.
 */
function openModal(modalElement) {
  activeModal = modalElement;
  modalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
}

/**
 * Закрывает модальное окно:
 * добавляет класс hidden, разблокирует прокрутку
 * и удаляет обработчик закрытия по Esc.
 * @param {HTMLElement} modalElement — DOM‑элемент модального окна.
 */
function closeModal(modalElement) {
  modalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  //Сброс
  fileInput.value = '';
  uploadForm.reset();
  activeModal = null;
}

export { openModal, closeModal };
