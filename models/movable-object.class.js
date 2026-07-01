/**
 * Base class for objects that can move, animate, collide, and take damage.
 * @class MovableObject
 */
class MovableObject extends DrawableObject {
  speed;
  otherDirection = false;
  energy = 100;
  lastHit = 0;
  speedY = 0;
  acceleration;
  animationTicks = 0;
  lastImages;
  isInvincible = false;
  intervalIds = [];
  canMove = true;

  /**
   * Registers an interval and stores its ID so it can be cleared later.
   * @param {Function} fn - The callback to execute on each tick.
   * @param {number} time - The interval delay in milliseconds.
   * @returns {number} The created interval ID.
   */
  setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    this.intervalIds.push(id);
    return id;
  }

  /**
   * Initializes the object and prepares its movement physics.
   */
  constructor() {
    super();
    const parentAudios = super.initAudios();
    this.getDimensions();
  }

  /**
   * Calculates the gravity acceleration for the object based on the canvas height.
   */
  getDimensions() {
    this.acceleration = (2.5 / 480) * canvas.height;
  }

  /**
   * Applies gravity repeatedly while the object remains in the game world.
   */
  applyGravity() {
    this.setStoppableInterval(() => {
      if (isPaused) return;
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.speedY = 0;
        this.y = this.bottomY;
      }
    }, 1000 / 25);
  }

  /**
   * Checks whether the object is currently above the ground.
   * @returns {boolean} True if the object still floats above the ground plane.
   */
  isAboveGround() {
    return this.y < this.bottomY;
  }

  /**
   * Plays the next animation frame when the animation timing allows it.
   * @param {string[]} images - The image paths for the animation sequence.
   * @param {number} [speed=1] - The animation speed multiplier.
   * @param {number} [interval=50] - The frame interval in milliseconds.
   * @returns {boolean|undefined} True when a throwable animation has finished, otherwise undefined.
   */
  playAnimation(images, speed = 1, interval = 50) {
    this.resetCurrentImgWhenNewAnimation(images);

    if (this.nextFrameIsReady(speed, interval)) {
      const animationHasFinished = this.setNextAnimationFrame(images);
      if (this instanceof ThrowableObject) {
        if (animationHasFinished) return true;
        else return false;
      }
    }
  }

  /**
   * Resets the animation frame index when switching to a new sprite sequence.
   * @param {string[]} images - The new animation image list.
   */
  resetCurrentImgWhenNewAnimation(images) {
    if (this.lastImages !== images) {
      this.currentImg = 0;
      this.lastImages = images;
    }
  }

  /**
   * Checks whether the next animation frame is due to be shown.
   * @param {number} speed - The animation speed multiplier.
   * @param {number} interval - The interval between frames in milliseconds.
   * @returns {boolean} True when the animation should advance.
   */
  nextFrameIsReady(speed, interval) {
    const calcSpeed = speed * (100 / interval);
    return this.animationTicks % calcSpeed === 0;
  }

  /**
   * Advances the animation to the next sprite image.
   * @param {string[]} images - The animation image list.
   * @returns {boolean} True when the animation has reached its last frame.
   */
  setNextAnimationFrame(images) {
    let path = images[this.currentImg];
    this.img = this.imageCache[path];

    if (this.currentImg >= images.length - 1) {
      this.currentImg = 0;
      return true;
    } else {
      this.currentImg++;
      return false;
    }
  }

  /**
   * Moves the object left when the game is actively playing.
   */
  moveLeft() {
    if (isPaused || currentGameState !== "playing" || !this.canMove) return;
    this.x -= this.speed;
  }

  /**
   * Moves the object right when the game is actively playing.
   */
  moveRight() {
    if (isPaused || currentGameState !== "playing" || !this.canMove) return;
    this.x += this.speed;
  }

  /**
   * Checks whether two objects overlap based on their collision rectangles.
   * @param {MovableObject} mo - The other object to compare against.
   * @returns {boolean} True when the objects collide.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Applies damage to the object and updates its invincibility state.
   * @param {number} damage - The amount of damage to apply.
   * @param {Statusbar} statusbar - The status bar that should reflect the updated energy.
   */
  hit(damage, statusbar) {
    if (this.isInvincible) return;
    this.energy -= damage;
    if (this.energy < 0) this.energy = 0;

    this.setInvincibility();

    statusbar.setPercentage(this.energy);
    this.lastHit = Date.now();
  }

  /**
   * Makes the object temporarily invincible after being hit.
   */
  setInvincibility() {
    this.isInvincible = true;
    setTimeout(() => {
      this.isInvincible = false;
    }, 500);
  }

  /**
   * Checks whether the object is currently walking based on keyboard input.
   * @returns {boolean} True when either movement key is pressed.
   */
  isWalking() {
    return this.world.keyboard.LEFT || this.world.keyboard.RIGHT;
  }

  /**
   * Checks whether the object has no remaining energy.
   * @returns {boolean} True if the object is dead.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Checks whether the object is currently in its hurt state.
   * @returns {boolean} True while the invincibility window after a hit is still active.
   */
  isHurt() {
    let timePassed = Date.now() - this.lastHit;
    timePassed = timePassed / 1000;
    if (timePassed > 0.75) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Plays the hurt animation and the matching hurt sound for the given object class.
   * @param {typeof MovableObject} objClass - The class whose hurt sound should be used.
   * @param {string[]} imgs - The animation frames for the hurt state.
   */
  playHurtAnimationAndSound(objClass, imgs) {
    this.playAnimation(imgs, 1);
    objClass.hurtingSound.play().catch(() => {});
  }
}
