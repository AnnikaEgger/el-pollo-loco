class World {
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
  isPaused = false;
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

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level.enemies.push(this.endboss);

    this.draw();
    this.setWorld(this.character);
    this.setWorld(this.endboss);
    // this.run();
  }

  waitUntilReady() {
    const promises = [];

    const staticAudios = this.constructor.AUDIOS;
    if (Array.isArray(staticAudios)) {
      staticAudios.forEach((audio) => {
        promises.push(
          new Promise((resolve) => {
            if (audio.readyState >= 4) return resolve();
            audio.addEventListener("canplaythrough", () => resolve(), {
              once: true,
            });
            audio.addEventListener("error", () => resolve(), { once: true });
          }),
        );
      });
    }
  }

  setWorld(obj) {
    obj.world = this;
  }

  setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    this.intervalIds.push(id);
  }

  run() {
    this.setStoppableInterval(() => {
      if (this.isPaused) return;
      this.playBackgroundSounds();
      this.checkThrowObjects();
      this.checkCollisions();
      this.checkIfBottleCollected();
      this.checkIfCoinCollected();
      this.checkIfEnemyHitByBottle();
    }, 1000 / 60);
  }

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

  checkIfChickensExist() {
    return (
      this.level.enemies?.some((enemy) => enemy instanceof Chicken) ?? false
    );
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (this.jumpOnAliveChicken(enemy)) {
          enemy.killChicken();
        } else if (this.characterIsHittable(enemy)) {
          this.character.hit(enemy.damage, this.statusbarHealth);
        }
      }
    });
  }

  jumpOnAliveChicken(enemy) {
    return (
      this.character.isAboveGround() &&
      this.character.speedY <= 0 &&
      !(enemy instanceof Endboss) &&
      !enemy.killed
    );
  }

  characterIsHittable(enemy) {
    return (
      (!this.character.isAboveGround() || enemy instanceof Endboss) &&
      !enemy.killed &&
      !this.character.isInvincible
    );
  }

  checkIfEnemyHitByBottle() {
    this.level.throwableObjects.forEach((bottle) => {
      if (!(bottle.state == "throw")) return;

      const hitEnemy = this.level.enemies.find(
        (enemy) => bottle.isColliding(enemy) && !enemy.killed,
      );

      if (hitEnemy) {
        this.handleBottleHit(bottle, hitEnemy);
      } else if (!bottle.isAboveGround()) {
        this.letBottleSplash(bottle);
      }
    });
  }

  handleHitOnEndboss(bottle, endboss) {
    if (endboss.isInvincible) return;
    endboss.hit(bottle.damage, this.statusbarEndboss);
  }

  handleGameOver() {
    endGame();
    World.gameOverSound.play();
  }

  handleWin() {
    endGame();
    World.winSound.play();
  }

  handleBottleHit(bottle, enemy) {
    this.letBottleSplash(bottle);

    if (enemy instanceof Endboss) {
      this.handleHitOnEndboss(bottle, enemy);
    } else {
      enemy.killChicken();
    }
  }

  letBottleSplash(bottle) {
    bottle.playSplashAnimation();
    if (bottle.splashFinished) {
      const index = this.level.throwableObjects.indexOf(bottle);
      if (index > -1) {
        this.level.throwableObjects.splice(index, 1);
      }
    }
  }

  checkIfBottleCollected() {
    this.level.throwableObjects.forEach((to) => {
      if (this.character.isColliding(to) && to.state == "on ground") {
        if (this.availableCoins >= 2) {
          this.collectBottle(to);
        }
      }
    });
  }

  collectBottle(to) {
    ThrowableObject.collectingSound.play();
    if (this.availableBottles < 10) this.availableBottles++;
    this.updateBottlesStatusbar();

    this.availableCoins -= 2;
    this.updateCoinsStatusbar();

    const index = this.level.throwableObjects.indexOf(to);
    if (index !== -1) {
      this.level.throwableObjects.splice(index, 1);
    }
  }

  checkIfCoinCollected() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.collectCoin(coin);
      }
    });
  }

  collectCoin(coin) {
    Coin.collectingSound.play();
    this.availableCoins += coin.coinValue;
    if (this.availableCoins > 20) this.availableCoins = 20;
    this.updateCoinsStatusbar();

    const index = this.level.coins.indexOf(coin);
    if (index !== -1) {
      this.level.coins.splice(index, 1);
    }
  }

  checkThrowObjects() {
    if (!this.character.canMove) return;
    if (this.keyboard.D) {
      if (this.availableBottles > 0) {
        this.createNewBottle();
      } else {
        Character.errorSound.play();
      }
    }
  }

  createNewBottle() {
    if (!this.allowNewBottle) return;
    this.spawnAndThrowBottle();
    this.reduceBottleAmmunition();
    this.startBottleCooldown();
  }

  spawnAndThrowBottle() {
    let bottle = new ThrowableObject({
      state: "throw",
      character: this.character,
    });
    this.level.throwableObjects.push(bottle);
    bottle.throw();
  }

  reduceBottleAmmunition() {
    this.availableBottles--;
    this.updateBottlesStatusbar();
  }

  startBottleCooldown() {
    this.allowNewBottle = false;
    setTimeout(() => (this.allowNewBottle = true), 500);
  }

  updateBottlesStatusbar() {
    this.statusbarBottles.setPercentage(this.availableBottles * (100 / 10));
  }

  updateCoinsStatusbar() {
    this.statusbarCoins.setPercentage(this.availableCoins * (100 / 20));
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.cameraX, 0);
    this.addAllObjectsToMap();
    this.ctx.translate(-this.cameraX, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addAllObjectsToMap() {
    this.addBackgroundObjectsToMap();
    this.addFixedObjectsToMap();
    this.addInteractiveObjectstoMap();
  }

  addFixedObjectsToMap() {
    this.ctx.translate(-this.cameraX, 0);

    this.addToMap(this.statusbarHealth);
    this.addToMap(this.statusbarBottles);
    this.addToMap(this.statusbarCoins);
    if (this.endboss.hadFirstContact) this.addToMap(this.statusbarEndboss);

    this.ctx.translate(this.cameraX, 0);
  }

  addBackgroundObjectsToMap() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
  }

  addInteractiveObjectstoMap() {
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.throwableObjects);
    this.addObjectsToMap(this.level.coins);
  }

  addObjectsToMap(objects) {
    objects.forEach((obj) => this.addToMap(obj));
  }

  addToMap(obj) {
    if (obj.otherDirection) {
      this.flipImage(obj);
    }

    obj.draw(this.ctx);
    // obj.drawOffsetFrame(this.ctx);

    if (obj.otherDirection) {
      this.flipImageBack(obj);
    }
  }

  flipImage(movableObj) {
    this.ctx.save();
    this.ctx.translate(movableObj.width, 0);
    this.ctx.scale(-1, 1);
    movableObj.x = movableObj.x * -1;
  }

  flipImageBack(movableObj) {
    movableObj.x = movableObj.x * -1;
    this.ctx.restore();
  }
}
