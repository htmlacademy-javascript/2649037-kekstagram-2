let activeModal = null;
const commentTextArea = document.querySelector('.text__description');
/**
 * Закрывает активное модальное окно при нажатии клавиши Escape.
 * @param {KeyboardEvent} evt — объект события клавиатуры.
 */
function onEscKeyDown(evt) {
  if (evt.key === 'Escape' && activeModal) {
    // если фокус в textarea — ничего не делаем
    if (document.activeElement === commentTextArea) {
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
  //Сбрасываем выбранный файл.
  document.querySelector('.img-upload__input').value = '';
  activeModal = null;
}

export { openModal, closeModal };
