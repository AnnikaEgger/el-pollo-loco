class Character extends MovableObject {
  height = 280;
  width = 140;
  y = 150;
  imgSrc = "../img/2_character_pepe/1_idle/idle/I-1.png";
  world;
  speed = 15;
  idleStartTime;
  deadAnimationProgress = 0;
  animationInt;

  offset = {
    left: 35,
    right: 40,
    top: 120,
    bottom: 15,
  };

  walkingSound = new Audio("../audio/character/walking.wav");
  snoringSound = new Audio("../audio/character/snoring.wav");
  hurtingSound = new Audio("../audio/character/hurting.mp3");
  dyingSound = new Audio("../audio/character/dying.mp3");
  jumpingSound = new Audio("../audio/character/jumping.wav");

  IMAGES_IDLE = [
    "../img/2_character_pepe/1_idle/idle/I-1.png",
    "../img/2_character_pepe/1_idle/idle/I-2.png",
    "../img/2_character_pepe/1_idle/idle/I-3.png",
    "../img/2_character_pepe/1_idle/idle/I-4.png",
    "../img/2_character_pepe/1_idle/idle/I-5.png",
    "../img/2_character_pepe/1_idle/idle/I-6.png",
    "../img/2_character_pepe/1_idle/idle/I-7.png",
    "../img/2_character_pepe/1_idle/idle/I-8.png",
    "../img/2_character_pepe/1_idle/idle/I-9.png",
    "../img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_SLEEPING = [
    "../img/2_character_pepe/1_idle/long_idle/I-11.png",
    "../img/2_character_pepe/1_idle/long_idle/I-12.png",
    "../img/2_character_pepe/1_idle/long_idle/I-13.png",
    "../img/2_character_pepe/1_idle/long_idle/I-14.png",
    "../img/2_character_pepe/1_idle/long_idle/I-15.png",
    "../img/2_character_pepe/1_idle/long_idle/I-16.png",
    "../img/2_character_pepe/1_idle/long_idle/I-17.png",
    "../img/2_character_pepe/1_idle/long_idle/I-18.png",
    "../img/2_character_pepe/1_idle/long_idle/I-19.png",
    "../img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

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

  IMAGES_HURT = [
    "../img/2_character_pepe/4_hurt/H-41.png",
    "../img/2_character_pepe/4_hurt/H-42.png",
    "../img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "../img/2_character_pepe/5_dead/D-51.png",
    "../img/2_character_pepe/5_dead/D-52.png",
    "../img/2_character_pepe/5_dead/D-53.png",
    "../img/2_character_pepe/5_dead/D-54.png",
    "../img/2_character_pepe/5_dead/D-55.png",
    "../img/2_character_pepe/5_dead/D-56.png",
    "../img/2_character_pepe/5_dead/D-57.png",
  ];

  constructor() {
    super().loadImage(this.imgSrc);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SLEEPING);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);

    this.AUDIOS = [
      ...this.AUDIOS,
      this.walkingSound,
      this.snoringSound,
      this.hurtingSound,
      this.dyingSound,
      this.jumpingSound,
    ];

    this.addAudioEventListeners();
    this.idleStartTime = null;

    this.applyGravity();
    this.animate();
  }

  addAudioEventListeners() {
    this.AUDIOS.forEach((audio) => {
      audio.addEventListener("play", () => {
        this.AUDIOS.forEach((otherAudio) => {
          if (otherAudio !== audio) {
            otherAudio.pause();
            otherAudio.currentTime = 0;
          }
        });
      });
    });
  }

  animate() {
    setInterval(() => {
      this.moveCharacter();
    }, 1000 / 60);

    this.animationInt = setInterval(() => {
      this.animationTicks++;
      this.playAnimations();
    }, 50);
  }

  playAnimations() {
    if (this.isDead()) {
      this.playDeathAnimationAndSound(this.IMAGES_DEAD, this.animationInt);
    } else if (this.checkIdleDuration() >= 15) {
      this.playSleepAnimationAndSound();
    } else if (this.checkIdleDuration() > 0) {
      this.playAnimation(this.IMAGES_IDLE, 2);
    } else if (this.isHurt()) {
      this.playHurtAnimationAndSound(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING, 1);
    } else {
      this.handleWalking();
    }
  }

  playSleepAnimationAndSound() {
    this.playAnimation(this.IMAGES_SLEEPING, 2);
    this.snoringSound.play();
  }

  playWalkingAnimationAndSound() {
    this.playAnimation(this.IMAGES_WALKING, 1);
    this.walkingSound.play();
  }

  handleWalking() {
    if (this.isWalking()) {
      this.playWalkingAnimationAndSound();
    } else {
      this.walkingSound.pause();
    }
  }

  moveCharacter() {
    if (this.isDead()) return;
    if (this.world.keyboard.LEFT && this.x > 0) this.moveLeft();
    if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX)
      this.moveRight();
    if (this.world.keyboard.SPACE && !this.isAboveGround()) this.jump();
    this.world.cameraX = -this.x + 100;
  }

  jump() {
    this.speedY = 30;
    this.jumpingSound.play();
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
    return this.x >= 720 * 3 + 200;
  }

  moveLeft() {
    super.moveLeft();
    this.otherDirection = true;
  }

  moveRight() {
    super.moveRight();
    this.otherDirection = false;
  }

  hit(damage) {
    super.hit(damage);

    this.isInvincible = true;
    setTimeout(() => {
      this.isInvincible = false;
    }, 1500);

    this.world.statusbarHealth.setPercentage(this.energy);
  }
}
