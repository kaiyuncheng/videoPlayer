const video = document.querySelector('#video');

const progress = document.querySelector('#progress');
const timestamp = document.querySelector('#timestamp');

const play = document.querySelector('#play');
const stop = document.querySelector('#stop');
const forward = document.querySelector('#forward');
const backward = document.querySelector('#backward');
const volumeBtn = document.querySelector('#volume');
const speed = document.querySelector('.speed');
const ranges = document.querySelectorAll('.range');


function toggleVideoStatus() {
  video.paused ? video.play() : video.pause();
}

function updatePlayIcon() {
  let icon = !video.paused ? 'pause' : 'play';
  play.querySelector('i').classList = `fa fa-${icon} fa-2x`;
}

function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10){
    mins = `0${String(mins)}`
  }

  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = `0${String(secs)}`;
  }
  timestamp.innerHTML = `${mins}:${secs}`
}

function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

function moveVideo() {
  video.currentTime += parseFloat(this.dataset.time);
}

function setRange() {
  video[this.name] = this.value;
  
  if (this.name === `playbackRate`) {
    speed.innerHTML = `${this.value}x`;
  } else {
    if (video.volume === 0) {
      volumeBtn.querySelector('i').classList = `fa fa-volume-off fa-2x`;
    }else{
      volumeBtn.querySelector('i').classList = `fa fa-volume-up fa-2x`;
    }
  };
}

function muteVolume() {
  let icon = 'volume-up';
  if (video.volume === 0){
    ranges[0].value = 0.5;
  }else{
    ranges[0].value = 0;
    icon = 'volume-off';
  };

  video.volume = ranges[0].value;
  volumeBtn.querySelector('i').classList = `fa fa-${icon} fa-2x`;

}


video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
forward.addEventListener('click', moveVideo);
backward.addEventListener('click', moveVideo);
volumeBtn.addEventListener('click', muteVolume);

progress.addEventListener('change', setVideoProgress);

ranges.forEach(range => range.addEventListener('change', setRange));





