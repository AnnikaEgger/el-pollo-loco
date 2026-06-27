const canvas = document.getElementById("canvas");
let world;
let keyboard = new Keyboard();
let isMuted = false;
let oldCanvasHeight;
let oldCanvasWidth;
isPaused = false;
let allObjsWithInt = [];
let gameLost = false;
let gameWon = false;
let gameStarted = false;

function init() {
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
    const button = e.target.closest(".wood-sign");
    if (button) {
      btnClickSound.currentTime = 0;
      btnClickSound.play();
    }
  });

  showHomeScreen();
}

function startGame() {
  gameStarted = true;
  document.getElementById("imprint-container").classList.remove("display-flex");
  document.getElementById("imprint-container").classList.add("display-none");
  document.getElementById("pause-btn").classList.remove("display-none");

  clearOverlayContainer();

  bgMusicStart.pause();

  initNewWorld();
  pushAudiosIntoAudiosArr();
}

function initNewWorld() {
  initLevel();
  world = new World(canvas, keyboard);

  allObjsWithInt = [
    world,
    world.character,
    ...world.level.enemies,
    ...world.level.clouds,
    ...world.level.throwableObjects,
  ];
}

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

function togglePauseGame() {
  isPaused = !isPaused;
  console.log(isPaused);

  if (isPaused) {
    pauseGame(allObjsWithInt);
  } else {
    continueGame(allObjsWithInt);
  }
}

function pauseGame() {
  const pauseBtnImg = document.getElementById("pause-btn-img");
  pauseBtnImg.src = "./icons/play-icon.png";

  openPauseMenu();

  pauseAudios();
  allObjsWithInt.forEach((obj) => {
    obj.isPaused = true;
  });
}

function continueGame() {
  clearOverlayContainer();
  const pauseBtnImg = document.getElementById("pause-btn-img");
  pauseBtnImg.src = "./icons/pause-icon.png";

  continueAudios();
  allObjsWithInt.forEach((obj) => {
    obj.isPaused = false;
  });
}

function endGame() {
  overlayContainer.innerHTML = endScreenHTML();
  const gameOverImg = document.getElementById("game-over-img");
  const youWinImg = document.getElementById("you-win-img");

  clearAllIntervals();
  pauseAudios();

  if (gameLost) {
    youWinImg.classList.add("display-none");
    gameOverImg.classList.remove("display-none");
  } else if (gameWon) {
    gameOverImg.classList.add("display-none");
    youWinImg.classList.remove("display-none");
  }
}

function clearGame() {
  clearAllIntervals();
  allObjsWithInt = [];
  gameLost = false;
  gameWon = false;
  isPaused = false;

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
  isPaused = false;
  continueGame();
  clearGame();
  level1 = initLevel();
  initNewWorld();
}

function clearAllIntervals() {
  allObjsWithInt.forEach((obj) => {
    obj.intervalIds.forEach(clearInterval);
  });
}

// #region audios
const bgMusicStart = new Audio("./audio/background-music-start-screen.mp3");
const btnClickSound = new Audio("./audio/wood-button-click.mp3");
bgMusicStart.loop = true;
let allAudios = [bgMusicStart, btnClickSound];

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

  allAudios.forEach((audio) => {
    audio.muted = isMuted;
  });

  toggleSoundIcon();
}

function muteGame() {
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

// #endregion
