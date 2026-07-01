/**
 * Base class for chicken enemies, handling shared movement, animation, and death behavior.
 * @class Chicken
 */
class Chicken extends MovableObject {
  killed = false;
  animationInt;
  moveLeftInt;
  damage;
  imgs;

  static dyingSound = new Audio("./assets/audio/chicken/dying.mp3");
  static AUDIOS = [Chicken.dyingSound];

  /**
   * Creates a base chicken enemy and initializes its shared movement and animation state.
   * @param {Chicken[]} otherChickens - Existing chicken instances used for spawn collision avoidance.
   * @param {string[]} imgs - The image paths used for the chicken's animation.
   * @param {number} speed - The horizontal movement speed of the chicken.
   * @param {number} y - The vertical starting position of the chicken.
   */
  constructor(otherChickens, imgs, speed, y) {
    super();
    this.loadImage(imgs[0]);
    this.loadImages(imgs);
    this.imgs = imgs;
    this.getDimensions();
    this.y = y;
    this.setValidXPosition(otherChickens);
    this.speed = speed;
    Chicken.dyingSound.volume = 0.15;
  }

  /**
   * Resizes the chicken and updates its speed to match the current canvas size.
   */
  resize() {
    super.resize();
    this.speed = this.speed * (canvas.width / oldCanvasWidth);
  }

  /**
   * Starts the chicken's movement and animation loops.
   */
  animate() {
    this.moveLeftInt = this.setStoppableInterval(() => {
      if (isPaused || currentGameState !== "playing") return;
      this.moveLeft();
    }, 1000 / 60);

    this.animationInt = this.setStoppableInterval(() => {
      if (isPaused || currentGameState !== "playing") return;
      this.animationTicks++;
      this.playAnimation(this.imgs, 1, 100);
    }, 100);
  }

  /**
   * Stops the chicken's active intervals and marks it as defeated.
   */
  killChicken() {
    clearInterval(this.moveLeftInt);
    clearInterval(this.animationInt);
    this.killed = true;
    Chicken.dyingSound.currentTime = 0;
    Chicken.dyingSound.play().catch(() => {});
  }
}
