const HASH_TAGS_MAX = 5;
const HASH_TAGS_SYMBOLS_MAX = 20;
const COMMENT_LENGTH_MAX = 140;

const uploadForm = document.querySelector('.img-upload__form');
const hashTagInput = uploadForm.querySelector('.text__hashtags');
const commentTextArea = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

let errorMessage = '';
const error = () => errorMessage;

function validateHashTags(value) {
  errorMessage = '';

  //разбиваем на несколько хештегов
  const tags = value.trim().toLowerCase().split(/\s+/);

  //хештеги необязательны
  if (!value.trim()) {
    return true;
  }

  const rules = [
    {
      check: tags.some((tag) => tag.indexOf('#', 1) >= 1),
      error: 'Хэштеги разделяются пробелами',
    },
    {
      check: tags.some((tag) => tag[0] !== '#'),
      error: 'Хэштег должен начинаться с символа #',
    },
    {
      check: tags.some((tag, num, arr) => arr.includes(tag, num + 1)),
      error: 'Хэштеги не должны повторяться',
    },
    {
      check: tags.some((tag) => tag.length > HASH_TAGS_SYMBOLS_MAX),
      error: `Максимальная длина одного хештега ${HASH_TAGS_SYMBOLS_MAX} символов включая решетку`,
    },
    {
      check: tags.length > HASH_TAGS_MAX,
      error: `Нельзя указать больше ${HASH_TAGS_MAX} хештегов`,
    },
    {
      check: tags.some((tag) => !/^#[a-zа-яё0-9]{1,19}$/i.test(tag)),
      error: 'Хештег содержит недопустимые символы',
    },
  ];
  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
}


pristine.addValidator(
  hashTagInput,
  validateHashTags,
  error
);

pristine.addValidator(
  commentTextArea,
  (value) => value.length <= COMMENT_LENGTH_MAX,
  `Комментарий не должен превышать ${COMMENT_LENGTH_MAX} символов`
);

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});


function submitButtonState() {
  const isValid = pristine.validate();
  submitButton.disabled = !isValid;
}

const onInputHashTag = () => submitButtonState();
const onInputTextArea = () => submitButtonState();

hashTagInput.addEventListener('input', onInputHashTag);
commentTextArea.addEventListener('input', onInputTextArea);
export { pristine };
