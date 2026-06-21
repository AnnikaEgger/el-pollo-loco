class Cloud extends MovableObject {
  y = 0;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    // super().loadImage("img/5_background/layers/4_clouds/2.png");
    // super().loadImage("img/5_background/layers/4_clouds/full.png");
    this.x = Math.random() * 500;
    this.width = canvas.width;
    this.height = (250 / 480) * canvas.height;
    this.animate();
  }

  animate() {
    setInterval(() => this.moveLeft(), 1000 / 60);
  }
}
