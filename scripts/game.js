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

/**
 * Initializes the game setup, including orientation settings, audio preferences, and the initial screen.
 */
function init() {
  lockScreenOrientation();
  getMuteStatusFromLocalStorage();
  applyMuteSetting();
  addListenerForBgMusic();
  addListenerForWoodBtns();
  showHomeScreen();
}

/**
 * Attempts to lock the screen orientation to portrait mode on supported devices.
 */
function lockScreenOrientation() {
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock("portrait-primary").catch(() => {});
  }
}

// #region start game

/**
 * Displays the loading spinner while the game world is being prepared.
 */
function showLoadingSpinner() {
  const loadingSpinner = document.getElementById("loading-spinner");
  const loadingSpinnerImg = document.getElementById("loading-spinner-img");
  let index = Math.floor(Math.random() * LOADING_SPINNER_IMGS.length);

  loadingSpinnerImg.src = LOADING_SPINNER_IMGS[index];
  loadingSpinner.classList.remove("display-none");
  loadingSpinner.classList.add("display-flex");
}

/**
 * Hides the loading spinner after assets and game objects have finished loading.
 */
function hideLoadingSpinner() {
  const loadingSpinner = document.getElementById("loading-spinner");
  loadingSpinner.classList.remove("display-flex");
  loadingSpinner.classList.add("display-none");
}

/**
 * Starts a new game or restarts the current one depending on the current game state.
 */
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

/**
 * Creates the game world and prepares all objects that need to be animated and updated.
 */
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

/**
 * Waits for all assets to load and then starts the game loop for all objects that need intervals.
 * @param {Promise[]} loadingPromises - The promises representing asset loading tasks.
 * @param {Object[]} allObjsWithInt - The objects that require animation or run intervals.
 */
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

/**
 * Collects all game objects that need interval-based updates.
 * @returns {Object[]} The list of objects with interval-driven behavior.
 */
function getAllObjectsWithInt() {
  return [
    world,
    world.character,
    ...world.level.clouds,
    ...world.level.throwableObjects,
    ...world.level.enemies,
  ];
}

/**
 * Collects all drawable game objects that need image loading and rendering.
 * @returns {Object[]} The list of drawable objects in the current world.
 */
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

/**
 * Toggles the pause state of the current game session.
 */
function togglePauseGame() {
  isPaused = !isPaused;

  if (isPaused) {
    pauseGame(allObjsWithInt);
  } else {
    continueGame(allObjsWithInt);
  }
}

/**
 * Pauses the game and opens the pause overlay.
 */
function pauseGame() {
  isPaused = true;
  openPauseMenu();
  pauseAudios();
}

/**
 * Resumes the game and closes the pause overlay if it is active.
 */
function continueGame() {
  isPaused = false;
  clearOverlayContainer();
  if (gameEnded) showEndScreen();
  const pauseBtnImg = document.getElementById("pause-btn-img");
  pauseBtnImg.src = "./assets/icons/pause-icon.png";
  continueAudios();
}

/**
 * Restarts the current game round from a clean state.
 */
function restartGame() {
  clearGame();
  clearOverlayContainer();
  level1 = initLevel();
  initNewWorld();
}

// #endregion

// #region end game

/**
 * Ends the current game session and shows the corresponding end screen.
 */
function endGame() {
  gameEnded = true;
  showEndScreen();
  clearAllIntervals();
  pauseAudios();
}

/**
 * Clears all runtime state, intervals, and audio state for a fresh restart.
 */
function clearGame() {
  clearAllIntervals();
  resetVariables();
  pauseAudios();
  resetAudios();
  resetKeyboard();
}

/**
 * Resets the main gameplay flags and state variables.
 */
function resetVariables() {
  allObjsWithInt = [];
  gameLost = false;
  gameWon = false;
  isPaused = false;
  gameEnded = false;
  currentGameState = "playing";
}

/**
 * Clears all currently pressed keyboard controls.
 */
function resetKeyboard() {
  keyboard.LEFT = false;
  keyboard.RIGHT = false;
  keyboard.UP = false;
  keyboard.DOWN = false;
  keyboard.SPACE = false;
  keyboard.D = false;
}

/**
 * Clears all intervals stored on the active game objects.
 */
function clearAllIntervals() {
  allObjsWithInt.forEach((obj) => {
    obj.intervalIds.forEach(clearInterval);
  });
}

// #endregion

// #region game control

/**
 * Updates the keyboard state when a movement or action key is pressed.
 * @param {KeyboardEvent} event - The keydown event containing the pressed key code.
 */
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

/**
 * Releases the corresponding movement or action key when the key is lifted.
 * @param {KeyboardEvent} event - The keyup event containing the released key code.
 */
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

/**
 * Enables left movement when the left touch button is pressed.
 * @param {TouchEvent} e - The touch event for the left control button.
 */
document.getElementById("move-left-btn").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.LEFT = true;
});

/**
 * Stops left movement when the left touch button is released.
 * @param {TouchEvent} e - The touch event for the left control button.
 */
document.getElementById("move-left-btn").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.LEFT = false;
});

/**
 * Enables right movement when the right touch button is pressed.
 * @param {TouchEvent} e - The touch event for the right control button.
 */
document
  .getElementById("move-right-btn")
  .addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

/**
 * Stops right movement when the right touch button is released.
 * @param {TouchEvent} e - The touch event for the right control button.
 */
document.getElementById("move-right-btn").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.RIGHT = false;
});

/**
 * Enables jumping when the jump touch button is pressed.
 * @param {TouchEvent} e - The touch event for the jump control button.
 */
document.getElementById("jump-btn").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.SPACE = true;
});

/**
 * Stops jumping when the jump touch button is released.
 * @param {TouchEvent} e - The touch event for the jump control button.
 */
document.getElementById("jump-btn").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.SPACE = false;
});

/**
 * Enables throwing when the throw touch button is pressed.
 * @param {TouchEvent} e - The touch event for the throw control button.
 */
document.getElementById("throw-btn").addEventListener("touchstart", (e) => {
  e.preventDefault();
  keyboard.D = true;
});

/**
 * Stops throwing when the throw touch button is released.
 * @param {TouchEvent} e - The touch event for the throw control button.
 */
document.getElementById("throw-btn").addEventListener("touchend", (e) => {
  e.preventDefault();
  keyboard.D = false;
});

// #endregion
