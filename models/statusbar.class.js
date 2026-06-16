class Statusbar extends DrawableObject {
  width = 200;
  height = 60;
  x = 20;
  y = 0;

  IMAGES;

  percentage = 100;

  constructor(images, type) {
    super();
    this.IMAGES = images;
    this.loadImages(this.IMAGES);

    if (type == "health") {
      this.setPercentage(100);
    } else {
      this.setPercentage(0);
    }
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
