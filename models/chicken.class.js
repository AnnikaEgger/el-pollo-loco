class Chicken extends MovableObject {
  killed = false;
  animationInt;
  moveLeftInt;
  damage;

  static dyingSound = new Audio("./assets/audio/chicken/dying.mp3");

  static AUDIOS = [Chicken.dyingSound];

  constructor(imgs, y, height, width, offset, speed) {
    super();
    this.loadImage(imgs[0]);
    this.loadImages(imgs);
    this.y = y;
    this.height = height;
    this.width = width;
    this.offset = offset;
    this.speed = speed;
    this.x = (500 / 720) * canvas.width + Math.random() * (canvas.width * 3);
    this.animate(imgs);
  }

  resize() {
    super.resize();
    this.speed = this.speed * (canvas.width / oldCanvasWidth);
  }

  animate(arr) {
    this.moveLeftInt = this.setStoppableInterval(() => {
      if (this.isPaused) return;
      this.moveLeft();
    }, 1000 / 60);

    this.animationInt = this.setStoppableInterval(() => {
      if (this.isPaused) return;
      this.animationTicks++;
      this.playAnimation(arr, 1, 100);
    }, 100);
  }

  killChicken() {
    clearInterval(this.moveLeftInt);
    clearInterval(this.animationInt);
    this.killed = true;
    Chicken.dyingSound.play();
  }
}
