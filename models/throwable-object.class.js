class ThrowableObject extends MovableObject {
  //   constant x speed, no acceleration
  speedX = 10;

  width = 60;
  height = 50;

  otherDirection;

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
  hittingSound;

  constructor(x, y, otherDirection, state) {
    super();

    if (state == "on ground") {
      let index = this.getRandomIndex(this.IMAGES_ON_GROUND);

      if (index == 0) {
        this.offset = {
          left: 25,
          right: 15,
          top: 8,
          bottom: 8,
        };
      } else {
        this.offset = {
          left: 20,
          right: 20,
          top: 8,
          bottom: 8,
        };
      }
      this.loadImage(this.IMAGES_ON_GROUND[index]);
    } else if (state == "throw") {
      this.offset = {
        left: 25,
        right: 15,
        top: 8,
        bottom: 8,
      };

      this.loadImage(this.DEFAULT_IMG);
      this.loadImages(this.IMAGES_ROTATING);
      this.loadImages(this.IMAGES_SPLASH);
    }

    this.x = x;
    this.y = y;
    this.otherDirection = otherDirection;
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      if (this.otherDirection) {
        this.x -= this.speedX;
      } else {
        this.x += this.speedX;
      }

      this.animationTicks++;
      this.playAnimation(this.IMAGES_ROTATING, 0.5, 25);
    }, 25);

    this.throwingSound.play();
  }
}
