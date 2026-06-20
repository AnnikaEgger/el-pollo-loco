class ThrowableObject extends MovableObject {
  speedX = 10;
  width = 60;
  height = 50;
  state;
  throwInt;
  splashInt;
  splashFinished = false;
  damage = 10;
  otherDirection = false;

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

  constructor(x, y, otherDirection, state) {
    super();
    this.state = state;
    this.x = x;
    this.y = y;
    this.otherDirection = otherDirection;

    this.AUDIOS = [
      ...this.AUDIOS,
      this.throwingSound,
      this.collectingSound,
      this.shatteringSound,
    ];

    if (this.state == "on ground") {
      this.createBottleOnGround();
    } else if (this.state == "throw") {
      this.createBottleThrow();
    }
  }

  createBottleOnGround() {
    let index = this.getRandomIndex(this.IMAGES_ON_GROUND);

    if (index == 0) {
      this.getOffsetForLeftTilt();
    } else {
      this.getOffsetForRightTilt();
    }

    this.loadImage(this.IMAGES_ON_GROUND[index]);
  }

  createBottleThrow() {
    this.getOffsetForThrow();
    this.loadImage(this.DEFAULT_IMG);
    this.loadImages(this.IMAGES_ROTATING);
    this.loadImages(this.IMAGES_SPLASH);
  }

  getOffsetForLeftTilt() {
    this.offset = {
      left: 25,
      right: 15,
      top: 8,
      bottom: 8,
    };
  }

  getOffsetForRightTilt() {
    this.offset = {
      left: 20,
      right: 20,
      top: 8,
      bottom: 8,
    };
  }

  getOffsetForThrow() {
    this.offset = {
      left: 18,
      right: 18,
      top: 15,
      bottom: 15,
    };
  }

  throw() {
    this.speedY = 25;
    this.applyGravity();
    this.throwInt = setInterval(() => {
      this.throwIntoRightDirection();
      this.animationTicks++;
      this.playAnimation(this.IMAGES_ROTATING, 0.5, 25);
    }, 25);
    this.throwingSound.play();
  }

  throwIntoRightDirection() {
    if (this.otherDirection) {
      this.x -= this.speedX;
    } else {
      this.x += this.speedX;
    }
  }

  playSplashAnimation() {
    this.shatteringSound.play();
    clearInterval(this.throwInt);
    this.splashInt = setInterval(() => {
      this.animationTicks++;
      let animationIsFinished = this.playAnimation(this.IMAGES_SPLASH, 0.5, 25);
      if (animationIsFinished) {
        this.splashFinished = true;
        clearInterval(this.splashInt);
      }
    }, 25);
  }
}
