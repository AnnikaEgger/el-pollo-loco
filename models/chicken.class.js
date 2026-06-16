class Chicken extends MovableObject {
  y = 360;
  height = 60;
  width = 80;

  offset = {
    left: 5,
    right: 5,
    top: 5,
    bottom: 5,
  };

  IMAGES_WALKING_NORMAL = [
    "../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGE_DEAD_NORMAL = "../img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

  IMAGES_WALKING_SMALL = [
    "../img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "../img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "../img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGE_DEAD_SMALL = "../img/3_enemies_chicken/chicken_small/2_dead/dead.png";

  constructor() {
    super().loadImage(this.IMAGES_WALKING_NORMAL[0]);
    this.loadImages(this.IMAGES_WALKING_NORMAL);

    this.x = 500 + Math.random() * (720 * 3);
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.animationTicks++;
      this.playAnimation(this.IMAGES_WALKING_NORMAL, 1);
    }, 100);
  }
}
