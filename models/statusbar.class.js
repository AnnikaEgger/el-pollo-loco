/**
 * Base class for all in-game status bars with percentage-based visual states.
 * @class Statusbar
 */
class Statusbar extends DrawableObject {
  x;
  y = 0;
  offset = { top: 0, bottom: 0, left: 0, right: 0 };
  IMAGES;
  percentage = 100;

  /**
   * Creates a status bar, loads its visual images, and sets its initial value.
   * @param {string[]} images - The sprite images for the different percentage states.
   * @param {string} type - The kind of status bar, such as health, coins, or bottles.
   */
  constructor(images, type) {
    super();
    this.IMAGES = images;
    this.loadImages(this.IMAGES);

    this.getDimensions();
    this.setStatusbarPercentage(type);
  }

  /**
   * Sets the initial percentage for the bar depending on its purpose.
   * @param {string} type - The type of status bar to initialize.
   */
  setStatusbarPercentage(type) {
    if (type == "health" || type == "endboss") {
      this.setPercentage(100);
    } else {
      this.setPercentage(0);
    }
  }

  /**
   * Sets the dimensions of the bar based on the current canvas size.
   */
  getDimensions() {
    this.width = (200 / 720) * canvas.width;
    this.height = (60 / 480) * canvas.height;
    this.x = (20 / 720) * canvas.width;
  }

  /**
   * Updates the displayed percentage and switches to the matching image state.
   * @param {number} percentage - The new percentage value for the bar.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the image index that matches the current percentage.
   * @returns {number} The zero-based index of the best matching status bar image.
   */
  resolveImageIndex() {
    if (this.percentage === 0) return 0;
    return Math.min(Math.ceil(this.percentage / 20), 5);
  }
}
