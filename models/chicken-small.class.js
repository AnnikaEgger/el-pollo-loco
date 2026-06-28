class ChickenSmall extends Chicken {
  damage = 5;
  IMAGE_DEAD = "./assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png";

  constructor() {
    super(
      [
        "./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "./assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "./assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
      ],
      (370 / 480) * canvas.height,
      (50 / 480) * canvas.height,
      (70 / 720) * canvas.width,
      {
        left: (9 / 720) * canvas.width,
        right: (7 / 720) * canvas.width,
        top: (5 / 480) * canvas.height,
        bottom: (6 / 480) * canvas.height,
      },
      (0.25 + Math.random() * 0.5) * (canvas.width / 720),
    );
  }

  getDimensions() {
    super.getDimensions();

    this.height = (50 / 480) * canvas.height;
    this.width = (70 / 720) * canvas.width;
    this.offset = {
      left: (9 / 720) * canvas.width,
      right: (7 / 720) * canvas.width,
      top: (5 / 480) * canvas.height,
      bottom: (6 / 480) * canvas.height,
    };
  }

  killChicken() {
    super.killChicken();
    this.loadImage(this.IMAGE_DEAD);
  }
}
