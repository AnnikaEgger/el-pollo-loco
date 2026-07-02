/**
 * Main game world controller that manages the canvas, game loop, collisions, and UI.
 * @class World
 */
class World extends WorldDraw {
  character = new Character();
  level = level1;
  endboss = new Endboss();
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  statusbarHealth = new StatusbarHealth();
  statusbarBottles = new StatusbarBottles();
  statusbarCoins = new StatusbarCoins();
  statusbarEndboss = new StatusbarEndboss();
  availableBottles = 0;
  availableCoins = 0;
  allowNewBottle = true;
  intervalIds = [];
  gameOverImg = "./assets/img/You won, you lost/Game Over.png";

  STATUSBARS = [
    this.statusbarHealth,
    this.statusbarBottles,
    this.statusbarCoins,
    this.statusbarEndboss,
  ];

  static bgMusic = new Audio(
    "./assets/audio/general/background-music-game.mp3",
  );
  static cluckingSound = new Audio("./assets/audio/chicken/clucking.mp3");
  static winSound = new Audio("./assets/audio/general/win.mp3");
  static gameOverSound = new Audio("./assets/audio/general/game-over.mp3");

  static {
    this.bgMusic.volume = 0.15;
    this.cluckingSound.volume = 0.2;
    this.winSound.volume = 0.6;
    this.gameOverSound.volume = 0.6;
  }

  static AUDIOS = [
    World.bgMusic,
    World.cluckingSound,
    World.winSound,
    World.gameOverSound,
  ];

  /**
   * Creates the game world, wires the canvas and keyboard input, and starts the main render loop.
   * @param {HTMLCanvasElement} canvas - The canvas element used for rendering.
   * @param {Keyboard} keyboard - The keyboard state object that controls the player.
   */
  constructor(canvas, keyboard) {
    super();
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level.enemies.push(this.endboss);

    this.draw();
    this.setWorld(this.character);
    this.setWorld(this.endboss);
  }

  /**
   * Detects whether the current environment is a mobile device.
   * @returns {boolean} True if the current user agent indicates a mobile device.
   */
  isMobileDevice() {
    const userAgentCheck = /Mobi|Android|iPhone|iPad/i.test(
      navigator.userAgent,
    );
    const touchCheck = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    return userAgentCheck || touchCheck;
  }

  /**
   * Waits for the game's audio assets to become ready before playback begins.
   * @returns {Promise<void>} Resolves once the required audio files are ready.
   */
  async waitUntilReady() {
    const staticAudios = this.constructor.AUDIOS;
    if (!Array.isArray(staticAudios)) return;

    const audioPromises = staticAudios.map((audio) =>
      this.getAudioPromise(audio),
    );
    await Promise.all(audioPromises);
  }

  /**
   * Creates a promise that resolves when a specific audio file has loaded enough to play.
   * @param {HTMLAudioElement} audio - The audio element to wait for.
   * @returns {Promise<void>} Resolves when the audio is ready or errors.
   */
  getAudioPromise(audio) {
    return new Promise((resolve) => {
      if (!audio || audio.readyState >= 4 || this.isMobileDevice())
        return resolve();
      audio.addEventListener("canplaythrough", () => resolve(), { once: true });
      audio.addEventListener("error", () => resolve(), { once: true });
    });
  }

  /**
   * Links an object to this world instance so it can access the game state.
   * @param {Object} obj - The object that should receive the world reference.
   */
  setWorld(obj) {
    obj.world = this;
  }

  /**
   * Registers a repeating interval and stores its ID so it can be cleaned up later.
   * @param {Function} fn - The callback to execute on each tick.
   * @param {number} time - The interval delay in milliseconds.
   */
  setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    this.intervalIds.push(id);
  }

  /**
   * Starts the main gameplay loop that checks sounds, collisions, and pickups.
   */
  run() {
    this.setStoppableInterval(() => {
      if (isPaused || currentGameState !== "playing") return;
      this.playBackgroundSounds();
      this.checkThrowObjects();
      this.checkCollisions();
      this.checkIfBottleCollected();
      this.checkIfCoinCollected();
      this.checkIfEnemyHitByBottle();
    }, 1000 / 60);
  }

  /**
   * Plays the ambient background sounds based on the current boss encounter state.
   */
  playBackgroundSounds() {
    World.bgMusic.volume = 0.1;
    if (!this.endboss.hadFirstContact) {
      World.bgMusic.play().catch(() => {});
      if (this.checkIfChickensExist())
        World.cluckingSound.play().catch(() => {});
      else World.cluckingSound.pause();
    } else {
      World.bgMusic.pause();
      World.cluckingSound.pause();
    }
  }

  /**
   * Checks whether any chicken enemies are still present in the level.
   * @returns {boolean} True when at least one chicken enemy exists.
   */
  checkIfChickensExist() {
    return (
      this.level.enemies?.some((enemy) => enemy instanceof Chicken) ?? false
    );
  }

  /**
   * Resolves all player-enemy collisions and handles jumps, hits, and defeats.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (this.jumpOnAliveChicken(enemy)) {
          enemy.killChicken();
          this.character.bounceUpwards();
        } else if (this.characterIsHittable(enemy)) {
          this.character.hit(enemy.damage, this.statusbarHealth);
        }
      }
    });
  }

  /**
   * Checks whether the character stomped a live chicken while jumping.
   * @param {Chicken} enemy - The enemy candidate to evaluate.
   * @returns {boolean} True when the character can defeat the enemy by landing on it.
   */
  jumpOnAliveChicken(enemy) {
    return (
      this.character.isAboveGround() &&
      this.character.speedY <= 0 &&
      !(enemy instanceof Endboss) &&
      !enemy.killed
    );
  }

  /**
   * Checks whether the character can currently be damaged by the given enemy.
   * @param {Object} enemy - The enemy being evaluated for collision damage.
   * @returns {boolean} True when the enemy is allowed to hit the character.
   */
  characterIsHittable(enemy) {
    return (
      (!this.character.isAboveGround() || enemy instanceof Endboss) &&
      !enemy.killed &&
      !this.character.isInvincible
    );
  }

  /**
   * Checks whether any airborne bottle has hit an enemy or should splash instead.
   */
  checkIfEnemyHitByBottle() {
    this.level.throwableObjects.forEach((bottle) => {
      if (!(bottle.state == "throw")) return;

      const hitEnemy = this.level.enemies.find(
        (enemy) => bottle.isColliding(enemy) && !enemy.killed,
      );

      if (hitEnemy) this.handleBottleHit(bottle, hitEnemy);
      else if (!bottle.isAboveGround()) this.letBottleSplash(bottle);
    });
  }

  /**
   * Applies bottle damage to the end boss when the hit is valid.
   * @param {ThrowableObject} bottle - The bottle that collided with the boss.
   * @param {Endboss} endboss - The boss object receiving the hit.
   */
  handleHitOnEndboss(bottle, endboss) {
    if (endboss.isInvincible) return;
    endboss.hit(bottle.damage, this.statusbarEndboss);
  }

  /**
   * Ends the game in a loss state and plays the corresponding sound.
   */
  handleGameOver() {
    gameLost = true;
    endGame();
    World.gameOverSound.play().catch(() => {});
  }

  /**
   * Ends the game in a win state and triggers the victory sound.
   */
  handleWin() {
    gameWon = true;
    endGame();
    World.winSound.play().catch(() => {});
  }

  /**
   * handles the result of a bottle collision with an enemy.
   * @param {ThrowableObject} bottle - The bottle that hit the enemy.
   * @param {Object} enemy - The enemy that was struck.
   */
  handleBottleHit(bottle, enemy) {
    this.letBottleSplash(bottle);

    if (enemy instanceof Endboss) {
      this.handleHitOnEndboss(bottle, enemy);
    } else {
      enemy.killChicken();
    }
  }

  /**
   * Starts the bottle splash effect and removes the bottle once the animation is complete.
   * @param {ThrowableObject} bottle - The bottle that should splash.
   */
  letBottleSplash(bottle) {
    bottle.playSplashAnimation();
    if (bottle.splashFinished) {
      const index = this.level.throwableObjects.indexOf(bottle);
      if (index > -1) {
        this.level.throwableObjects.splice(index, 1);
      }
    }
  }

  /**
   * Checks whether the character can collect a bottle from the ground.
   */
  checkIfBottleCollected() {
    this.level.throwableObjects.forEach((to) => {
      if (this.character.isColliding(to) && to.state == "on ground") {
        if (this.availableCoins >= 2 && this.availableBottles < 10) {
          this.collectBottle(to);
        }
      }
    });
  }

  /**
   * Collects a bottle and updates the related inventory and UI bars.
   * @param {ThrowableObject} to - The bottle object to collect.
   */
  collectBottle(to) {
    ThrowableObject.collectingSound.currentTime = 0;
    ThrowableObject.collectingSound.play().catch(() => {});
    this.availableBottles++;
    this.updateBottlesStatusbar();

    this.availableCoins -= 2;
    this.updateCoinsStatusbar();

    const index = this.level.throwableObjects.indexOf(to);
    if (index !== -1) this.level.throwableObjects.splice(index, 1);
  }

  /**
   * Checks whether the character can collect a coin from the level.
   */
  checkIfCoinCollected() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin) && this.availableCoins < 20) {
        this.collectCoin(coin);
      }
    });
  }

  /**
   * Collects a coin and updates the player's coin inventory.
   * @param {Coin} coin - The coin object to collect.
   */
  collectCoin(coin) {
    Coin.collectingSound.currentTime = 0;
    Coin.collectingSound.play().catch(() => {});
    this.availableCoins += coin.coinValue;
    if (this.availableCoins > 20) this.availableCoins = 20;
    this.updateCoinsStatusbar();

    const index = this.level.coins.indexOf(coin);
    if (index !== -1) {
      this.level.coins.splice(index, 1);
    }
  }

  /**
   * Checks whether the player tries to throw a bottle and triggers the action if possible.
   */
  checkThrowObjects() {
    if (!this.character.canMove) return;
    if (this.keyboard.D) {
      if (this.availableBottles > 0) {
        this.createNewBottle();
      } else {
        Character.errorSound.play().catch(() => {});
      }
    }
  }

  /**
   * Creates a new bottle if the cooldown allows it.
   */
  createNewBottle() {
    if (!this.allowNewBottle) return;
    this.spawnAndThrowBottle();
    this.reduceBottleAmmunition();
    this.startBottleCooldown();
  }

  /**
   * Instantiates a bottle, adds it to the level, and starts its flight.
   */
  spawnAndThrowBottle() {
    let bottle = new ThrowableObject({
      state: "throw",
      character: this.character,
    });
    this.level.throwableObjects.push(bottle);
    bottle.throw();
  }

  /**
   * Decreases the available bottle count and refreshes the status bar.
   */
  reduceBottleAmmunition() {
    this.availableBottles--;
    this.updateBottlesStatusbar();
  }
}
