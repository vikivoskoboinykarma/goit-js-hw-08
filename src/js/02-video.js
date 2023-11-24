import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = new Player('vimeo-player');

// Отримання збереженого часу відтворення з локального сховища
const savedTime = localStorage.getItem('videoplayer-current-time');

// Встановлення часу відтворення, якщо він є
if (savedTime) {
  vimeoPlayer.setCurrentTime(parseFloat(savedTime)).then(() => {
    // Відтворення почнеться з збереженої позиції
  }).catch((error) => {
    console.error('Error setting current time:', error);
  });
}

// Виклик функції при оновленні часу відтворення
vimeoPlayer.on('timeupdate', (event) => {
    throttle(() => handleTimeUpdate(event), 1000, { trailing: false });
  });

// Функція обробки подій timeupdate
function handleTimeUpdate(event) {
  const currentTime = event.seconds;

  // Збереження часу в локальне сховище
  localStorage.setItem('videoplayer-current-time', currentTime);
}
