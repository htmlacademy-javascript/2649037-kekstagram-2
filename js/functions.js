
// имяФункции('08:00', '17:30', '14:00', 90); // true
// имяФункции('8:0', '10:0', '8:0', 120);     // true
// имяФункции('08:00', '14:30', '14:00', 90); // false
// имяФункции('14:00', '17:30', '08:0', 90);  // false
// имяФункции('8:00', '17:30', '08:00', 900); // false
/**
 *
 * @param {string} timeStart начало рабочего дня
 * @param {string*} timeEnd конец рабочего дня
 * @param {string*} meetingBegin начало встречи
 * @param {*string} meetingDuration продолжительность встречи в минутах
 * @returns {boolean} true если встреча входит в рабочее время.
 */
function isNoOvertime(timeStart, timeEnd, meetingBegin, meetingDuration) {
  /**
   * Переводим часы в минуты
   * @param {string} timeStr получаем время в формате 'XX:XX'
   * @returns {num} возвращаем количество минут.
   */
  function toMinutes(timeStr) {
    const [h, m] = timeStr.split(':');
    return parseInt(h, 10) * 60 + parseInt(m, 10);
  }

  const timeStartMin = toMinutes(timeStart);
  const timeEndMin = toMinutes(timeEnd);
  const meetingBeginMin = toMinutes(meetingBegin);
  const meetingEndMin = meetingBeginMin + meetingDuration;

  return (meetingBeginMin >= timeStartMin) && (meetingEndMin <= timeEndMin);
}
