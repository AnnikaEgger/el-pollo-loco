class Character extends MovableObject {
  imgSrc = "./assets/img/2_character_pepe/1_idle/idle/I-1.png";
  world;
  speed;
  idleStartTime;
  deadAnimationProgress = 0;
  animationInt;
  bottomY;
  alreadyDead = false;
  energy = 10;

  static walkingSound = new Audio("./assets/audio/character/walking.wav");
  static snoringSound = new Audio("./assets/audio/character/snoring.wav");
  static hurtingSound = new Audio("./assets/audio/character/hurting.mp3");
  static dyingSound = new Audio("./assets/audio/character/dying.mp3");
  static jumpingSound = new Audio("./assets/audio/character/jumping.wav");

  static {
    this.walkingSound.volume = 0.15;
    this.snoringSound.volume = 0.5;
    this.hurtingSound.volume = 0.5;
    this.dyingSound.volume = 0.1;
    this.jumpingSound.volume = 0.6;
  }

  static AUDIOS = [
    Character.walkingSound,
    Character.snoringSound,
    Character.hurtingSound,
    Character.dyingSound,
    Character.jumpingSound,
  ];

  IMAGES_IDLE = [
    "./assets/img/2_character_pepe/1_idle/idle/I-1.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-2.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-3.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-4.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-5.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-6.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-7.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-8.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-9.png",
    "./assets/img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_SLEEPING = [
    "./assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "./assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    "./assets/img/2_character_pepe/2_walk/W-22.png",
    "./assets/img/2_character_pepe/2_walk/W-21.png",
    "./assets/img/2_character_pepe/2_walk/W-23.png",
    "./assets/img/2_character_pepe/2_walk/W-24.png",
    "./assets/img/2_character_pepe/2_walk/W-25.png",
    "./assets/img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "./assets/img/2_character_pepe/3_jump/J-31.png",
    "./assets/img/2_character_pepe/3_jump/J-32.png",
    "./assets/img/2_character_pepe/3_jump/J-33.png",
    "./assets/img/2_character_pepe/3_jump/J-34.png",
    "./assets/img/2_character_pepe/3_jump/J-35.png",
    "./assets/img/2_character_pepe/3_jump/J-36.png",
    "./assets/img/2_character_pepe/3_jump/J-37.png",
    "./assets/img/2_character_pepe/3_jump/J-38.png",
    "./assets/img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = [
    "./assets/img/2_character_pepe/4_hurt/H-41.png",
    "./assets/img/2_character_pepe/4_hurt/H-42.png",
    "./assets/img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "./assets/img/2_character_pepe/5_dead/D-51.png",
    "./assets/img/2_character_pepe/5_dead/D-52.png",
    "./assets/img/2_character_pepe/5_dead/D-53.png",
    "./assets/img/2_character_pepe/5_dead/D-54.png",
    "./assets/img/2_character_pepe/5_dead/D-55.png",
    "./assets/img/2_character_pepe/5_dead/D-56.png",
    "./assets/img/2_character_pepe/5_dead/D-57.png",
  ];

  constructor() {
    super();
    this.loadAllImages();
    this.getDimensions();
    this.y = this.bottomY;

    this.addAudioEventListeners();
    this.idleStartTime = null;

    this.applyGravity();
    // this.animate();
  }

  async loadAllImages() {
    await this.loadImage(this.imgSrc);
    await this.loadImages(this.IMAGES_IDLE);
    await this.loadImages(this.IMAGES_SLEEPING);
    await this.loadImages(this.IMAGES_WALKING);
    await this.loadImages(this.IMAGES_JUMPING);
    await this.loadImages(this.IMAGES_HURT);
    await this.loadImages(this.IMAGES_DEAD);
  }

  getDimensions() {
    super.getDimensions();

    this.height = (280 / 480) * canvas.height;
    this.width = (140 / 720) * canvas.width;
    this.bottomY = (150 / 480) * canvas.height;

    this.offset = {
      left: (35 / 720) * canvas.width,
      right: (40 / 720) * canvas.width,
      top: (120 / 480) * canvas.height,
      bottom: (15 / 480) * canvas.height,
    };

    this.speed = (7.5 / 720) * canvas.width;
  }

  addAudioEventListeners() {
    Character.AUDIOS.forEach((audio) => {
      audio.addEventListener("play", () => {
        Character.AUDIOS.forEach((otherAudio) => {
          if (otherAudio !== audio) {
            otherAudio.pause();
            otherAudio.currentTime = 0;
          }
        });
      });
    });
  }

  animate() {
    this.setStoppableInterval(() => {
      this.moveCharacter();
    }, 1000 / 60);

    this.animationInt = this.setStoppableInterval(() => {
      if (this.isPaused) return;

      this.animationTicks++;

      this.playAnimations();
    }, 50);
  }

  playAnimations() {
    if (this.isDead()) return;

    // if (this.isDead()) this.handleCharacterDeath();

    if (this.checkIdleDuration() >= 15) {
      this.playSleepAnimationAndSound();
    } else if (this.checkIdleDuration() > 0) {
      this.playAnimation(this.IMAGES_IDLE, 2);
    } else if (this.isHurt()) {
      this.playHurtAnimationAndSound(Character, this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING, 1);
    } else {
      this.handleWalking();
    }
  }

  playSleepAnimationAndSound() {
    this.playAnimation(this.IMAGES_SLEEPING, 2);
    Character.snoringSound.play();
  }

  playWalkingAnimationAndSound() {
    this.playAnimation(this.IMAGES_WALKING, 1);
    Character.walkingSound.play();
  }

  handleWalking() {
    if (this.isWalking()) {
      this.playWalkingAnimationAndSound();
    } else {
      Character.walkingSound.pause();
    }
  }

  moveCharacter() {
    if (this.isDead() || this.isPaused) return;
    if (this.world.keyboard.LEFT && this.x > 0) this.moveLeft();
    if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX)
      this.moveRight();
    if (this.world.keyboard.SPACE && !this.isAboveGround()) this.jump();
    this.world.cameraX = -this.x + (100 / 720) * canvas.width;
  }

  jump() {
    this.speedY = (30 / 480) * canvas.height;
    Character.jumpingSound.play();
  }

  isIdle() {
    let isIdle =
      !this.isDead() &&
      !this.isHurt() &&
      !this.isAboveGround() &&
      this.noKeyPressed();

    return isIdle;
  }

  checkIdleDuration() {
    if (!this.isIdle()) {
      this.idleStartTime = null;
      return 0;
    }

    if (this.idleStartTime === null) {
      this.idleStartTime = Date.now();
    }

    const elapsedSeconds = (Date.now() - this.idleStartTime) / 1000;
    return elapsedSeconds;
  }

  noKeyPressed() {
    return (
      !this.world.keyboard.LEFT &&
      !this.world.keyboard.RIGHT &&
      !this.world.keyboard.UP &&
      !this.world.keyboard.DOWN &&
      !this.world.keyboard.SPACE &&
      !this.world.keyboard.D
    );
  }

  isNearEndboss() {
    return this.x >= canvas.width * 3 + (200 / 720) * canvas.width;
  }

  moveLeft() {
    super.moveLeft();

    this.otherDirection = true;
  }

  moveRight() {
    super.moveRight();

    this.otherDirection = false;
  }

  hit(damage, statusbar) {
    super.hit(damage, statusbar);

    if (this.isDead() && !this.alreadyDead) {
      this.handleCharacterDeath();
    }
  }

  handleCharacterDeath() {
    this.alreadyDead = true;

    clearInterval(this.animationInt);

    this.playDeathAnimationAndSound(
      Character,
      this.IMAGES_DEAD,
      this.animationInt,

      2,
    );
  }

  playDeathAnimationAndSound(objClass, imgs, int, speed) {
    gameLost = true;
    this.world.isPaused = true;

    pauseAudios();

    objClass.dyingSound.play();

    let deathInt = this.setStoppableInterval(() => {
      this.animationTicks++;

      this.playAnimation(imgs, speed);

      if (this.currentImg == imgs.length - 1) {
        this.playAnimation(imgs, speed);

        // setTimeout(() => {

        clearInterval(deathInt);

        // }, 100);

        objClass.dyingSound.onended = () => {
          // setTimeout(() => {

          this.world.handleGameOver();

          // }, 100);
        };
      }
    }, 50);
  }

  // playDeathAnimationAndSound(objClass, imgs, int, speed) {

  //   objClass.dyingSound.play();

  //   this.playAnimation(imgs, speed);

  //   if (this.currentImg == imgs.length) {

  //     clearInterval(this.animationInt);

  //   }

  // }
}
