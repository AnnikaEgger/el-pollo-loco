const canvas = document.getElementById("canvas");
let world;
let keyboard = new Keyboard();
let isMuted;
let oldCanvasHeight;
let oldCanvasWidth;
let isPaused = false;
let currentGameState = "playing";
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

function init() {
  lockScreenOrientation();
  getMuteStatusFromLocalStorage();
  applyMuteSetting();
  addListenerForBgMusic();
  addListenerForWoodBtns();
  showHomeScreen();
}

function lockScreenOrientation() {
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock("portrait-primary").catch(() => {});
  }
}

// #region start game

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
  allObjsWithInt = getAllObjectsWithInt();
  let allDrawableObjs = getAllDrawableObjects();
  const loadingPromises = allDrawableObjs.map((obj) => obj.waitUntilReady());
  initializeGameStart(loadingPromises, allObjsWithInt);
}

async function initializeGameStart(loadingPromises, allObjsWithInt) {
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

function getAllObjectsWithInt() {
  return [
    world,
    world.character,
    ...world.level.clouds,
    ...world.level.throwableObjects,
    ...world.level.enemies,
  ];
}

function getAllDrawableObjects() {
  return [
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
}

// #endregion

// #region Game Loop & State Control

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

function restartGame() {
  clearGame();
  clearOverlayContainer();
  level1 = initLevel();
  initNewWorld();
}

// #endregion

// #region end game

function endGame() {
  gameEnded = true;
  showEndScreen();
  clearAllIntervals();
  pauseAudios();
}

function clearGame() {
  clearAllIntervals();
  resetVariables();
  pauseAudios();
  resetAudios();
  resetKeyboard();
}

function resetVariables() {
  allObjsWithInt = [];
  gameLost = false;
  gameWon = false;
  isPaused = false;
  gameEnded = false;
  gameStarted = false;
  currentGameState = "playing";
}

function resetKeyboard() {
  keyboard.LEFT = false;
  keyboard.RIGHT = false;
  keyboard.UP = false;
  keyboard.DOWN = false;
  keyboard.SPACE = false;
  keyboard.D = false;
}

function clearAllIntervals() {
  allObjsWithInt.forEach((obj) => {
    obj.intervalIds.forEach(clearInterval);
  });
}

// #endregion

// #region audios
function addListenerForBgMusic() {
  document.addEventListener(
    "click",
    () => {
      if (!gameStarted) {
        bgMusicStart.play();
      }
    },
    { once: true },
  );
}

function addListenerForWoodBtns() {
  document.addEventListener("click", (e) => {
    const button = e.target.closest(".wood-btn--click");
    if (button) {
      btnClickSound.currentTime = 0;
      btnClickSound.play();
    }
  });
}

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
