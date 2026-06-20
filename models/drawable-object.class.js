class DrawableObject {
  x = 120;
  y = 280;
  height = 250;
  width = 100;

  img;
  imageCache = {};
  currentImg = 0;

  errorSound = new Audio("../audio/bottle/error.mp3");

  AUDIOS;

  constructor() {
    if (!this.offset) {
      this.offset = { top: 0, bottom: 0, left: 0, right: 0 };
    }

    this.AUDIOS = [this.errorSound];
  }

  initAudios() {
    return this.AUDIOS;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (!(this instanceof BackgroundObject) && !(this instanceof Cloud)) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  drawOffsetFrame(ctx) {
    if (!(this instanceof BackgroundObject) && !(this instanceof Cloud)) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.right - this.offset.left,
        this.height - this.offset.bottom - this.offset.top,
      );
      ctx.stroke();
    }
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(srcsArr) {
    srcsArr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }
}
