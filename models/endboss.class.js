class Endboss extends MovableObject {
  speedY;
  hadFirstContact = false;
  world;
  speed;
  movementInterval;
  animationInt;
  animationIndex;
  damage = 15;
  bottomY;
  energy = 100;

  static hurtingSound = new Audio("./assets/audio/endboss/hurting.wav");
  static dyingSound = new Audio("./assets/audio/endboss/dying.mp3");
  static alertSound = new Audio("./assets/audio/endboss/awakening.mp3");
  static risingSound = new Audio("./assets/audio/endboss/riser.mp3");
  static bgMusic = new Audio("./assets/audio/endboss/background-music.mp3");

  static {
    this.bgMusic.volume = 0.25;
    this.bgMusic.loop = true;

    this.hurtingSound.volume = 0.25;
    this.alertSound.volume = 0.15;

    this.risingSound.volume = 0.4;
    this.dyingSound.volume = 0.15;
  }

  static AUDIOS = [
    Endboss.hurtingSound,
    Endboss.dyingSound,
    Endboss.alertSound,
    Endboss.risingSound,
    Endboss.bgMusic,
  ];

  IMAGES_ALERT = [
    "./assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALKING = [
    "./assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "./assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "./assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "./assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACK = [
    "./assets/img/4_enemie_boss_chicken/3_attack/G13.png",
    "./assets/img/4_enemie_boss_chicken/3_attack/G14.png",
    "./assets/img/4_enemie_boss_chicken/3_attack/G15.png",
    "./assets/img/4_enemie_boss_chicken/3_attack/G16.png",
    "./assets/img/4_enemie_boss_chicken/3_attack/G17.png",
    "./assets/img/4_enemie_boss_chicken/3_attack/G18.png",
    "./assets/img/4_enemie_boss_chicken/3_attack/G19.png",
    "./assets/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "./assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "./assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "./assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "./assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super();
    this.loadAllImages();

    this.getDimensions();
    this.x = canvas.width * 5 - 200;
    this.y = this.bottomY;

    this.applyGravity();
  }

  getDimensions() {
    super.getDimensions();

    this.height = (400 / 480) * canvas.height;
    this.width = (250 / 720) * canvas.width;

    this.getOffset();

    this.speed = (5 / 720) * canvas.width;
    this.bottomY = (50 / 480) * canvas.height;
  }

  getOffset() {
    this.offset = {
      left: (30 / 720) * canvas.width,
      right: (35 / 720) * canvas.width,
      top: (90 / 480) * canvas.height,
      bottom: (30 / 480) * canvas.height,
    };
  }

  loadAllImages() {
    this.loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
  }

  animate() {
    this.animationInt = this.setStoppableInterval(() => {
      if (this.isPaused) return;
      if (this.characterEncountersEndboss()) this.triggerEndbossAwakening();
    }, 100);
  }

  characterEncountersEndboss() {
    return this.world.character.isNearEndboss() && !this.hadFirstContact;
  }

  handleEndbossDeath() {
    clearInterval(this.movementInterval);
    gameWon = true;
    this.world.isPaused = true;
    let imgs = this.IMAGES_DEAD;
    pauseAudios();
    Endboss.dyingSound.play();

    let deathInt = this.setStoppableInterval(() => {
      this.animationTicks++;
      this.playAnimation(imgs, 1);

      if (this.currentImg == imgs.length - 1) {
        this.removeThrownObjects();
        this.playAnimation(imgs, 1);

        clearInterval(deathInt);

        Endboss.dyingSound.onended = () => {
          this.world.handleWin();
        };
      }
    }, 50);
  }

  removeThrownObjects() {
    this.world.level.throwableObjects =
      this.world.level.throwableObjects.filter((obj) => obj.state !== "throw");
  }

  triggerEndbossAwakening() {
    this.hadFirstContact = true;
    this.world.character.canMove = false;
    Endboss.risingSound.play();
    this.animateAlertBlinking();

    Endboss.risingSound.onended = () => {
      Endboss.alertSound.play();
      this.animateScream();
    };

    Endboss.alertSound.onended = () => {
      Endboss.bgMusic.play();
      this.world.character.canMove = true;
      this.startEndbossMovement();
    };
  }

  animateAlertBlinking() {
    let index = 0;
    const blinkInt = this.setStoppableInterval(() => {
      if (this.isPaused) return;
      this.animationTicks++;
      if (index == 5) clearInterval(blinkInt);
      this.playAnimation(this.IMAGES_ALERT, 1, 200);
      index++;
    }, 200);
  }

  animateScream() {
    this.img = this.imageCache[this.IMAGES_ALERT[this.IMAGES_ALERT.length - 2]];
  }

  animateLastAlertImg() {
    this.img = this.imageCache[this.IMAGES_ALERT[this.IMAGES_ALERT.length - 1]];
  }

  startEndbossMovement() {
    if (this.movementInterval) clearInterval(this.movementInterval);

    this.movementInterval = this.setStoppableInterval(() => {
      if (this.isPaused || this.isDead()) return;
      this.animationTicks++;
      this.moveEndboss();
      if (this.isHurt())
        this.playHurtAnimationAndSound(Endboss, this.IMAGES_HURT, 100);
      if (this.isDead()) this.handleEndbossDeath();
    }, 100);
  }

  playAlertAnimationAndSound() {
    this.playAnimation(this.IMAGES_ALERT, 1.5, 100);
  }

  killChicken() {
    super.killChicken();
    Endboss.bgMusic.pause();
  }

  moveEndboss() {
    if (this.isDead()) return;
    if (this.characterIsNear()) this.attackCharacter();
    else {
      this.playAnimation(this.IMAGES_WALKING, 1, 100);
      this.speed = (5 / 720) * canvas.width;
    }

    if (this.characterIsLeft()) this.moveLeft();
    else if (this.characterIsRight()) this.moveRight();
  }

  moveLeft() {
    super.moveLeft();
    this.otherDirection = false;
  }

  moveRight() {
    super.moveRight();
    this.otherDirection = true;
  }

  characterIsLeft() {
    return this.world.character.x < this.x;
  }

  characterIsRight() {
    return this.world.character.x > this.x;
  }

  characterIsNear() {
    return (
      (this.characterIsLeft() &&
        this.x -
          (this.world.character.x +
            (this.world.character.width - this.world.character.offset.right)) <=
          (125 / 720) * canvas.width) ||
      (this.characterIsRight() &&
        this.world.character.x - (this.x + (this.width - this.offset.right)) <=
          (125 / 720) * canvas.width)
    );
  }

  attackCharacter() {
    this.speed = (25 / 720) * canvas.width;
    this.playAnimation(this.IMAGES_ATTACK, 1, 100);
    this.jump();
  }

  jump() {
    if (this.isAboveGround()) return;
    this.speedY = (25 / 480) * canvas.height;
  }

  hit(damage, statusbar) {
    super.hit(damage, statusbar);

    if (this.isDead()) {
      this.handleEndbossDeath();
    }
  }
}
