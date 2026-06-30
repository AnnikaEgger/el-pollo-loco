class ChickenNormal extends Chicken {
  damage = 10;
  IMAGE_DEAD = "./assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png";
  IMAGES_WALKING = [
    "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  // constructor(otherChickens) {
  //   super(
  //     otherChickens,
  //     this.IMAGES_WALKING,
  //     (360 / 480) * canvas.height,
  //     (60 / 480) * canvas.height,
  //     (80 / 720) * canvas.width,
  //     getNormalChickenOffset(),
  //     (0.25 + Math.random() * 0.5) * (canvas.width / 720),
  //   );
  // }

  constructor(otherChickens) {
    super(otherChickens, [
      "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
      "./assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
      "./assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ]);
  }

  getDimensions() {
    super.getDimensions();
    this.speed = (0.25 + Math.random() * 0.5) * (canvas.width / 720);
    this.y = (360 / 480) * canvas.height;
    this.height = (60 / 480) * canvas.height;
    this.width = (80 / 720) * canvas.width;
    this.offset = this.getNormalChickenOffset();
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
