import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURRENT_TIME_KEY = 'videoplayer-current-time';

//Ініціалізація плеєра у файлі скрипта:
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

//Використання методу on() для відстежування події timeupdate та збереження часу відтворення у локальне сховище:
player.on(
  'timeupdate',
  throttle(function (event) {
    const currentTime = event.seconds;
    localStorage.setItem(CURRENT_TIME_KEY, currentTime);
  }, 1000)
);

//Під час перезавантаження сторінки використовуйте метод setCurrentTime() для відновлення відтворення зі збереженої позиції:
window.addEventListener('load', function () {
  const currentTime = localStorage.getItem(CURRENT_TIME_KEY);
  if (currentTime) {
    player.setCurrentTime(parseFloat(currentTime));
  }
});
