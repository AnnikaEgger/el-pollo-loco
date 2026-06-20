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
  availableBottles = 10;
  availableCoins = 0;
  allowNewBottle = true;

  bgMusic = new Audio("../audio/background-music.mp3");
  bgMusicEndboss = new Audio("../audio/endboss/background-music.mp3");
  cluckingSound = new Audio("../audio/chicken/clucking.mp3");

  AUDIOS = [this.bgMusic, this.bgMusicEndboss, this.cluckingSound];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level.enemies.push(this.endboss);

    this.draw();
    this.setWorld(this.character);
    this.setWorld(this.endboss);
    this.run();
  }

  setWorld(obj) {
    obj.world = this;
  }

  run() {
    setInterval(() => {
      this.playBackgroundSounds();
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkIfBottleCollected();
      this.checkIfCoinCollected();
      this.checkIfEnemyHitByBottle();
    }, 100);
  }

  playBackgroundSounds() {
    this.bgMusic.volume = 0.1;
    if (!this.endboss.hadFirstContact) {
      this.bgMusic.play();
      if (this.checkIfChickensExist()) this.cluckingSound.play();
      else this.cluckingSound.pause();
    } else {
      this.bgMusic.pause();
      this.cluckingSound.pause();
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
          this.character.hit(enemy.damage);
        }
      }
    });
  }

  jumpOnAliveChicken(enemy) {
    return (
      this.character.isAboveGround() &&
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

  handleHitOnEndboss(bottle, enemy) {
    enemy.hit(bottle.damage);
    this.statusbarEndboss.setPercentage(enemy.energy);
    enemy.isInvincible = true;
    setTimeout(() => {
      enemy.isInvincible = false;
    }, 1000);
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
    to.collectingSound.play();
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
    coin.collectingSound.play();
    this.availableCoins += coin.coinValue;
    if (this.availableCoins > 20) this.availableCoins = 20;
    this.updateCoinsStatusbar();

    const index = this.level.coins.indexOf(coin);
    if (index !== -1) {
      this.level.coins.splice(index, 1);
    }
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      if (this.availableBottles > 0) {
        this.getCoordinatesAndCreateBottle();
      } else {
        this.character.errorSound.play();
      }
    }
  }

  getCoordinatesAndCreateBottle() {
    let x;
    let y;
    if (this.character.otherDirection) {
      x = this.character.x;
      y = this.character.y + 100;
    } else {
      x = this.character.x + 100;
      y = this.character.y + 100;
    }
    this.createNewBottle(x, y);
  }

  createNewBottle(x, y) {
    if (!this.allowNewBottle) return;
    this.spawnAndThrowBottle(x, y);
    this.reduceBottleAmmunition();
    this.startBottleCooldown();
  }

  spawnAndThrowBottle(x, y) {
    let bottle = new ThrowableObject(
      x,
      y,
      this.character.otherDirection,
      "throw",
    );
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
    // movableObj.drawFrame(this.ctx);
    obj.drawOffsetFrame(this.ctx);

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
