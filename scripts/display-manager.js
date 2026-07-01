// #region fullscreen
let fullscreen = false;
const fullscreenContainer = document.getElementById("fullscreen");

document.addEventListener("fullscreenchange", handleFullscreenChange);
document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
document.addEventListener("msfullscreenchange", handleFullscreenChange);

/**
 * Updates the fullscreen state and resizes the canvas when the fullscreen mode changes.
 */
function handleFullscreenChange() {
  fullscreen = checkIfFullscreenElement();
  resizeCanvas();
}

/**
 * Resizes all active game objects to match the current canvas dimensions.
 */
function resizeGame() {
  const allObjects = getAllObjects();
  allObjects.forEach((obj) => obj.resize());
}

/**
 * Collects all objects that need resizing when the canvas changes size.
 * @returns {Object[]} The list of objects to resize.
 */
function getAllObjects() {
  return [
    world.level,
    world.character,
    ...world.STATUSBARS,
    ...world.level.enemies,
    ...world.level.backgroundObjects,
    ...world.level.clouds,
    ...world.level.coins,
    ...world.level.throwableObjects,
  ];
}

/**
 * Toggles fullscreen mode for the game container.
 */
function toggleFullscreen() {
  const isCurrentlyFull = checkIfFullscreenElement();

  if (!isCurrentlyFull) {
    openFullscreen(fullscreenContainer);
  } else {
    closeFullscreen(fullscreenContainer);
  }
}

/**
 * Opens fullscreen mode using the browser's fullscreen API or a fallback for iOS.
 */
function openFullscreen() {
  if (fullscreenContainer.requestFullscreen) {
    fullscreenContainer.requestFullscreen();
  } else if (fullscreenContainer.webkitRequestFullscreen) {
    fullscreenContainer.webkitRequestFullscreen();
  } else if (fullscreenContainer.webkitRequestFullScreen) {
    fullscreenContainer.webkitRequestFullScreen();
  } else if (fullscreenContainer.msRequestFullscreen) {
    fullscreenContainer.msRequestFullscreen();
  } else {
    fullscreenContainer.classList.add("ios-fake-fullscreen");
    resizeCanvas();
  }
}

/**
 * Closes fullscreen mode and removes the fake iOS fullscreen fallback if needed.
 */
function closeFullscreen() {
  if (
    fullscreenContainer &&
    fullscreenContainer.classList.contains("ios-fake-fullscreen")
  ) {
    fullscreenContainer.classList.remove("ios-fake-fullscreen");
    resizeCanvas();
    return;
  }
  exitNativeFullscreen();
}

/**
 * Exits fullscreen mode through the native browser API.
 */
function exitNativeFullscreen() {
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

/**
 * Adjusts the canvas size to either fullscreen dimensions or the default game size.
 */
function resizeCanvas() {
  oldCanvasHeight = canvas.height;
  oldCanvasWidth = canvas.width;
  const isFullscreen = checkIfFullscreenElement();

  if (isFullscreen) {
    canvas.width = window.innerWidth || document.documentElement.clientWidth;
    canvas.height = window.innerHeight || document.documentElement.clientHeight;
  } else {
    canvas.width = 720;
    canvas.height = 480;
  }
  if (gameStarted) resizeGame();
}

/**
 * Checks whether the app is currently displayed in fullscreen mode.
 * @returns {boolean} True if fullscreen mode is active.
 */
function checkIfFullscreenElement() {
  const hasFakeFullscreen = fullscreenContainer.classList.contains(
    "ios-fake-fullscreen",
  );

  return !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement ||
    hasFakeFullscreen
  );
}

// #endregion

// #region overlay
const overlayContainer = document.getElementById("overlay-container");
const btnsWrapper = document.getElementById("panel");

/**
 * Renders the home screen overlay and its associated button layout.
 */
function showHomeScreen() {
  overlayContainer.innerHTML = homeScreenHTML();
  btnsWrapper.innerHTML = homeScreenBtnsHTML(getSoundIconSrc());
}

/**
 * Closes an information screen and returns to the appropriate previous view.
 * @param {string} origin - The screen that opened the info view.
 */
function closeInfoScreen(origin) {
  if (origin == "pause menu") openPauseMenu();
  else backToHomeScreen();
}

/**
 * Displays an informational overlay for the requested content.
 * @param {string} content - The identifier of the template to display.
 * @param {string} [origin="home screen"] - The screen that triggered the info view.
 */
function showInfoScreen(content, origin = "home screen") {
  const htmlTemplates = getHTMLTemplates();
  let contentText = content.toLowerCase();
  let innerContent = "";

  if (htmlTemplates[contentText]) {
    innerContent = htmlTemplates[contentText](content, origin);
  }

  overlayContainer.innerHTML = InfoScreenHTML(innerContent);
  btnsWrapper.innerHTML = infoScreenBtnsHTML(getSoundIconSrc());
}

/**
 * Returns the mapping of info screen template names to their rendering functions.
 * @returns {Object<string, Function>} The available info screen template handlers.
 */
function getHTMLTemplates() {
  return {
    "story": storyHTML,
    "legal notice": legalNoticeHTML,
    "privacy policy": privacyPolicyHTML,
    "instructions": instructionsHTML,
  };
}

/**
 * Returns to the home screen and optionally resets the current game session.
 * @param {string} [origin] - The context from which the user is returning home.
 */
function backToHomeScreen(origin) {
  if (origin == "game") {
    clearGame();
    if (!isMuted) bgMusicStart.play();
  }
  showHomeScreen();
}

/**
 * Clears all content from the overlay container.
 */
function clearOverlayContainer() {
  overlayContainer.innerHTML = "";
}

/**
 * Opens the pause overlay with the appropriate button set.
 */
function openPauseMenu() {
  overlayContainer.innerHTML = pauseMenuHTML();
  btnsWrapper.innerHTML = gameScreenBtnsHTML(
    getSoundIconSrc(),
    getPauseIconSrc(),
  );
}

/**
 * Displays the end screen based on whether the player won or lost.
 */
function showEndScreen() {
  overlayContainer.innerHTML = endScreenHTML();
  const endScreenImg = document.getElementById("endscreen-img");
  if (gameLost) showGameOverImg(endScreenImg);
  else showWinImg(endScreenImg);
}

/**
 * Applies the win image styling and source to the end screen.
 * @param {HTMLImageElement} endScreenImg - The image element used by the end screen.
 */
function showWinImg(endScreenImg) {
  endScreenImg.src = "./assets/img/You_won,_you_lost/You_Win_B.png";
  endScreenImg.classList.remove("overlay-img--full");
  endScreenImg.classList.add("overlay-img--win");
}

/**
 * Applies the game over image styling and source to the end screen.
 * @param {HTMLImageElement} endScreenImg - The image element used by the end screen.
 */
function showGameOverImg(endScreenImg) {
  endScreenImg.src =
    "./assets/img/9_intro_outro_screens/game_over/game_over!.png";
  endScreenImg.classList.remove("overlay-img--win");
  endScreenImg.classList.add("overlay-img--full");
}

// #endregion

// #region icons

/**
 * Updates the mute button icon to reflect the current sound state.
 */
function toggleSoundIcon() {
  const muteBtnImg = document.getElementById("mute-btn-img");
  if (isMuted) muteBtnImg.src = "./assets/icons/sound-icon.png";
  else muteBtnImg.src = "./assets/icons/mute-icon.png";
}

/**
 * Returns the correct icon path for the sound toggle button.
 * @returns {string} The image path for the current mute state.
 */
function getSoundIconSrc() {
  if (isMuted) return "./assets/icons/sound-icon.png";
  else return "./assets/icons/mute-icon.png";
}

/**
 * Returns the correct icon path for the pause/play button.
 * @returns {string} The image path for the current pause state.
 */
function getPauseIconSrc() {
  if (isPaused) return "./assets/icons/play-icon.png";
  else return "./assets/icons/pause-icon.png";
}

// #endregion
