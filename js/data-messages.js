import { isEsc } from './util.js';
import { enableFormEsc, disabledFormEsc } from './modal.js';

const DISPLAY_MESSAGE_TIME = 5000;

const showLoadDataError = () => {
  const template = document.querySelector('#data-error')
    .content.querySelector('.data-error');

  const message = template.cloneNode(true);
  document.body.append(message);

  setTimeout(() => {
    message.remove();
  }, DISPLAY_MESSAGE_TIME);
};

const showDataMessage = (state) => {
  disabledFormEsc();
  document.body.classList.add('modal-open');
  const template = document.querySelector(`#${state}`)
    .content.querySelector(`.${state}`);

  const message = template.cloneNode(true);
  const button = message.querySelector(`.${state}__button`);

  document.body.append(message);

  const onEscKeyDown = (evt) => {
    if (isEsc(evt)) {
      closeMessage();
    }
  };

  const onOutsideClick = (evt) => {
    if (!evt.target.closest(`.${state}__inner`)) {
      closeMessage();
    }
  };

  function closeMessage() {
    message.remove();
    enableFormEsc();
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onOutsideClick);
  }

  const onButtonClick = () => closeMessage();

  button.addEventListener('click', onButtonClick);
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onOutsideClick);
};


export { showLoadDataError, showDataMessage };
