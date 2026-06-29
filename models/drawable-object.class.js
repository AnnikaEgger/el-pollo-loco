class DrawableObject {
  x = 120;
  y = 280;
  height = 250;
  width = 100;
  finishedLoading = false;

  img;
  imageCache = {};
  currentImg = 0;

  static errorSound = new Audio("./assets/audio/bottle/error.mp3");

  static AUDIOS = [DrawableObject.errorSound];

  constructor() {
    if (!this.offset) {
      this.offset = { top: 0, bottom: 0, left: 0, right: 0 };
    }
  }

  setValidXPosition(existingObjects) {
    this.x = this.getRandomX();
    while (existingObjects.some((obj) => this.hasSameX(obj))) {
      this.x = this.getRandomX();
    }
  }

  hasSameX(obj) {
    return (
      this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
      this.x + this.offset.left < obj.x + obj.width - obj.offset.right
    );
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

  async waitUntilReady() {
    const promises = [];

    promises.push(
      new Promise((resolve) => {
        if (this.img.complete) return resolve();
        this.img.onload = () => resolve();
        this.img.onerror = () => resolve();
      }),
    );

    const staticAudios = this.constructor.AUDIOS;
    if (Array.isArray(staticAudios)) {
      staticAudios.forEach((audio) => {
        promises.push(
          new Promise((resolve) => {
            const isMobile = /Mobi|Android|iPhone|iPad/i.test(
              navigator.userAgent,
            );

            if (audio.readyState >= 2 || isMobile) {
              return resolve();
            }

            const handleReady = () => {
              cleanup();
              resolve();
            };

            const handleError = () => {
              cleanup();
              resolve();
            };

            const cleanup = () => {
              audio.removeEventListener("canplay", handleReady);
              audio.removeEventListener("error", handleError);
            };

            audio.addEventListener("canplay", handleReady);
            audio.addEventListener("error", handleError);

            setTimeout(handleReady, 3000);
          }),
        );
      });
    }

    return Promise.all(promises);
  }

  getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  resize() {
    this.getDimensions();

    if (
      this instanceof BackgroundObject ||
      (this instanceof ThrowableObject && this.state === "on ground") ||
      this instanceof Statusbar
    )
      return;
    this.x = (this.x / oldCanvasWidth) * canvas.width;
    this.y = (this.y / oldCanvasHeight) * canvas.height;
  }
}
