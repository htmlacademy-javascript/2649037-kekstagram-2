const SOCIAL_COMMENT_COUNT = 5;

const socialComments = document.querySelector('.social__comments');
const socialFragment = document.createDocumentFragment();
const socialTemplate = socialComments.querySelector('.social__comment');

let commentsCount = SOCIAL_COMMENT_COUNT;

const renderComment = (comment) => {
  const socialComment = socialTemplate.cloneNode(true);
  socialComment.querySelector('.social__picture').src = comment.avatar;
  socialComment.querySelector('.social__picture').alt = comment.name;
  socialComment.querySelector('.social__text').textContent = comment.message;

  return socialComment;
};

const renderComments = (currentComments) => {
  socialComments.innerHTML = '';

  //определяем сколько комментариев показываем если меньше комментариев по умолчанию.
  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;

  for (let i = 0; i < commentsCount; i++) {
    socialFragment.append(renderComment(currentComments[i]));
  }
  socialComments.append(socialFragment);
};


export {renderComments};
