class ChickenNormal extends Chicken {
  damage = 10;
  IMAGE_DEAD = "./assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

  constructor(otherChickens) {
    super(
      otherChickens,
      [
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
      ],
      (0.25 + Math.random() * 0.5) * (canvas.width / 720),
    );
  }

  getDimensions() {
    super.getDimensions();
    this.y = (360 / 480) * canvas.height;
    this.height = (60 / 480) * canvas.height;
    this.width = (80 / 720) * canvas.width;
    this.offset = this.getNormalChickenOffset();
  }

  getRandomX() {
    return (
      (600 / 720) * canvas.width +
      Math.random() * (canvas.width * 4 - (600 / 720) * canvas.width)
    );
  }

  getNormalChickenOffset() {
    return {
      left: (5 / 720) * canvas.width,
      right: (5 / 720) * canvas.width,
      top: (5 / 480) * canvas.height,
      bottom: (5 / 480) * canvas.height,
    };
  }

  killChicken() {
    super.killChicken();
    this.loadImage(this.IMAGE_DEAD);
  }
}
