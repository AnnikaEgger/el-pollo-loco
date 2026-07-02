/**
 * Represents the playable character, including movement, jumping, animation, and combat logic.
 * @class Character
 */
class Character extends MovableObject {
  imgSrc = "./assets/img/2_character_pepe/1_idle/idle/I-1.png";
  world;
  speed;
  idleStartTime;
  deadAnimationProgress = 0;
  animationInt;
  bottomY;
  alreadyDead = false;
  energy = 100;

  static walkingSound = new Audio("./assets/audio/character/walking.mp3");
  static snoringSound = new Audio("./assets/audio/character/snoring.mp3");
  static hurtingSound = new Audio("./assets/audio/character/hurting.mp3");
  static dyingSound = new Audio("./assets/audio/character/dying.mp3");
  static jumpingSound = new Audio("./assets/audio/character/jumping.mp3");

  static AUDIOS = [
    Character.walkingSound,
    Character.snoringSound,
    Character.hurtingSound,
    Character.dyingSound,
    Character.jumpingSound,
  ];

  static {
    this.walkingSound.volume = 0.15;
    this.snoringSound.volume = 0.5;
    this.hurtingSound.volume = 0.5;
    this.dyingSound.volume = 0.1;
    this.jumpingSound.volume = 0.6;
  }

  static {
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

  /**
   * Creates a new playable character and initializes its movement, animation, and gravity behavior.
   */
  constructor() {
    super();
    Character.dyingSound.onended = null;
    this.loadAllImages();
    this.getDimensions();
    this.y = this.bottomY;
    this.idleStartTime = null;
    this.applyGravity();
  }

  /**
   * Loads all animation images for the character.
   * @returns {Promise<void>} Resolves once all image sets have been loaded.
   */
  async loadAllImages() {
    await this.loadImage(this.imgSrc);
    await this.loadImages(this.IMAGES_IDLE);
    await this.loadImages(this.IMAGES_SLEEPING);
    await this.loadImages(this.IMAGES_WALKING);
    await this.loadImages(this.IMAGES_JUMPING);
    await this.loadImages(this.IMAGES_HURT);
    await this.loadImages(this.IMAGES_DEAD);
  }

  /**
   * Sets the character's size, base position, movement speed, and collision offset.
   */
  getDimensions() {
    this.height = (280 / 480) * canvas.height;
    this.width = (130 / 720) * canvas.width;
    this.bottomY = (150 / 480) * canvas.height;
    this.speed = (7.5 / 720) * canvas.width;
    super.getDimensions();
    this.getCharacterOffset();
  }

  /**
   * Defines the collision offset for the character sprite.
   */
  getCharacterOffset() {
    this.offset = {
      left: (35 / 720) * canvas.width,
      right: (40 / 720) * canvas.width,
      top: (120 / 480) * canvas.height,
      bottom: (15 / 480) * canvas.height,
    };
  }

  /**
   * Starts the character's movement and animation update loops.
   */
  animate() {
    this.setStoppableInterval(() => {
      if (isPaused) return;
      this.moveCharacter();
    }, 1000 / 60);

    this.animationInt = this.setStoppableInterval(() => {
      if (isPaused) return;
      this.animationTicks++;
      this.playAnimations();
    }, 50);
  }

  /**
   * Chooses and plays the appropriate animation based on the character's current state.
   */
  playAnimations() {
    if (this.isDead()) return;
    if (!this.canMove) {
      Character.walkingSound.pause();
      this.playAnimation(this.IMAGES_IDLE, 2);
      return;
    }
    this.determineActiveAnimation();
  }

  /**
   * Decides whether the character should idle, sleep, jump, get hurt, or walk.
   */
  determineActiveAnimation() {
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

  /**
   * Plays the sleeping animation and its associated audio cue.
   */
  playSleepAnimationAndSound() {
    this.playAnimation(this.IMAGES_SLEEPING, 2);
    Character.snoringSound.play().catch(() => {});
  }

  /**
   * Plays the walking animation and its associated audio cue.
   */
  playWalkingAnimationAndSound() {
    this.playAnimation(this.IMAGES_WALKING, 1);
    Character.walkingSound.play().catch(() => {});
  }

  /**
   * Starts or stops the walking animation depending on whether movement input is active.
   */
  handleWalking() {
    if (this.isWalking()) {
      this.playWalkingAnimationAndSound();
    } else {
      Character.walkingSound.pause();
    }
  }

  /**
   * Applies movement input and updates the camera position according to the character's x-coordinate.
   */
  moveCharacter() {
    if (this.isDead()) return;
    if (this.world.keyboard.LEFT && this.x > 0) this.moveLeft();
    if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX)
      this.moveRight();
    if (this.world.keyboard.SPACE && !this.isAboveGround()) this.jump();
    this.world.cameraX = -this.x + (100 / 720) * canvas.width;
  }

  /**
   * Makes the character jump if movement is allowed.
   */
  jump() {
    if (!this.canMove) return;
    this.speedY = (30 / 480) * canvas.height;
    Character.jumpingSound.play().catch(() => {});
  }

  /**
   * Gives the character a short upward boost after stomping an enemy.
   */
  bounceUpwards() {
    this.speedY = (10 / 480) * canvas.height;
  }

  /**
   * Checks whether the character is currently idle.
   * @returns {boolean} True if no movement or action input is active and the character is not hurt or airborne.
   */
  isIdle() {
    return (
      !this.isDead() &&
      !this.isHurt() &&
      !this.isAboveGround() &&
      this.noKeyPressed()
    );
  }

  /**
   * Measures how long the character has remained idle.
   * @returns {number} The elapsed idle time in seconds.
   */
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

  /**
   * Checks whether no movement or action keys are currently pressed.
   * @returns {boolean} True if the player is not pressing any input keys.
   */
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

  /**
   * Checks whether the character has reached the area where the end boss appears.
   * @returns {boolean} True when the character is near the boss encounter zone.
   */
  isNearEndboss() {
    return this.x >= canvas.width * 4 + (150 / 720) * canvas.width;
  }

  /**
   * Moves the character left and flips the sprite direction.
   */
  moveLeft() {
    super.moveLeft();
    this.otherDirection = true;
  }

  /**
   * Moves the character right and resets the sprite direction.
   */
  moveRight() {
    super.moveRight();
    this.otherDirection = false;
  }

  /**
   * Applies damage to the character and triggers the death sequence when health reaches zero.
   * @param {number} damage - The amount of damage to apply.
   * @param {Statusbar} statusbar - The status bar instance to update.
   */
  hit(damage, statusbar) {
    super.hit(damage, statusbar);
    if (this.isDead() && !this.alreadyDead) {
      this.handleCharacterDeath();
    }
  }

  /**
   * Stops the current animation loop and starts the character's death sequence.
   */
  handleCharacterDeath() {
    this.alreadyDead = true;
    currentGameState = "character dying";
    clearInterval(this.animationInt);
    this.playDeathAnimationAndSound();
  }

  /**
   * Stops the audio and starts the character's death animation with its death sound.
   */
  playDeathAnimationAndSound() {
    pauseAudios();
    Character.dyingSound.play().catch(() => {});
    this.runDeathAnimationLoop();
  }

  /**
   * Runs the death animation until the final frame and then triggers the game over state.
   */
  runDeathAnimationLoop() {
    let imgs = this.IMAGES_DEAD;
    let deathInt = this.setStoppableInterval(() => {
      if (isPaused) return;
      this.animationTicks++;
      this.playAnimation(imgs, 2);

      if (this.currentImg == imgs.length - 1) {
        this.playAnimation(imgs, 2);
        clearInterval(deathInt);
        Character.dyingSound.onended = () => this.world.handleGameOver();
      }
    }, 50);
  }
}
