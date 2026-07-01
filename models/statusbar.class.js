class Statusbar extends DrawableObject {
  x;
  y = 0;
  offset = { top: 0, bottom: 0, left: 0, right: 0 };
  IMAGES;
  percentage = 100;

  constructor(images, type) {
    super();
    this.IMAGES = images;
    this.loadImages(this.IMAGES);

    this.getDimensions();
    this.setStatusbarPercentage(type);
  }

  setStatusbarPercentage(type) {
    if (type == "health" || type == "endboss") {
      this.setPercentage(100);
    } else {
      this.setPercentage(0);
    }
  }

  getDimensions() {
    this.width = (200 / 720) * canvas.width;
    this.height = (60 / 480) * canvas.height;
    this.x = (20 / 720) * canvas.width;
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage === 0) return 0;
    return Math.min(Math.ceil(this.percentage / 20), 5);
  }
}
