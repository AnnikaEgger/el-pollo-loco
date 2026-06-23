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

  DEFAULT_IMG = "../img/6_salsa_bottle/salsa_bottle.png";

  IMAGES_ON_GROUND = [
    "../img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "../img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  IMAGES_ROTATING = [
    "../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  throwingSound = new Audio("../audio/bottle/throwing.mp3");
  collectingSound = new Audio("../audio/bottle/collecting.mp3");
  shatteringSound = new Audio("../audio/bottle/shattering.mp3");

  // constructor(x, y, otherDirection, state) {
  constructor(state = "on ground", otherDirection = false, x, y) {
    super();
    this.state = state;
    this.otherDirection = otherDirection;
    this.index = this.getRandomIndex(this.IMAGES_ON_GROUND);

    this.getDimensions(x, y);

    this.AUDIOS = [
      ...this.AUDIOS,
      this.throwingSound,
      this.collectingSound,
      this.shatteringSound,
    ];

    if (this.state == "on ground") this.loadImgOnGround();
    else this.loadImgsForThrow();
  }

  getDimensions(x, y) {
    this.width = (60 / 720) * canvas.width;
    this.height = (50 / 480) * canvas.height;
    this.bottomY = (370 / 480) * canvas.height;
    this.speedX = (10 / 720) * canvas.width;

    if (this.state == "on ground") {
      this.getDimensionsOnGround();
    } else {
      this.getDimensionsForThrow(x, y);
    }
  }

  getDimensionsOnGround() {
    this.x =
      Math.random() * (canvas.width * 3 - (400 / 720) * canvas.width) +
      (400 / 720) * canvas.width;
    this.y = this.bottomY;
    if (this.index == 0) {
      this.getOffsetForLeftTilt();
    } else {
      this.getOffsetForRightTilt();
    }
  }

  getDimensionsForThrow(x, y) {
    this.x = x;
    this.y = y;
    this.getOffsetForThrow();
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
    this.throwInt = setInterval(() => {
      this.throwIntoRightDirection();
      this.animationTicks++;
      this.playAnimation(this.IMAGES_ROTATING, 0.5, 25);
    }, 25);
    if (!isMuted) this.throwingSound.play();
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
    if (!isMuted) this.shatteringSound.play();
    this.splashInt = setInterval(() => {
      this.animationTicks++;
      let animationIsFinished = this.playAnimation(this.IMAGES_SPLASH, 1, 25);

      if (animationIsFinished) {
        this.splashFinished = true;
        clearInterval(this.splashInt);
      }
    }, 25);
  }
}
