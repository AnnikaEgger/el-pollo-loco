class BackgroundObject extends MovableObject {
  y = 0;

  constructor(imagePath, x, canvas) {
    super().loadImage(imagePath);
    this.height = canvas.height;
    this.width = canvas.width;
    this.x = x;
  }
}
