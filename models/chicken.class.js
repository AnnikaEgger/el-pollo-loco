class Chicken extends MovableObject {
  killed = false;
  animationInt;
  moveLeftInt;
  damage;
  imgs;

  static dyingSound = new Audio("./assets/audio/chicken/dying.mp3");

  static AUDIOS = [Chicken.dyingSound];

  constructor(imgs, y, height, width, offset, speed) {
    super();
    this.loadImage(imgs[0]);
    this.loadImages(imgs);
    this.imgs = imgs;
    this.y = y;
    this.height = height;
    this.width = width;
    this.offset = offset;
    this.speed = speed;
    this.x = (600 / 720) * canvas.width + Math.random() * (canvas.width * 4);
    Chicken.dyingSound.volume = 0.15;
  }

  resize() {
    super.resize();
    this.speed = this.speed * (canvas.width / oldCanvasWidth);
  }

  animate() {
    this.moveLeftInt = this.setStoppableInterval(() => {
      if (this.isPaused) return;
      this.moveLeft();
    }, 1000 / 60);

    this.animationInt = this.setStoppableInterval(() => {
      if (this.isPaused) return;
      this.animationTicks++;
      this.playAnimation(this.imgs, 1, 100);
    }, 100);
  }

  killChicken() {
    clearInterval(this.moveLeftInt);
    clearInterval(this.animationInt);
    this.killed = true;
    Chicken.dyingSound.play();
  }
}
