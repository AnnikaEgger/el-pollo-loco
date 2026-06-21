let world;
let keyboard = new Keyboard();
let isMuted = false;

function init() {
  resetAudios();
  updateGlobalVariables();
  level = createLevel1();
  world = new World(canvas, keyboard, level);
  pushAudiosIntoAudiosArr();
}

function updateGlobalVariables() {
  MAX_Y = (65 / 480) * canvas.height;
  BOTTLE_Y = (370 / 480) * canvas.height;
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

const allAudios = [];

function pushAudiosIntoAudiosArr(audio) {
  allAudios.push(...world.character.AUDIOS);
  world.level.enemies.forEach((enemy) => {
    allAudios.push(...enemy.AUDIOS);
  });
  world.level.throwableObjects.forEach((to) => {
    allAudios.push(...to.AUDIOS);
  });
  world.level.coins.forEach((coin) => {
    allAudios.push(...coin.AUDIOS);
  });
  allAudios.push(...world.endboss.AUDIOS);
  allAudios.push(...world.AUDIOS);
}

function toggleGameSound() {
  isMuted = !isMuted;

  allAudios.forEach((audio) => {
    audio.muted = isMuted;
  });
}

function resetAudios() {
  // isMuted = false;
  // toggleGameSound();
  // toggleGameSound();
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

function toggleFullscreen() {
  element = document.getElementById("fullscreen");
  openFullscreen(element);
}

function resizeCanvas() {
  if (document.fullscreenElement) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  } else {
    canvas.width = 720;
    canvas.height = 480;
  }

  init();
}

document.addEventListener("fullscreenchange", resizeCanvas);
document.addEventListener("webkitfullscreenchange", resizeCanvas);
document.addEventListener("msfullscreenchange", resizeCanvas);
