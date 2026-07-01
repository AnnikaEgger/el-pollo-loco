/**
 * Represents a floating cloud object rendered in the background.
 * @class Cloud
 */
class Cloud extends MovableObject {
  y = 0;

  IMAGES = [
    "./assets/img/5_background/layers/4_clouds/1.png",
    "./assets/img/5_background/layers/4_clouds/2.png",
  ];
  /**
   * Creates a background cloud at a randomized horizontal position.
   * @param {number} index - The index of the cloud image to use.
   * @param {number} xMultiplier - The multiplier used to place the cloud across the level width.
   */
  constructor(index, xMultiplier) {
    super();
    this.loadImage(this.IMAGES[index]);
    this.getDimensions();
    this.x =
      xMultiplier * canvas.width + Math.random() * ((500 / 720) * canvas.width);
  }

  /**
   * Sets the cloud's size based on the current canvas dimensions.
   */
  getDimensions() {
    super.getDimensions();

    this.width = canvas.width;
    this.height = (250 / 480) * canvas.height;
  }

  /**
   * Starts the cloud's movement loop so it drifts left across the screen.
   */
  animate() {
    this.setStoppableInterval(() => this.moveLeft(), 1000 / 60);
  }
}
