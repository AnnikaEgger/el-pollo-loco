class Cloud extends MovableObject {
  y = 0;

  IMAGES = [
    "../img/5_background/layers/4_clouds/1.png",
    "../img/5_background/layers/4_clouds/2.png",
  ];

  constructor(index, x) {
    super();
    this.loadImage(this.IMAGES[index]);

    this.x = x + Math.random() * ((500 / 720) * canvas.width);
    this.width = canvas.width;
    this.height = (250 / 480) * canvas.height;
    this.animate();
  }

  animate() {
    setInterval(() => this.moveLeft(), 1000 / 60);
  }
}
