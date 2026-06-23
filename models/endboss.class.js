class Endboss extends MovableObject {
  speedY;
  hadFirstContact = false;
  world;
  speed;
  movementInterval;
  animationIndex;
  damage = 15;
  bottomY;

  hurtingSound = new Audio("../audio/endboss/hurting.wav");
  dyingSound = new Audio("../audio/endboss/dying.mp3");
  alertSound = new Audio("../audio/endboss/awakening.mp3");
  risingSound = new Audio("../audio/endboss/riser.mp3");

  IMAGES_ALERT = [
    "../img/4_enemie_boss_chicken/2_alert/G5.png",
    "../img/4_enemie_boss_chicken/2_alert/G6.png",
    "../img/4_enemie_boss_chicken/2_alert/G7.png",
    "../img/4_enemie_boss_chicken/2_alert/G8.png",
    "../img/4_enemie_boss_chicken/2_alert/G9.png",
    "../img/4_enemie_boss_chicken/2_alert/G10.png",
    "../img/4_enemie_boss_chicken/2_alert/G11.png",
    "../img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALKING = [
    "../img/4_enemie_boss_chicken/1_walk/G1.png",
    "../img/4_enemie_boss_chicken/1_walk/G2.png",
    "../img/4_enemie_boss_chicken/1_walk/G3.png",
    "../img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACK = [
    "../img/4_enemie_boss_chicken/3_attack/G13.png",
    "../img/4_enemie_boss_chicken/3_attack/G14.png",
    "../img/4_enemie_boss_chicken/3_attack/G15.png",
    "../img/4_enemie_boss_chicken/3_attack/G16.png",
    "../img/4_enemie_boss_chicken/3_attack/G17.png",
    "../img/4_enemie_boss_chicken/3_attack/G18.png",
    "../img/4_enemie_boss_chicken/3_attack/G19.png",
    "../img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "../img/4_enemie_boss_chicken/4_hurt/G21.png",
    "../img/4_enemie_boss_chicken/4_hurt/G22.png",
    "../img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "../img/4_enemie_boss_chicken/5_dead/G24.png",
    "../img/4_enemie_boss_chicken/5_dead/G25.png",
    "../img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super();
    this.loadAllImages();

    this.getDimensions();
    this.x = canvas.width * 4;
    this.y = this.bottomY;

    this.applyGravity();
    this.animate();

    this.AUDIOS = [
      ...this.AUDIOS,
      this.hurtingSound,
      this.dyingSound,
      this.alertSound,
      this.risingSound,
    ];
  }

  getDimensions() {
    super.getDimensions();

    this.height = (400 / 480) * canvas.height;
    this.width = (250 / 720) * canvas.width;

    this.offset = {
      left: (30 / 720) * canvas.width,
      right: (35 / 720) * canvas.width,
      top: (90 / 480) * canvas.height,
      bottom: (30 / 480) * canvas.height,
    };

    this.speed = (5 / 720) * canvas.width;
    this.bottomY = (50 / 480) * canvas.height;
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
    this.animationIndex = 0;
    const animationInterval = setInterval(() => {
      this.animationTicks++;

      if (this.animationIndex <= this.IMAGES_ALERT.length) {
        this.playAlertAnimationAndSound();
      } else this.handleAwakenedEndboss();
      if (this.characterEncountersEndboss()) this.triggerEndbossAwakening();

      this.animationIndex += 1 / 2;
    }, 50);
  }

  handleAwakenedEndboss() {
    if (this.isDead()) this.handleEndbossDeath();
    else if (this.isHurt()) this.playHurtAnimationAndSound(this.IMAGES_HURT);
  }

  characterEncountersEndboss() {
    return this.world.character.isNearEndboss() && !this.hadFirstContact;
  }

  handleEndbossDeath() {
    this.playDeathAnimationAndSound(this.IMAGES_DEAD, this.movementInterval);
    this.world.bgMusicEndboss.pause();
    this.killed = true;
  }

  triggerEndbossAwakening() {
    this.hadFirstContact = true;
    this.risingSound.play();

    this.risingSound.onended = () => {
      this.alertSound.play();
      this.animationIndex = 0;
    };

    this.alertSound.onended = () => {
      this.world.bgMusicEndboss.play();
      this.startEndbossMovement();
    };
  }

  startEndbossMovement() {
    if (this.movementInterval) clearInterval(this.movementInterval);

    this.movementInterval = setInterval(() => {
      this.animationTicks++;
      this.moveEndboss();
    }, 100);
  }

  playAlertAnimationAndSound() {
    this.playAnimation(this.IMAGES_ALERT, 2, 50);
  }

  killChicken() {
    super.killChicken();
    this.world.bgMusicEndboss.pause();
  }

  moveEndboss() {
    if (this.characterIsNear()) this.attackCharacter();
    else this.playAnimation(this.IMAGES_WALKING, 1, 100);
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
          (75 / 720) * canvas.width) ||
      (this.characterIsRight() &&
        this.world.character.x - (this.x + (this.width - this.offset.right)) <=
          (75 / 720) * canvas.width)
    );
  }

  attackCharacter() {
    this.speed = (10 / 720) * canvas.width;
    this.jump();
  }

  jump() {
    if (this.isAboveGround()) return;
    this.speedY = (35 / 480) * canvas.height;
    // setInterval(() => this.playAnimation(this.IMAGES_ATTACK, 1), 50);
    this.playAnimation(this.IMAGES_ATTACK, 0.5, 100);
  }
}
