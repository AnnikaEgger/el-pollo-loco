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
      360,
      60,
      80,
      {
        left: 5,
        right: 5,
        top: 5,
        bottom: 5,
      },
      0.15 + Math.random() * 0.5,
    );
  }

  killChicken() {
    super.killChicken();
    this.loadImage(this.IMAGE_DEAD);
  }
}
