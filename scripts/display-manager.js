// #region fullscreen
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

  if (gameStarted) resizeGame();
}

// #endregion

// #region overlay
const overlayContainer = document.getElementById("overlay-container");
function showHomeScreen() {
  overlayContainer.innerHTML = homeScreenHTML();
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
    // "settings": settingsHTML,
  };

  let contentText = content.toLowerCase();
  let innerContent;

  if (htmlTemplates[contentText]) {
    innerContent = htmlTemplates[contentText](content, origin);
  }

  overlayContainer.innerHTML = InfoScreenHTML(innerContent);
}

function backToHomeScreen(origin) {
  if (origin == "game") {
    clearGame();
    bgMusicStart.play();
  }

  showHomeScreen();
  document.getElementById("pause-btn").classList.add("display-none");
  document.getElementById("imprint-container").classList.remove("display-none");
  document.getElementById("imprint-container").classList.add("display-flex");
}

function clearOverlayContainer() {
  overlayContainer.innerHTML = "";
}

function openPauseMenu() {
  overlayContainer.innerHTML = pauseMenuHTML();
}

// #endregion

function toggleSoundIcon() {
  const muteBtnImg = document.getElementById("mute-btn-img");
  if (isMuted) muteBtnImg.src = "./icons/sound-icon.png";
  else muteBtnImg.src = "./icons/mute-icon.png";
}
