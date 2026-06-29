// #region fullscreen
let fullscreen = false;

document.addEventListener("fullscreenchange", resizeCanvas);
document.addEventListener("webkitfullscreenchange", resizeCanvas);
document.addEventListener("msfullscreenchange", resizeCanvas);

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

function toggleFullscreen() {
  element = document.getElementById("fullscreen");
  fullscreen = !fullscreen;

  if (fullscreen) {
    openFullscreen(element);
  } else {
    closeFullscreen(element);
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

  if (gameStarted) resizeGame();
}

function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else {
    element.classList.add("ios-fake-fullscreen");
  }
}

function closeFullscreen(element) {
  if (element && element.classList.contains("ios-fake-fullscreen")) {
    element.classList.remove("ios-fake-fullscreen");
    return;
  }

  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.webkitExitFullScreen) {
    document.webkitExitFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function resizeCanvas() {
  oldCanvasHeight = canvas.height;
  oldCanvasWidth = canvas.width;

  const isFullscreen = !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  );

  if (isFullscreen) {
    canvas.width = window.innerWidth || document.documentElement.clientWidth;
    canvas.height = window.innerHeight || document.documentElement.clientHeight;
  } else {
    canvas.width = 720;
    canvas.height = 480;
  }

  if (gameStarted) resizeGame();
}

// #endregion

// #region overlay
const overlayContainer = document.getElementById("overlay-container");
const btnsWrapper = document.getElementById("panel");

function showHomeScreen() {
  overlayContainer.innerHTML = homeScreenHTML();
  btnsWrapper.innerHTML = homeScreenBtnsHTML(getSoundIconSrc());
}

function closeInfoScreen(origin) {
  if (origin == "pause menu") openPauseMenu();
  else backToHomeScreen();
}

function showInfoScreen(content, origin = "home screen") {
  const htmlTemplates = {
    "story": storyHTML,
    "legal notice": legalNoticeHTML,
    "privacy policy": privacyPolicyHTML,
    "instructions": instructionsHTML,
  };

  let contentText = content.toLowerCase();
  let innerContent;

  if (htmlTemplates[contentText]) {
    innerContent = htmlTemplates[contentText](content, origin);
  }

  overlayContainer.innerHTML = InfoScreenHTML(innerContent);
  btnsWrapper.innerHTML = infoScreenBtnsHTML(getSoundIconSrc());
}

function backToHomeScreen(origin) {
  if (origin == "game") {
    clearGame();
    if (!isMuted) bgMusicStart.play();
  }

  showHomeScreen();
}

function clearOverlayContainer() {
  overlayContainer.innerHTML = "";
}

function openPauseMenu() {
  overlayContainer.innerHTML = pauseMenuHTML();
  btnsWrapper.innerHTML = gameScreenBtnsHTML(
    getSoundIconSrc(),
    getPauseIconSrc(),
  );
}

// #endregion

function toggleSoundIcon() {
  const muteBtnImg = document.getElementById("mute-btn-img");
  if (isMuted) muteBtnImg.src = "./assets/icons/sound-icon.png";
  else muteBtnImg.src = "./assets/icons/mute-icon.png";
}

function getSoundIconSrc() {
  if (isMuted) return "./assets/icons/sound-icon.png";
  else return "./assets/icons/mute-icon.png";
}

function getPauseIconSrc() {
  if (isPaused) return "./assets/icons/play-icon.png";
  else return "./assets/icons/pause-icon.png";
}
