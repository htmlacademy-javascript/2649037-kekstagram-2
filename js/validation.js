const HASH_TAG_MAX = 5;

const uploadForm = document.querySelector('.img-upload__form');
const hashTagInput = uploadForm.querySelector('.text__hashtags');
const commentTextArea = uploadForm.querySelector('.text__description');


  const pristine = new Pristine(uploadForm, {
    classTo: ''
  });

  function validateHashTags(value) {
    //хештеги необязательны
    if (!value.trim()) {
      return true;
    }

    //разбиваем на несколько хештегов
    const tags = value.trim().toLowerCase().split(/\s+/);

    //проверяем количество хештегов
    if (tags.length > HASH_TAG_MAX) {
      return false;
    }

    //регулярное выражение
    const hashTagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

    //возвращаем результат проверки по регулярному выражению и по уникальности
    return tags.every((tag) => hashTagRegex.test(tag)) && new Set(tags).size === tags.length;
  }

  pristine.addValidator(
    hashTagInput,
    validateHashTags,
    'Неверный формат хештегов'
  );

  pristine.addValidator(
    commentTextArea,
    (value) => value.length <= 140,
    'Комментарий не должен превышать 140 символов'
  );

  uploadForm.addEventListener('submit', (evt) => {
    if (!pristine.validate()) {
      evt.preventDefault();
    }
  });
};


