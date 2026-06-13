class Cloud extends MovableObject {
  y = 0;
  width = 720;
  height = 250;

  constructor() {
    super().createImg("img/5_background/layers/4_clouds/1.png");
    // super().loadImage("img/5_background/layers/4_clouds/2.png");
    // super().loadImage("img/5_background/layers/4_clouds/full.png");
    this.x = Math.random() * 500;
    this.animate();
  }

  animate() {
    this.moveLeft();
  }
}
