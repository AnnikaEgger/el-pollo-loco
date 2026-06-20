let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  pushAudiosIntoAudiosArr();
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

let isMuted = false;
function muteGame() {
  isMuted = !isMuted;

  allAudios.forEach((audio) => {
    audio.muted = isMuted;
  });
}
