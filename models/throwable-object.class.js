class ThrowableObject extends MovableObject {
  speedX;
  state;
  throwInt;
  splashInt;
  splashFinished = false;
  damage = 10;
  otherDirection = false;
  bottomY;
  index;
  character;
  throwableObjects;

  DEFAULT_IMG = "./assets/img/6_salsa_bottle/salsa_bottle.png";

  IMAGES_ON_GROUND = [
    "./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "./assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  IMAGES_ROTATING = [
    "./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  static throwingSound = new Audio("./assets/audio/bottle/throwing.mp3");
  static collectingSound = new Audio("./assets/audio/bottle/collecting.mp3");
  static shatteringSound = new Audio("./assets/audio/bottle/shattering.mp3");

  static {
    this.throwingSound.volume = 0.25;
    this.collectingSound.volume = 0.5;
    this.shatteringSound.volume = 0.3;
  }

  static AUDIOS = [
    ThrowableObject.throwingSound,
    ThrowableObject.collectingSound,
    ThrowableObject.shatteringSound,
  ];

  constructor({
    state = "on ground",
    character = null,
    throwableObjects = [],
  }) {
    super();
    this.state = state;
    this.index = this.getRandomIndex(this.IMAGES_ON_GROUND);

    if (this.state == "on ground") {
      this.setValidXPosition(throwableObjects);

      this.loadImgOnGround();
      this.otherDirection = false;
    } else {
      this.character = character;
      this.otherDirection = character.otherDirection;
      this.loadImgsForThrow();
      this.getDimensionsForThrow();
    }

    this.getDimensions();
  }

  getRandomX() {
    return (
      Math.random() * (canvas.width * 5 - (250 / 720) * canvas.width) +
      (250 / 720) * canvas.width
    );
  }

  getDimensions() {
    super.getDimensions();

    this.width = (60 / 720) * canvas.width;
    this.height = (50 / 480) * canvas.height;
    this.bottomY = (370 / 480) * canvas.height;
    this.speedX = (10 / 720) * canvas.width;

    if (this.state == "on ground") {
      this.getDimensionsOnGround();
    } else {
      this.getOffsetForThrow();
    }
  }

  getDimensionsOnGround() {
    this.y = this.bottomY;
    if (this.index == 0) {
      this.getOffsetForLeftTilt();
    } else {
      this.getOffsetForRightTilt();
    }
  }

  getDimensionsForThrow() {
    if (this.character.otherDirection) {
      this.x = this.character.x;
      this.y = this.character.y + (100 / 480) * canvas.height;
    } else {
      this.x = this.character.x + (100 / 720) * canvas.width;
      this.y = this.character.y + (100 / 480) * canvas.height;
    }
  }

  loadImgOnGround() {
    this.loadImage(this.IMAGES_ON_GROUND[this.index]);
  }

  loadImgsForThrow() {
    this.loadImage(this.DEFAULT_IMG);
    this.loadImages(this.IMAGES_ROTATING);
    this.loadImages(this.IMAGES_SPLASH);
  }

  getOffsetForLeftTilt() {
    this.offset = {
      left: (25 / 720) * canvas.width,
      right: (15 / 720) * canvas.width,
      top: (8 / 480) * canvas.height,
      bottom: (8 / 480) * canvas.height,
    };
  }

  getOffsetForRightTilt() {
    this.offset = {
      left: (20 / 720) * canvas.width,
      right: (20 / 720) * canvas.width,
      top: (8 / 480) * canvas.height,
      bottom: (8 / 480) * canvas.height,
    };
  }

  getOffsetForThrow() {
    this.offset = {
      left: (18 / 720) * canvas.width,
      right: (18 / 720) * canvas.width,
      top: (15 / 480) * canvas.height,
      bottom: (15 / 480) * canvas.height,
    };
  }

  throw() {
    this.speedY = (25 / 480) * canvas.height;
    this.applyGravity();
    this.throwInt = this.setStoppableInterval(() => {
      if (isPaused) return;
      this.throwIntoRightDirection();
      this.animationTicks++;
      this.playAnimation(this.IMAGES_ROTATING, 0.5, 25);
    }, 25);
    if (!isMuted) ThrowableObject.throwingSound.play().catch(() => {});
  }

  throwIntoRightDirection() {
    if (this.otherDirection) {
      this.x -= this.speedX;
    } else {
      this.x += this.speedX;
    }
  }

  playSplashAnimation() {
    clearInterval(this.throwInt);
    if (!isMuted) ThrowableObject.shatteringSound.play().catch(() => {});

    this.splashInt = this.setStoppableInterval(() => {
      if (isPaused) return;
      this.animationTicks++;
      let animationIsFinished = this.playAnimation(this.IMAGES_SPLASH, 1, 25);

      if (animationIsFinished) {
        this.splashFinished = true;
        clearInterval(this.splashInt);
      }
    }, 25);
  }
}
