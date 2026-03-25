const SOCIAL_COMMENT_STEP = 5;

const bigPictureContainer = document.querySelector('.big-picture');
const socialComments = bigPictureContainer.querySelector('.social__comments');
const socialTemplate = bigPictureContainer.querySelector('.social__comment');
const commentsCountShown = bigPictureContainer.querySelector('.social__comment-shown-count');
const commentsTotal = bigPictureContainer.querySelector('.social__comment-total-count');
const loadButton = bigPictureContainer.querySelector('.social__comments-loader');

let receivedComments = []; //сохраняем комментарии для перерисовки.
let commentsCount = SOCIAL_COMMENT_STEP;


const renderComment = (comment) => {
  const socialComment = socialTemplate.cloneNode(true);
  socialComment.querySelector('.social__picture').src = comment.avatar;
  socialComment.querySelector('.social__picture').alt = comment.name;
  socialComment.querySelector('.social__text').textContent = comment.message;

  return socialComment;
};

const renderComments = (currentComments, currentCount = SOCIAL_COMMENT_STEP) => {
  commentsCount = currentCount;

  //для каждой отрисовки комментариев создаем свой контейнер
  const socialFragment = document.createDocumentFragment();

  socialComments.innerHTML = '';

  //определяем сколько комментариев показываем если меньше комментариев по умолчанию.
  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;

  for (let i = 0; i < commentsCount; i++) {
    socialFragment.append(renderComment(currentComments[i]));
  }

  //заполняем шапку с количеством комментариев.
  commentsCountShown.textContent = commentsCount;
  commentsTotal.textContent = currentComments.length;

  //проверяем нужно ли показывать кнопку "еще"
  if(commentsCount >= currentComments.length) {
    loadButton.classList.add('hidden');
  } else {
    loadButton.classList.remove('hidden');
    receivedComments = currentComments;
  }

  socialComments.append(socialFragment);
};

const showMoreComments = (evt) => {
  evt.preventDefault();
  renderComments(receivedComments, commentsCount += SOCIAL_COMMENT_STEP);
};

loadButton.addEventListener('click', showMoreComments);

export {renderComments};
