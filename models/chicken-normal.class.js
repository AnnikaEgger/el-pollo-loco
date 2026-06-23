class ChickenNormal extends Chicken {
  damage = 10;
  IMAGE_DEAD = "../img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

  constructor() {
    super(
      [
        "../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
      ],
      (360 / 480) * canvas.height,
      (60 / 480) * canvas.height,
      (80 / 720) * canvas.width,
      {
        left: (5 / 720) * canvas.width,
        right: (5 / 720) * canvas.width,
        top: (5 / 480) * canvas.height,
        bottom: (5 / 480) * canvas.height,
      },
      (0.25 + Math.random() * 0.5) * (canvas.width / 720),
    );
  }

  resize() {
    super.resize();
    this.y = (360 / 480) * canvas.height;
    this.height = (60 / 480) * canvas.height;
    this.width = (80 / 720) * canvas.width;
    this.offset = {
      left: (5 / 720) * canvas.width,
      right: (5 / 720) * canvas.width,
      top: (5 / 480) * canvas.height,
      bottom: (5 / 480) * canvas.height,
    };
    this.speed = this.speed * (canvas.width / 720);
  }

  killChicken() {
    super.killChicken();
    this.loadImage(this.IMAGE_DEAD);
  }
}
