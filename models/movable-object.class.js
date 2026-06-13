class MovableObject {
  x = 120;
  y = 280;

  height = 250;
  width = 100;
  speed = 0.15;
  otherDirection = false;

  img;
  imageCache = {};
  currentImgSrc = 0;

  speedY = 0;
  acceleration = 2.5;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 150;
  }

  createImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  createImgs(srcsArr) {
    srcsArr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  playAnimation(images) {
    let index = this.currentImgSrc % images.length;
    let path = images[index];
    this.img = this.imageCache[path];
    this.currentImgSrc++;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }
}
