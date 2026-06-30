class BackgroundObject extends MovableObject {
  y = 0;
  xMultiplier;

  constructor(imagePath, xMultiplier) {
    super();
    this.loadImage(imagePath);
    this.xMultiplier = xMultiplier;
    this.getDimensions();
  }

  getDimensions() {
    super.getDimensions();
    this.height = canvas.height;
    this.width = canvas.width;
    this.x = this.xMultiplier * canvas.width;
  }
}
