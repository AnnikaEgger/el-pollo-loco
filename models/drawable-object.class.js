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
    let attempts = 0;
    const maxAttempts = 100;
    this.x = this.getRandomX();

    while (
      this.checkCollisionWithExisting(existingObjects) &&
      attempts < maxAttempts
    ) {
      this.x = this.getRandomX();
      attempts++;
    }
  }

  checkCollisionWithExisting(existingObjects) {
    return existingObjects.some((obj) => this.hasSameX(obj));
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

  // async waitUntilReady() {
  //   const promises = [];

  //   promises.push(
  //     new Promise((resolve) => {
  //       if (this.img.complete) return resolve();
  //       this.img.onload = () => resolve();
  //       this.img.onerror = () => resolve();
  //     }),
  //   );

  //   const staticAudios = this.constructor.AUDIOS;
  //   if (Array.isArray(staticAudios)) {
  //     staticAudios.forEach((audio) => {
  //       promises.push(
  //         new Promise((resolve) => {
  //           const isMobile = /Mobi|Android|iPhone|iPad/i.test(
  //             navigator.userAgent,
  //           );

  //           if (audio.readyState >= 2 || isMobile) {
  //             return resolve();
  //           }

  //           const handleReady = () => {
  //             cleanup();
  //             resolve();
  //           };

  //           const handleError = () => {
  //             cleanup();
  //             resolve();
  //           };

  //           const cleanup = () => {
  //             audio.removeEventListener("canplay", handleReady);
  //             audio.removeEventListener("error", handleError);
  //           };

  //           audio.addEventListener("canplay", handleReady);
  //           audio.addEventListener("error", handleError);

  //           setTimeout(handleReady, 3000);
  //         }),
  //       );
  //     });
  //   }

  //   return Promise.all(promises);
  // }
  async waitUntilReady() {
    const imagePromise = this.waitForImageReady();
    const audioPromises = this.waitForAllAudios();
    await Promise.all([imagePromise, ...audioPromises]);
  }

  waitForImageReady() {
    return new Promise((resolve) => {
      if (this.img.complete) return resolve();
      this.img.onload = () => resolve();
      this.img.onerror = () => resolve();
    });
  }

  waitForAllAudios() {
    const staticAudios = this.constructor.AUDIOS;
    if (!Array.isArray(staticAudios)) {
      return [];
    }
    return staticAudios.map((audio) => this.waitForAudioReady(audio));
  }

  waitForAudioReady(audio) {
    return new Promise((resolve) => {
      if (audio.readyState >= 2 || this.isMobileDevice()) return resolve();

      const timer = setTimeout(this.handleReady, 3000);
      this.handleReady(timer, audio);

      audio.addEventListener("canplay", this.handleReady);
      audio.addEventListener("error", this.handleReady);
    });
  }

  handleReady(timer, audio) {
    clearTimeout(timer);
    audio.removeEventListener("canplay", this.handleReady);
    audio.removeEventListener("error", this.handleReady);
    resolve();
  }

  isMobileDevice() {
    return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
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
