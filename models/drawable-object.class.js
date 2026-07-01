/**
 * Base class for all visible game objects with position, size, image loading, and drawing logic.
 * @class DrawableObject
 */
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

  /**
   * Creates a drawable game object with default position and collision values.
   */
  constructor() {
    if (!this.offset) {
      this.offset = { top: 0, bottom: 0, left: 0, right: 0 };
    }
  }

  /**
   * Places the object at a valid x-position that does not overlap with existing objects.
   * @param {DrawableObject[]} existingObjects - Existing objects to check against.
   */
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

  /**
   * Checks whether the object overlaps horizontally with any existing object.
   * @param {DrawableObject[]} existingObjects - Existing objects to inspect.
   * @returns {boolean} True if a collision is detected.
   */
  checkCollisionWithExisting(existingObjects) {
    return existingObjects.some((obj) => this.hasSameX(obj));
  }

  /**
   * Checks whether the object overlaps horizontally with another object.
   * @param {DrawableObject} obj - The object to compare against.
   * @returns {boolean} True if the objects overlap along the x-axis.
   */
  hasSameX(obj) {
    return (
      this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
      this.x + this.offset.left < obj.x + obj.width - obj.offset.right
    );
  }

  /**
   * Returns the audio objects associated with this drawable object.
   * @returns {HTMLAudioElement[]} The audio elements used by the object.
   */
  initAudios() {
    return this.AUDIOS;
  }

  /**
   * Draws the object image on the provided canvas context.
   * @param {CanvasRenderingContext2D} ctx - The rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a debug rectangle around the object's bounding box.
   * @param {CanvasRenderingContext2D} ctx - The rendering context.
   */
  drawFrame(ctx) {
    if (!(this instanceof BackgroundObject) && !(this instanceof Cloud)) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
   * Draws a debug rectangle around the object's collision offset box.
   * @param {CanvasRenderingContext2D} ctx - The rendering context.
   */
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

  /**
   * Loads a single image for the object.
   * @param {string} path - The image path to load.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images into the cache for later animation use.
   * @param {string[]} srcsArr - The image paths to cache.
   */
  loadImages(srcsArr) {
    srcsArr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Detects whether the current environment is a mobile device.
   * @returns {boolean} True if the current user agent indicates a mobile device.
   */
  isMobileDevice() {
    const userAgentCheck = /Mobi|Android|iPhone|iPad/i.test(
      navigator.userAgent,
    );
    const touchCheck = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    return userAgentCheck || touchCheck;
  }

  /**
   * Waits for the object's image and audio assets to be ready.
   * @returns {Promise<void>} Resolves once the assets have loaded.
   */
  async waitUntilReady() {
    const imagePromise = this.waitForImageReady();
    const audioPromises = this.waitForAllAudios();
    await Promise.all([imagePromise, ...audioPromises]);
  }

  /**
   * Waits for the main object image to finish loading.
   * @returns {Promise<void>} Resolves when the image is loaded or fails.
   */
  waitForImageReady() {
    return new Promise((resolve) => {
      if (!this.img || this.img.complete) return resolve();
      this.img.onload = () => resolve();
      this.img.onerror = () => resolve();
    });
  }

  /**
   * Creates promises for all audio assets associated with this object.
   * @returns {Promise[]} A list of audio readiness promises.
   */
  waitForAllAudios() {
    const staticAudios = this.constructor.AUDIOS;
    if (!Array.isArray(staticAudios)) return [];
    return staticAudios.map((audio) => this.waitForAudioReady(audio));
  }

  /**
   * Returns a promise that resolves when the audio element is ready to play.
   * Automatically falls back after a 3-second safety timeout to prevent endless loading.
   * Instantly resolves if the audio is already loaded or if the user is on a mobile device.
   *
   * @param {HTMLAudioElement} audio - The HTML5 audio element to check.
   * @returns {Promise<void>} A promise that resolves when the audio is ready or the timeout is reached.
   */
  waitForAudioReady(audio) {
    return new Promise((resolve) => {
      if (!audio || audio.readyState >= 4 || this.isMobileDevice())
        return resolve();

      const cleanUpAndResolve = () => {
        clearTimeout(timer);
        audio.removeEventListener("canplay", cleanUpAndResolve);
        audio.removeEventListener("error", cleanUpAndResolve);
        resolve();
      };
      const timer = setTimeout(cleanUpAndResolve, 2000);
      audio.addEventListener("canplay", cleanUpAndResolve);
      audio.addEventListener("error", cleanUpAndResolve);
    });
  }

  /**
   * Returns a random index for an array.
   * @param {Array} array - The array to choose from.
   * @returns {number} A random index within the array bounds.
   */
  getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  /**
   * Resizes the object to the current canvas dimensions while preserving its relative position.
   */
  resize() {
    this.getDimensions();
    if (this instanceof BackgroundObject || this instanceof Statusbar) return;
    this.x = (this.x / oldCanvasWidth) * canvas.width;

    if (this instanceof ThrowableObject && this.state === "on ground") return;
    this.y = (this.y / oldCanvasHeight) * canvas.height;
  }
}
