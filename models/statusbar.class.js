class Statusbar extends DrawableObject {
  x = 20;
  y = 0;

  offset = { top: 0, bottom: 0, left: 0, right: 0 };
  IMAGES;

  percentage = 100;

  constructor(images, type) {
    super();
    this.IMAGES = images;
    this.loadImages(this.IMAGES);

    this.getDimensions();

    if (type == "health" || type == "endboss") {
      this.setPercentage(100);
    } else {
      this.setPercentage(0);
    }
  }

  resize() {
    this.getDimensions();
  }

  getDimensions() {
    this.width = (200 / 720) * canvas.width;
    this.height = (60 / 480) * canvas.height;
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage > 80) {
      return 5;
    } else if (this.percentage > 60) {
      return 4;
    } else if (this.percentage > 40) {
      return 3;
    } else if (this.percentage > 20) {
      return 2;
    } else if (this.percentage > 0) {
      return 1;
    } else if (this.percentage === 0) {
      return 0;
    }
  }
}
