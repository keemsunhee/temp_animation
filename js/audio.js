// TODO audioObj 세팅 [S]
const audioObj = [
  {
    element: document.querySelector('.audio-box1'),
    audio: new Audio('https://minfo.lotteshopping.com/docentAudio/240411/yoon.mp3'),
    isPaused: true,
  },
  {
    element: document.querySelector('.audio-box2'),
    audio: new Audio('https://minfo.lotteshopping.com/docentAudio/240411/joe.mp3'),
    isPaused: true,
  },
];
// // TODO audioObj 세팅 [E]

const audioPlay = (audio, trackInput, isPaused, playBtn, pauseBtn) => {
  audioObj.forEach((el) => {
    const playBtn = el.element.querySelector('.playBtn');
    const pauseBtn = el.element.querySelector('.pauseBtn');

    audioPause(el.audio, el.isPaused, playBtn, pauseBtn);
  });

  audio.play();
  trackInput.disabled = false;
  isPaused = false;
  playChk(audio, playBtn, pauseBtn);
};

const audioPause = (audio, isPaused, playBtn, pauseBtn) => {
  audio.pause();
  isPaused = true;
  playChk(audio, playBtn, pauseBtn);
};

const playChk = (audio, playBtn, pauseBtn) => {
  if (!audio.paused) {
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
  } else {
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
  }
};

const timeUpdate = (audio, audioCurrent, audioTotal, trackInput, playBtn, pauseBtn, isPaused) => {
  const total = Math.floor(audio.duration);
  const totalMin = parseInt((total % 3600) / 60);
  const totalSec = String(total % 60);
  let current = Math.floor(audio.currentTime);
  let currentMin = parseInt((current % 3600) / 60);
  let currentSec = String(current % 60);

  audioCurrent.innerHTML = `${currentMin} : ${currentSec.padStart(2, '0')}`;
  audioTotal.innerHTML = `${totalMin} : ${totalSec.padStart(2, '0')}`;

  let progress = (audio.currentTime / audio.duration) * 100;
  trackInput.style.background = `linear-gradient(to right, #ffab8e ${progress}%, rgba(136, 136, 136, 0.2) ${progress}%)`;

  playChk(audio, playBtn, pauseBtn);

  if (total === current) isPaused = true;
};

audioObj.forEach((item) => {
  const audio = item.audio;
  const audioBox = item.element;
  const trackInput = audioBox.querySelector('input');
  const audioCurrent = audioBox.querySelector('.audio-current');
  const audioTotal = audioBox.querySelector('.audio-total');
  const playBtn = audioBox.querySelector('.playBtn');
  const pauseBtn = audioBox.querySelector('.pauseBtn');
  let isPaused = item.isPaused;

  // 화면 이동 시, 오디오 일시 정지
  window.top.document.addEventListener('visibilitychange', () => {
    if (window.top.visibilityState !== 'visible') {
      audio.pause();
      isPaused = true;
      playChk(audio, playBtn, pauseBtn);
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    trackInput.max = audio.duration;
    timeUpdate(audio, audioCurrent, audioTotal, trackInput, playBtn, pauseBtn, isPaused);
  });

  audio.ontimeupdate = () => {
    trackInput.value = audio.currentTime;
    timeUpdate(audio, audioCurrent, audioTotal, trackInput, playBtn, pauseBtn, isPaused);
  };

  playBtn.addEventListener('click', () =>
    audioPlay(audio, trackInput, isPaused, playBtn, pauseBtn)
  );

  pauseBtn.addEventListener('click', () => audioPause(audio, isPaused, playBtn, pauseBtn));

  trackInput.addEventListener('input', () => {
    audio.currentTime = trackInput.value;
    timeUpdate(audio, audioCurrent, audioTotal, trackInput, playBtn, pauseBtn, isPaused);
  });

  trackInput.addEventListener('mousedown', () => {
    audio.pause();
  });

  trackInput.addEventListener('mouseup', () => {
    if (isPaused === false) audio.play();
  });

  trackInput.addEventListener('touchstart', () => {
    audio.pause();
  });

  trackInput.addEventListener('touchend', () => {
    if (isPaused === false) audio.play();
  });
});
