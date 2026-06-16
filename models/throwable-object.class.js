class ThrowableObject extends MovableObject {
  //   constant x speed, no acceleration
  speedX = 10;

  width = 60;
  height = 50;

  offset = {
    left: 25,
    right: 25,
    top: 8,
    bottom: 8,
  };

  throwingSound = new Audio("../audio/bottle/throwing.mp3");
  collectingSound = new Audio("../audio/bottle/collecting.mp3");
  hittingSound;

  constructor(x, y) {
    super().loadImage("../img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += this.speedX;
    }, 25);
    this.throwingSound.play();
  }
}
