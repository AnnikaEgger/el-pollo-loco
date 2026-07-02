/**
 * Represents a parallax background object that scrolls with the game world.
 * @class BackgroundObject
 */

class BackgroundObject extends MovableObject {
  y = 0;
  xMultiplier;

  /**
   * Creates a new background object with a specific image and horizontal position multiplier.
   * @param {string} imagePath - The image file to display for the background layer.
   * @param {number} xMultiplier - The multiplier used to position the object across the canvas width.
   */
  constructor(imagePath, xMultiplier) {
    super();
    this.loadImage(imagePath);
    this.xMultiplier = xMultiplier;
    this.getDimensions();
  }

  /**
   * Sets the background object's size and horizontal position based on the canvas dimensions.
   */
  getDimensions() {
    super.getDimensions();
    this.height = canvas.height;
    this.width = canvas.width;
    this.x = this.xMultiplier * (canvas.width - 1);
  }
}
