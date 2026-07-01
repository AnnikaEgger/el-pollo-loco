/**
 * Represents the standard chicken enemy with normal damage and movement behavior.
 * @class ChickenNormal
 */
class ChickenNormal extends Chicken {
  damage = 10;
  IMAGE_DEAD = "./assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

  /**
   * Creates a normal chicken enemy with its animation frames, speed, and starting position.
   * @param {Chicken[]} otherChickens - Existing chicken instances used to avoid overlapping spawn positions.
   */
  constructor(otherChickens) {
    super(
      otherChickens,
      [
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
      ],
      (0.25 + Math.random() * 0.5) * (canvas.width / 720),
      (360 / 480) * canvas.height,
    );
  }

  /**
   * Sets the normal chicken's size and collision offset.
   */
  getDimensions() {
    super.getDimensions();
    this.height = (60 / 480) * canvas.height;
    this.width = (80 / 720) * canvas.width;
    this.offset = this.getNormalChickenOffset();
  }

  /**
   * Returns a random horizontal start position for the chicken.
   * @returns {number} A random x-position within the playable level range.
   */
  getRandomX() {
    return (
      (600 / 720) * canvas.width +
      Math.random() * (canvas.width * 4 - (600 / 720) * canvas.width)
    );
  }

  /**
   * Defines the collision offset for the normal chicken sprite.
   * @returns {{left:number,right:number,top:number,bottom:number}} The offset values.
   */
  getNormalChickenOffset() {
    return {
      left: (5 / 720) * canvas.width,
      right: (5 / 720) * canvas.width,
      top: (5 / 480) * canvas.height,
      bottom: (5 / 480) * canvas.height,
    };
  }

  /**
   * Stops the chicken's movement and switches to its death image.
   */
  killChicken() {
    super.killChicken();
    this.loadImage(this.IMAGE_DEAD);
  }
}
