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
const bgMusicStart = new Audio("./audio/background-music-start-screen.mp3");
const btnClickSound = new Audio("./audio/wood-button-click.mp3");
bgMusicStart.loop = true;
let allAudios = [bgMusicStart, btnClickSound];

function styleHTMLElements() {}

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
}

function startGame() {
  gameStarted = true;
  const homeScreen = document.getElementById("home-screen");
  const pauseBtn = document.getElementById("pause-btn");
  homeScreen.style.display = "none";
  pauseBtn.classList.remove("display-none");

  bgMusicStart.pause();

  initNewWorld();
  pushAudiosIntoAudiosArr();
}

function initNewWorld() {
  world = new World(canvas, keyboard);

  allObjsWithInt = [
    world,
    world.character,
    ...world.level.enemies,
    ...world.level.clouds,
    ...world.level.throwableObjects,
  ];
}

function resizeGame() {
  const allObjects = [
    world.level,
    world.character,
    ...world.STATUSBARS,
    ...world.level.enemies,
    ...world.level.backgroundObjects,
    ...world.level.clouds,
    ...world.level.coins,
    ...world.level.throwableObjects,
  ];

  allObjects.forEach((obj) => obj.resize());
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

function toggleSoundIcon() {
  const muteBtnImg = document.getElementById("mute-btn-img");
  if (isMuted) muteBtnImg.src = "./icons/sound-icon.png";
  else muteBtnImg.src = "./icons/mute-icon.png";
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

let fullscreen = false;
function toggleFullscreen() {
  element = document.getElementById("fullscreen");
  fullscreen = !fullscreen;

  if (fullscreen) {
    openFullscreen(element);
  } else {
    closeFullscreen();
  }
}

function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function resizeCanvas() {
  oldCanvasHeight = canvas.height;
  oldCanvasWidth = canvas.width;

  if (document.fullscreenElement) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  } else {
    canvas.width = 720;
    canvas.height = 480;
  }

  resizeGame();
}

function togglePauseGame() {
  isPaused = !isPaused;
  console.log(isPaused);

  if (isPaused) {
    pauseGame(allObjsWithInt);
  } else {
    continueGame(allObjsWithInt);
  }
}

function openPauseMenu() {
  const pauseDialog = document.getElementById("pause-dialog");
  pauseDialog.style.display = "flex";
  pauseDialog.showModal();
}

function closePauseMenu() {
  const pauseDialog = document.getElementById("pause-dialog");
  pauseDialog.style.display = "none";
  pauseDialog.close();
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
  const pauseBtnImg = document.getElementById("pause-btn-img");
  pauseBtnImg.src = "./icons/pause-icon.png";

  closePauseMenu();
  continueAudios();
  allObjsWithInt.forEach((obj) => {
    obj.isPaused = false;
  });
}

function endGame() {
  const outroScreen = document.getElementById("outro-screen");
  const gameOverImg = document.getElementById("game-over-img");
  const youWinImg = document.getElementById("you-win-img");

  clearAllIntervals();
  pauseAudios();

  outroScreen.width = canvas.width + "px";
  outroScreen.height = canvas.height + "px";
  outroScreen.style.display = "flex";

  if (gameLost) {
    youWinImg.classList.add("display-none");
    gameOverImg.classList.remove("display-none");
  } else if (gameWon) {
    gameOverImg.classList.add("display-none");
    youWinImg.classList.remove("display-none");
  }
}

function clearGame() {
  const outroScreen = document.getElementById("outro-screen");
  outroScreen.style.display = "none";

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

function closeInfoContainer() {
  document.getElementById("info-container").style.display = "none";
}

function openInfoContainer(content) {
  const infoContainer = document.getElementById("info-container");
  const infoText = document.getElementById("infotext-container");
  const headline = document.getElementById("infotext-headline");

  infoContainer.style.display = "flex";

  const htmlTemplates = {
    "story": storyHTML,
    "legal notice": legalNoticeHTML,
    "privacy policy": privacyPolicyHTML,
    "instructions": instructionsHTML,
    // "settings": settingsHTML,
  };

  headline.innerText = content;
  infoText.innerHTML = "";
  if (htmlTemplates[content.toLowerCase()])
    infoText.innerHTML = htmlTemplates[content.toLowerCase()]();
}

function backToHomeScreen() {
  closePauseMenu();
  closeInfoContainer();

  clearGame();
  document.getElementById("home-screen").style.display = "unset";
  document.getElementById("pause-btn").classList.add("display-none");
  bgMusicStart.play();
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

document.addEventListener("fullscreenchange", resizeCanvas);
document.addEventListener("webkitfullscreenchange", resizeCanvas);
document.addEventListener("msfullscreenchange", resizeCanvas);
