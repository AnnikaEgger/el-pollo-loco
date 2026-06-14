class ThrowableObject extends MovableObject {
  //   constant x speed, no acceleration
  speedX = 10;

  width = 60;
  height = 50;

  constructor(x, y) {
    super().loadImage("../img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.throw();
  }
  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += this.speedX;
    }, 25);
  }
}
