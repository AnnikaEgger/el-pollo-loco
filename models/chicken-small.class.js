/**
 * Represents the smaller chicken enemy with reduced damage and a distinct death animation.
 * @class ChickenSmall
 */
class ChickenSmall extends Chicken {
  damage = 5;
  IMAGE_DEAD = "./assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png";

  /**
   * Creates a small chicken enemy with its animation frames, speed, and starting position.
   * @param {Chicken[]} otherChickens - Existing chicken instances used to avoid overlapping spawn positions.
   */
  constructor(otherChickens) {
    super(
      otherChickens,
      [
        "./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "./assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "./assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
      ],
      (1.25 + Math.random() * 0.5) * (canvas.width / 720),
      (370 / 480) * canvas.height,
    );
  }

  /**
   * Sets the small chicken's size and collision offset.
   */
  getDimensions() {
    super.getDimensions();
    this.height = (50 / 480) * canvas.height;
    this.width = (70 / 720) * canvas.width;
    this.offset = this.getSmallChickenOffset();
  }

  /**
   * Returns a random horizontal start position for the small chicken.
   * @returns {number} A random x-position within the spawn range.
   */
  getRandomX() {
    return canvas.width * 1 + Math.random() * (canvas.width * 4 - 500);
  }

  /**
   * Defines the collision offset for the small chicken sprite.
   * @returns {{left:number,right:number,top:number,bottom:number}} The offset values.
   */
  getSmallChickenOffset() {
    return {
      left: (9 / 720) * canvas.width,
      right: (7 / 720) * canvas.width,
      top: (5 / 480) * canvas.height,
      bottom: (6 / 480) * canvas.height,
    };
  }

  /**
   * Stops the small chicken's movement and switches to its death image.
   */
  killChicken() {
    super.killChicken();
    this.loadImage(this.IMAGE_DEAD);
  }
}
