class Character extends MovableObject {
  height = 280;
  width = 140;
  y = 150 - 100;
  imgSrc = "../img/2_character_pepe/2_walk/W-21.png";
  world;
  speed = 15;

  walkingSound;

  IMAGES_WALKING = [
    "../img/2_character_pepe/2_walk/W-21.png",
    "../img/2_character_pepe/2_walk/W-22.png",
    "../img/2_character_pepe/2_walk/W-23.png",
    "../img/2_character_pepe/2_walk/W-24.png",
    "../img/2_character_pepe/2_walk/W-25.png",
    "../img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "../img/2_character_pepe/3_jump/J-31.png",
    "../img/2_character_pepe/3_jump/J-32.png",
    "../img/2_character_pepe/3_jump/J-33.png",
    "../img/2_character_pepe/3_jump/J-34.png",
    "../img/2_character_pepe/3_jump/J-35.png",
    "../img/2_character_pepe/3_jump/J-36.png",
    "../img/2_character_pepe/3_jump/J-37.png",
    "../img/2_character_pepe/3_jump/J-38.png",
    "../img/2_character_pepe/3_jump/J-39.png",
  ];

  constructor() {
    super().createImg(this.imgSrc);
    this.createImgs(this.IMAGES_WALKING);
    this.createImgs(this.IMAGES_JUMPING);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
      }
      if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
        this.moveRight();
        this.otherDirection = false;

        // this.walkingSound.play();
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }

      this.world.cameraX = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
        this.applyGravity();
      } else {
        if (this.world.keyboard.LEFT || this.world.keyboard.RIGHT) {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 100);
  }

  jump() {
    this.speedY = 30;
  }
}
