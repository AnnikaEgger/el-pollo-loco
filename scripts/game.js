const canvas = document.getElementById("canvas");
let world;
let keyboard = new Keyboard();
let isMuted = false;
let oldCanvasHeight;
let oldCanvasWidth;

function init() {
  world = new World(canvas, keyboard);
  pushAudiosIntoAudiosArr();
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

let allAudios = [];

function pushAudiosIntoAudiosArr() {
  allAudios = [];
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

document.addEventListener("fullscreenchange", resizeCanvas);
document.addEventListener("webkitfullscreenchange", resizeCanvas);
document.addEventListener("msfullscreenchange", resizeCanvas);
