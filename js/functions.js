// /* Функция для проверки длины строки. Она принимает строку,
//  которую нужно проверить на максимальную длину, и возвращает true,
//  если строка меньше или равна указанной длине, и false, если строка длиннее. */

function isPhraseSmall (phrase, phraseLength) {
   if (typeof phrase !== 'string') {
    console.error("This is not a string");
    return undefined;
   }
   if (typeof phraseLength !== 'number') {
    console.error("This is not a number");
    return undefined;
  }
  return phrase.length <= phraseLength;
}

console.log('phrase - \n"проверяемая строка", \nlenght - 20');
console.log(isPhraseSmall('проверяемая строка', 20));
console.log('phrase - \n"проверяемая строка", \nlenght - 18');
console.log(isPhraseSmall('проверяемая строка', 18));
console.log('phrase - \n"проверяемая строка", \nlenght - 10');
console.log(isPhraseSmall('проверяемая строка', 10));

console.log(" \n");

// /* Функция для проверки, является ли строка палиндромом.
// Палиндром — это слово или фраза,
// которые одинаково читаются и слева направо и справа налево. */
function isPalindrome (word){
  if (typeof(word) !== 'string') {
    console.error('This is not a number');
    return undefined;
  }
  if (word === ''){
    console.error('I need text');
    return undefined;
  }
  word = word.toLowerCase().replaceAll(' ', '');
  for (let leftSymbolIndex = 0; leftSymbolIndex <= word.length / 2; leftSymbolIndex++) {
    const rightSymbolIndex = word.length - 1 - leftSymbolIndex;
    if (word[leftSymbolIndex] !== word[rightSymbolIndex]) {
      return false;
    }
  }
  return true;
}

console.log('is "топот" palindrome?');
console.log(isPalindrome ('топот'));

console.log('is "ДовОд" palindrome?');
console.log(isPalindrome ('ДовОд'));

console.log('is "Кекс" palindrome?');
console.log(isPalindrome ('Кекс'));

console.log('is "Лёша на полке клопа нашёл " palindrome?');
console.log(isPalindrome ('Лёша на полке клопа нашёл '));

console.log('is "А роза упала на лапу Азора " palindrome?');
console.log(isPalindrome ('А роза упала на лапу Азора'));

console.log('is "А это просто предложение" palindrome?');
console.log(isPalindrome ('А это просто предложение'));


console.log(" \n");

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
// и возвращает их в виде целого положительного числа.
// Если в строке нет ни одной цифры, функция должна вернуть NaN:
function findNumbers (phrase){
  let result = '';
  if (phrase === ''){
    console.error('I need text');
    return undefined;
  }

  if (typeof(phrase) === 'number' && phrase % 1 === 0) {
    result = Math.abs(phrase);
  } else {
    if (typeof(phrase) === 'number') {
      phrase = phrase.toString();
    }
    for (let i = 0; i < phrase.length; i++) {
      if (!isNaN(phrase[i]) && phrase[i] !== ' ') {
        if (result === '' && phrase[i] === '0') {
          continue;
        }
        result += phrase[i];
      }
    }
  }
  return result === '' ? NaN : result;

}
console.log('check: 2023 год');
console.log(findNumbers('2023 год'));

console.log('check: ECMAScript 2022');
console.log(findNumbers('ECMAScript 2022'));

console.log('check: 1 кефир, 0.5 батона');
console.log(findNumbers('1 кефир, 0.5 батона'));

console.log('check: агент 007');
console.log(findNumbers('агент 007'));

console.log('check: а я томат');
console.log(findNumbers('а я томат'));

console.log('check: 2023');
console.log(findNumbers('2023'));

console.log('check: -1');
console.log(findNumbers(-1));

console.log('check: 1.5');
console.log(findNumbers(1.5));
