const canvas = document.getElementById("canvas");
let world;
let keyboard = new Keyboard();
let isMuted;
let oldCanvasHeight;
let oldCanvasWidth;
let isPaused = false;
let currentGameState = "playing";
// "character dying", "endboss dying"

let allObjsWithInt = [];
let gameLost = false;
let gameWon = false;
let gameStarted = false;
let gameEnded = false;
const bgMusicStart = new Audio(
  "./assets/audio/general/background-music-start-screen.mp3",
);
bgMusicStart.volume = 0.2;
bgMusicStart.loop = true;

const btnClickSound = new Audio("./assets/audio/general/wood-button-click.mp3");
btnClickSound.volume = 0.5;

let allAudios = [bgMusicStart, btnClickSound];

const LOADING_SPINNER_IMGS = [
  "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
  "./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
  "./assets/img/6_salsa_bottle/salsa_bottle.png",
];

function showLoadingSpinner() {
  const loadingSpinner = document.getElementById("loading-spinner");
  const loadingSpinnerImg = document.getElementById("loading-spinner-img");
  let index = Math.floor(Math.random() * LOADING_SPINNER_IMGS.length);

  loadingSpinnerImg.src = LOADING_SPINNER_IMGS[index];
  loadingSpinner.classList.remove("display-none");
  loadingSpinner.classList.add("display-flex");
}

function hideLoadingSpinner() {
  const loadingSpinner = document.getElementById("loading-spinner");
  loadingSpinner.classList.remove("display-flex");
  loadingSpinner.classList.add("display-none");
}

function init() {
  lockScreenOrientation();
  getMuteStatusFromLocalStorage();
  applyMuteSetting();

  document.addEventListener(
    "click",
    () => {
      if (!gameStarted) {
        bgMusicStart.play();
      }
    },
    { once: true },
  );

  document.addEventListener("click", (e) => {
    const button = e.target.closest(".wood-btn--click");
    if (button) {
      btnClickSound.currentTime = 0;
      btnClickSound.play();
    }
  });

  showHomeScreen();
}

function startGame() {
  bgMusicStart.pause();

  if (gameStarted) {
    restartGame();
    return;
  }
  gameStarted = true;

  clearOverlayContainer();
  initNewWorld();
  pushAudiosIntoAudiosArr();
  applyMuteSetting();
}

async function initNewWorld() {
  showLoadingSpinner();

  btnsWrapper.innerHTML = gameScreenBtnsHTML(
    getSoundIconSrc(),
    getPauseIconSrc(),
  );

  initLevel();
  world = new World(canvas, keyboard);

  allObjsWithInt = [
    world,
    world.character,
    ...world.level.clouds,
    ...world.level.throwableObjects,
    ...world.level.enemies,
  ];

  let allDrawableObjs = [
    world,
    world.statusbarHealth,
    world.statusbarBottles,
    world.statusbarCoins,
    world.statusbarEndboss,
    world.character,
    ...world.level.enemies,
    ...world.level.clouds,
    ...world.level.backgroundObjects,
    ...world.level.throwableObjects,
    ...world.level.coins,
  ];

  const loadingPromises = allDrawableObjs.map((obj) => obj.waitUntilReady());

  try {
    await Promise.all(loadingPromises);
  } catch (e) {
    console.error(e);
  } finally {
    hideLoadingSpinner();
    allObjsWithInt.forEach((obj) => {
      obj.animate?.();
      obj.run?.();
    });
  }
}

function togglePauseGame() {
  isPaused = !isPaused;

  if (isPaused) {
    pauseGame(allObjsWithInt);
  } else {
    continueGame(allObjsWithInt);
  }
}

function pauseGame() {
  isPaused = true;
  openPauseMenu();
  pauseAudios();
}

function continueGame() {
  isPaused = false;
  clearOverlayContainer();
  if (gameEnded) showEndScreen();
  const pauseBtnImg = document.getElementById("pause-btn-img");
  pauseBtnImg.src = "./assets/icons/pause-icon.png";

  continueAudios();
}

function showEndScreen() {
  overlayContainer.innerHTML = endScreenHTML();
  const endScreenImg = document.getElementById("endscreen-img");
  if (gameLost) {
    endScreenImg.src =
      "./assets/img/9_intro_outro_screens/game_over/game_over!.png";
    endScreenImg.classList.remove("overlay-img--win");
    endScreenImg.classList.add("overlay-img--full");
  } else {
    endScreenImg.src = "./assets/img/You_won,_you_lost/You_Win_B.png";
    endScreenImg.classList.remove("overlay-img--full");
    endScreenImg.classList.add("overlay-img--win");
  }
}

function endGame() {
  gameEnded = true;
  showEndScreen();
  clearAllIntervals();
  pauseAudios();
}

function clearGame() {
  clearAllIntervals();
  allObjsWithInt = [];
  gameLost = false;
  gameWon = false;
  isPaused = false;
  gameEnded = false;
  gameStarted = false;
  currentGameState = "playing";

  pauseAudios();
  resetAudios();

  keyboard.LEFT = false;
  keyboard.RIGHT = false;
  keyboard.UP = false;
  keyboard.DOWN = false;
  keyboard.SPACE = false;
  keyboard.D = false;
}

function restartGame() {
  clearGame();
  clearOverlayContainer();
  level1 = initLevel();
  initNewWorld();
}

function clearAllIntervals() {
  allObjsWithInt.forEach((obj) => {
    obj.intervalIds.forEach(clearInterval);
  });
}

// #region audios

function pushAudiosIntoAudiosArr() {
  allAudios.push(...Character.AUDIOS);
  allAudios.push(...Chicken.AUDIOS);
  allAudios.push(...Endboss.AUDIOS);
  allAudios.push(...ThrowableObject.AUDIOS);
  allAudios.push(...Coin.AUDIOS);
  allAudios.push(...World.AUDIOS);
  allAudios.push(...DrawableObject.AUDIOS);
}

function toggleGameSound() {
  isMuted = !isMuted;
  applyMuteSetting();

  setMuteStatusToLocalStorage();
  toggleSoundIcon();
}

function applyMuteSetting() {
  allAudios.forEach((audio) => {
    audio.muted = isMuted;
  });
}

function muteGame() {
  if (!isMuted) return;
  allAudios.forEach((audio) => {
    audio.muted = true;
  });
}

function pauseAudios() {
  allAudios.forEach((audio) => {
    audio.wasPlaying = !audio.paused;
    if (audio.wasPlaying) audio.pause();
  });
}

function continueAudios() {
  allAudios.forEach((audio) => {
    if (audio.wasPlaying) {
      audio.play();
      audio.wasPlaying = false;
    }
  });
}

function resetAudios() {
  allAudios.forEach((audio) => {
    audio.currentTime = 0;
  });
}

function setMuteStatusToLocalStorage() {
  localStorage.setItem("isMuted", isMuted);
}

function getMuteStatusFromLocalStorage() {
  if (localStorage.getItem("isMuted") !== null) {
    isMuted = JSON.parse(localStorage.getItem("isMuted"));
  } else {
    isMuted = false;
    setMuteStatusToLocalStorage();
  }
}

// #endregion

// #region game control

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    keyboard.LEFT = true;
  } else if (event.code === "ArrowRight") {
    keyboard.RIGHT = true;
  } else if (event.code === "ArrowDown") {
    keyboard.DOWN = true;
  } else if (event.code === "ArrowUp") {
    keyboard.UP = true;
  } else if (event.code === "Space") {
    keyboard.SPACE = true;
  } else if (event.code === "KeyD") {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.code === "ArrowLeft") {
    keyboard.LEFT = false;
  } else if (event.code === "ArrowRight") {
    keyboard.RIGHT = false;
  } else if (event.code === "ArrowDown") {
    keyboard.DOWN = false;
  } else if (event.code === "ArrowUp") {
    keyboard.UP = false;
  } else if (event.code === "Space") {
    keyboard.SPACE = false;
  } else if (event.code === "KeyD") {
    keyboard.D = false;
  }
});

document.getElementById("move-left-btn").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.LEFT = true;
});

document.getElementById("move-left-btn").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.LEFT = false;
});

document
  .getElementById("move-right-btn")
  .addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

document.getElementById("move-right-btn").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.RIGHT = false;
});

document.getElementById("jump-btn").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.SPACE = true;
});

document.getElementById("jump-btn").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.SPACE = false;
});

document.getElementById("throw-btn").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.D = true;
});

document.getElementById("throw-btn").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.D = false;
});

// #endregion

function lockScreenOrientation() {
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock("portrait-primary").catch(() => {});
  }
}
