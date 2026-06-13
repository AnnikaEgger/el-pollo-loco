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

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  playAnimation(images) {
    let index = this.currentImgSrc % images.length;
    let path = images[index];
    this.img = this.imageCache[path];
    this.currentImgSrc++;
  }
}
