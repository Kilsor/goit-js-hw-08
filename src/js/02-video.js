import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

//Ініціалізація плеєра у файлі скрипта:
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

//Використання методу on() для відстежування події timeupdate та збереження часу відтворення у локальне сховище:
player.on(
  'timeupdate',
  throttle(function (event) {
    const currentTime = event.seconds;
    localStorage.setItem('videoplayer-current-time', currentTime);
  }, 1000)
);

//Під час перезавантаження сторінки використовуйте метод setCurrentTime() для відновлення відтворення зі збереженої позиції:
window.addEventListener('load', function () {
  const currentTime = localStorage.getItem('videoplayer-current-time');
  if (currentTime) {
    player.setCurrentTime(parseFloat(currentTime));
  }
});
