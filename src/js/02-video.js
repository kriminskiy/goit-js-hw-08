import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const VIDEO_KEY = 'videoplayer-current-time';

const onPlay = function (data) {
  const time = JSON.stringify(data.seconds);
  localStorage.setItem(VIDEO_KEY, time);
  console.log('played the video!', time);
};
player.on('timeupdate', throttle(onPlay, 1000));

const saveTime = localStorage.getItem(VIDEO_KEY);

player
  .setCurrentTime(saveTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;
      default:
        // some other error occurred
        break;
    }
  });

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
