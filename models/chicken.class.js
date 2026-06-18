class Chicken extends MovableObject {
  killed = false;
  animationInt;
  moveLeftInt;

  constructor(imgs, y, height, width, offset, speed) {
    super();
    this.loadImage(imgs[0]);
    this.loadImages(imgs);
    this.y = y;
    this.height = height;
    this.width = width;
    this.offset = offset;
    this.speed = speed;
    this.x = 500 + Math.random() * (720 * 3);
    this.animate(imgs);
  }

  animate(arr) {
    this.moveLeftInt = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    this.animationInt = setInterval(() => {
      this.animationTicks++;
      this.playAnimation(arr, 1, 100);
    }, 100);
  }

  killChicken() {
    clearInterval(this.moveLeftInt);
    clearInterval(this.animationInt);

    this.killed = true;
  }
}
