/**
 * Represents the final boss enemy with attack phases, animations, and audio cues.
 * @class Endboss
 */
class Endboss extends EndbossMovement {
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

  /**
   * Creates the end boss at the far right of the level and prepares its animations.
   */
  constructor() {
    super();
    this.clearAudioListeners();
    this.loadAllImages();
    this.getDimensions();
    this.x = canvas.width * 5 - (200 / 720) * canvas.width;
    this.y = this.bottomY;
    this.applyGravity();
  }

  /**
   * Clears any previous end boss audio callback handlers.
   */
  clearAudioListeners() {
    Endboss.dyingSound.onended = null;
    Endboss.risingSound.onended = null;
    Endboss.alertSound.onended = null;
  }

  /**
   * Calculates the boss dimensions, movement speed, and collision offsets for the current canvas size.
   */
  getDimensions() {
    super.getDimensions();
    this.height = (400 / 480) * canvas.height;
    this.width = (250 / 720) * canvas.width;
    this.speed = (20 / 720) * canvas.width;
    this.bottomY = (50 / 480) * canvas.height;
    this.getOffset();
  }

  /**
   * Defines the boss collision offset based on the current size.
   */
  getOffset() {
    this.offset = {
      left: (30 / 720) * canvas.width,
      right: (35 / 720) * canvas.width,
      top: (90 / 480) * canvas.height,
      bottom: (30 / 480) * canvas.height,
    };
  }

  /**
   * Loads all sprite sets used by the end boss.
   */
  loadAllImages() {
    this.loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
  }

  /**
   * Starts the boss encounter logic as soon as the character reaches the boss area.
   */
  animate() {
    this.animationInt = this.setStoppableInterval(() => {
      if (isPaused || currentGameState == "character dying") return;
      if (this.characterEncountersEndboss()) this.triggerEndbossAwakening();
    }, 100);
  }

  /**
   * Checks whether the character has reached the end boss trigger zone for the first time.
   * @returns {boolean} True when the first encounter condition is met.
   */
  characterEncountersEndboss() {
    return this.world.character.isNearEndboss() && !this.hadFirstContact;
  }

  /**
   * Handles the boss defeat sequence and transitions to the win state.
   */
  handleEndbossDeath() {
    currentGameState = "endboss dying";
    clearInterval(this.movementInterval);
    let imgs = this.IMAGES_DEAD;
    pauseAudios();
    Endboss.dyingSound.play().catch(() => {});
    this.playEndbossDeathAnimation(imgs);
  }

  /**
   * Plays the death animation and triggers the win screen after the sequence ends.
   * @param {string[]} imgs - The dead-state image sequence.
   */
  playEndbossDeathAnimation(imgs) {
    let deathInt = this.setStoppableInterval(() => {
      if (isPaused) return;
      this.animationTicks++;
      this.playAnimation(imgs, 1);

      if (this.currentImg == imgs.length - 1) {
        this.removeThrownObjects();
        this.playAnimation(imgs, 1);
        clearInterval(deathInt);
        Endboss.dyingSound.onended = () => this.world.handleWin();
      }
    }, 50);
  }

  /**
   * Removes any throwable objects still marked as airborne after the boss dies.
   */
  removeThrownObjects() {
    this.world.level.throwableObjects =
      this.world.level.throwableObjects.filter((obj) => obj.state !== "throw");
  }

  /**
   * Starts the boss awakening sequence when the player first triggers the encounter.
   */
  triggerEndbossAwakening() {
    this.hadFirstContact = true;
    this.world.character.canMove = false;

    if (isMuted) this.awakeningForMute();
    else this.awakeningWithSound();
  }

  /**
   * Starts the alert sequence without playing sound.
   */
  awakeningForMute() {
    this.animateFullAlert();
  }

  /**
   * Starts the alert sequence with audio cues.
   */
  awakeningWithSound() {
    Endboss.risingSound.play().catch(() => {});
    this.animateAlertBlinking();
    Endboss.risingSound.onended = () => this.makeEndbossScream();
  }

  /**
   * Plays the boss scream and transitions to the actual fight.
   */
  makeEndbossScream() {
    Endboss.alertSound.play().catch(() => {});
    this.animateScream();
    Endboss.alertSound.onended = () => this.startBossFight();
  }

  /**
   * Plays the alert animation sequence until the boss fight starts.
   */
  animateFullAlert() {
    let index = 0;
    const blinkInt = this.setStoppableInterval(() => {
      if (isPaused || currentGameState == "character dying") return;
      this.animationTicks++;
      if (index >= this.IMAGES_ALERT.length - 1) this.startBossFight(blinkInt);

      this.playAnimation(this.IMAGES_ALERT, 1, 200);
      index++;
    }, 200);
  }

  /**
   * Begins the boss fight after the alert animation finishes.
   * @param {number} [blinkInt] - The interval ID for the alert blinking timer.
   */
  startBossFight(blinkInt) {
    if (blinkInt) clearInterval(blinkInt);
    Endboss.bgMusic.play().catch(() => {});
    this.world.character.canMove = true;
    this.startEndbossMovement();
  }

  /**
   * Plays the blinking alert animation while the boss is preparing to attack.
   */
  animateAlertBlinking() {
    let index = 0;
    const blinkInt = this.setStoppableInterval(() => {
      if (isPaused || currentGameState == "character dying") return;
      this.animationTicks++;
      if (index == 5) clearInterval(blinkInt);
      this.playAnimation(this.IMAGES_ALERT, 1, 200);
      index++;
    }, 200);
  }

  /**
   * Displays the final alert sprite before the boss starts attacking.
   */
  animateScream() {
    this.img = this.imageCache[this.IMAGES_ALERT[this.IMAGES_ALERT.length - 2]];
  }

  /**
   * Displays the last alert sprite in the sequence.
   */
  animateLastAlertImg() {
    this.img = this.imageCache[this.IMAGES_ALERT[this.IMAGES_ALERT.length - 1]];
  }

  /**
   * Plays the alert animation while the boss is preparing its attack.
   */
  playAlertAnimationAndSound() {
    this.playAnimation(this.IMAGES_ALERT, 1.5, 100);
  }

  /**
   * Stops the background music when the boss is defeated.
   */
  killChicken() {
    super.killChicken();
    Endboss.bgMusic.pause();
  }

  /**
   * Checks whether the character is positioned to the left of the boss.
   * @returns {boolean} True when the character is left of the boss.
   */
  characterIsLeft() {
    return this.world.character.x < this.x;
  }

  /**
   * Checks whether the character is positioned to the right of the boss.
   * @returns {boolean} True when the character is right of the boss.
   */
  characterIsRight() {
    return this.world.character.x > this.x;
  }

  /**
   * Checks whether the character is close enough to the boss to trigger an attack.
   * @returns {boolean} True when the character is near enough.
   */
  characterIsNear() {
    return (
      (this.characterIsLeft() &&
        this.x -
          (this.world.character.x +
            (this.world.character.width - this.world.character.offset.right)) <=
          (150 / 720) * canvas.width) ||
      (this.characterIsRight() &&
        this.world.character.x - (this.x + (this.width - this.offset.right)) <=
          (150 / 720) * canvas.width)
    );
  }

  /**
   * Initiates an attack against the player and triggers a jump.
   */
  attackCharacter() {
    this.speed = (25 / 720) * canvas.width;
    this.playAnimation(this.IMAGES_ATTACK, 1, 100);
    this.jump();
  }

  /**
   * Applies damage to the boss and triggers defeat behavior when its energy is depleted.
   * @param {number} damage - The amount of damage to apply.
   * @param {Statusbar} statusbar - The status bar showing the boss health.
   */
  hit(damage, statusbar) {
    super.hit(damage, statusbar);

    if (this.isDead()) {
      this.handleEndbossDeath();
    }
  }
}
