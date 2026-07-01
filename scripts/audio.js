/**
 * Starts the background music once the player interacts with the page.
 */
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

/**
 * Plays the button click sound whenever a wooden button is pressed.
 */
function addListenerForWoodBtns() {
  document.addEventListener("click", (e) => {
    const button = e.target.closest(".wood-btn--click");
    if (button) {
      btnClickSound.currentTime = 0;
      btnClickSound.play();
    }
  });
}

/**
 * Registers all relevant game audio objects into the shared audio array.
 */
function pushAudiosIntoAudiosArr() {
  allAudios.push(...Character.AUDIOS);
  allAudios.push(...Chicken.AUDIOS);
  allAudios.push(...Endboss.AUDIOS);
  allAudios.push(...ThrowableObject.AUDIOS);
  allAudios.push(...Coin.AUDIOS);
  allAudios.push(...World.AUDIOS);
  allAudios.push(...DrawableObject.AUDIOS);
}

/**
 * Toggles the global mute state and updates the related UI and storage.
 */
function toggleGameSound() {
  isMuted = !isMuted;
  applyMuteSetting();
  setMuteStatusToLocalStorage();
  toggleSoundIcon();
}

/**
 * Applies the current mute state to every registered audio object.
 */
function applyMuteSetting() {
  allAudios.forEach((audio) => {
    audio.muted = isMuted;
  });
}

/**
 * Forces all audio objects to stay muted when the mute setting is active.
 */
function muteGame() {
  if (!isMuted) return;
  allAudios.forEach((audio) => {
    audio.muted = true;
  });
}

/**
 * Pauses all currently playing audio objects and remembers their playback state.
 */
function pauseAudios() {
  allAudios.forEach((audio) => {
    audio.wasPlaying = !audio.paused;
    if (audio.wasPlaying) audio.pause();
  });
}

/**
 * Resumes any audio objects that were playing before the game was paused.
 */
function continueAudios() {
  allAudios.forEach((audio) => {
    if (audio.wasPlaying) {
      audio.play();
      audio.wasPlaying = false;
    }
  });
}

/**
 * Resets the playback position of all registered audio tracks.
 */
function resetAudios() {
  allAudios.forEach((audio) => {
    audio.currentTime = 0;
  });
}

/**
 * Stores the current mute status in local storage.
 */
function setMuteStatusToLocalStorage() {
  localStorage.setItem("isMuted", isMuted);
}

/**
 * Restores the saved mute preference from local storage.
 */
function getMuteStatusFromLocalStorage() {
  if (localStorage.getItem("isMuted") !== null) {
    isMuted = JSON.parse(localStorage.getItem("isMuted"));
  } else {
    isMuted = false;
    setMuteStatusToLocalStorage();
  }
}
