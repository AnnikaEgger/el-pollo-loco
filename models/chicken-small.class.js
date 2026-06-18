class ChickenSmall extends Chicken {
  damage = 5;
  IMAGE_DEAD = "../img/3_enemies_chicken/chicken_small/2_dead/dead.png";

  constructor() {
    super(
      [
        "../img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "../img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "../img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
      ],
      370,
      50,
      70,
      {
        left: 9,
        right: 7,
        top: 5,
        bottom: 6,
      },

      0.25 + Math.random() * 0.5,
    );
  }

  killChicken() {
    super.killChicken();
    this.loadImage(this.IMAGE_DEAD);
  }
}
