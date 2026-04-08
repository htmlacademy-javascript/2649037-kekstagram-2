import { isEsc } from './util.js';

const showLoadDataError = () => {
  const template = document.querySelector('#data-error')
    .content.querySelector('.data-error');

  const message = template.cloneNode(true);
  document.body.append(message);

  setTimeout(() => {
    message.remove();
  }, 5000);
};

const showDataMessage = (state) => {
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
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onOutsideClick);
  }

  button.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onOutsideClick);
};


export { showLoadDataError, showDataMessage };
