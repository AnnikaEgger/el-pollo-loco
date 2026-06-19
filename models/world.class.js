class World {
  character = new Character();
  level = level1;
  endboss = new Endboss(this);
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

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level.enemies.push(this.endboss);

    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.bgMusic.volume = 0.1;
      if (!this.endboss.hadFirstContact) {
        this.bgMusic.play();
        if (this.checkIfChickensExist()) this.cluckingSound.play();
        else this.cluckingSound.pause();
      } else {
        this.bgMusic.pause();
        this.cluckingSound.pause();
      }
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkIfBottleCollected();
      this.checkIfCoinCollected();

      this.checkIfHitByBottle();
    }, 100);
  }

  checkIfChickensExist() {
    return (
      this.level.enemies?.some((enemy) => enemy instanceof Chicken) ?? false
    );
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (
          this.character.isAboveGround() &&
          !(enemy instanceof Endboss) &&
          !enemy.killed
        ) {
          enemy.killChicken();
        } else if (
          !this.character.isAboveGround() &&
          !enemy.killed &&
          !this.character.isInvincible
        ) {
          this.character.hit(enemy.damage);
          console.log(this.character.energy);
          this.character.isInvincible = true;
          setTimeout(() => {
            this.character.isInvincible = false;
          }, 1500);

          this.statusbarHealth.setPercentage(this.character.energy);
        }
      }
    });
  }

  checkIfHitByBottle() {
    this.level.throwableObjects.forEach((bottle) => {
      if (bottle.state == "throw") {
        this.level.enemies.forEach((enemy) => {
          if (bottle.isColliding(enemy) && !enemy.killed) {
            this.letBottleSplash(bottle);
            if (enemy instanceof Endboss) {
              enemy.hit(bottle.damage);
              this.statusbarEndboss.setPercentage(enemy.energy);
              console.log(enemy.energy);
              enemy.isInvincible = true;
              setTimeout(() => {
                enemy.isInvincible = false;
              }, 1000);
            } else {
              enemy.killChicken();
            }
            return;
          }
        });
        if (!bottle.isAboveGround()) {
          this.letBottleSplash(bottle);
        }
      }
    });
  }

  letBottleSplash(bottle) {
    bottle.shatteringSound.play();
    bottle.playSplashAnimation();
    let animationIsFinished = bottle.splashFinished;
    if (animationIsFinished) {
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
        // else {
        //   to.errorSound.play();
        // }
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
      } else {
        this.character.errorSound.play();
      }
    }
  }

  createNewBottle(x, y) {
    if (!this.allowNewBottle) return;

    let bottle = new ThrowableObject(
      x,
      y,
      this.character.otherDirection,
      "throw",
    );
    this.level.throwableObjects.push(bottle);

    bottle.throw();

    this.availableBottles--;
    this.updateBottlesStatusbar();

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

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.cameraX, 0);
    // space for fixed objects
    this.addToMap(this.statusbarHealth);
    this.addToMap(this.statusbarBottles);
    this.addToMap(this.statusbarCoins);
    if (this.endboss.hadFirstContact) this.addToMap(this.statusbarEndboss);

    this.ctx.translate(this.cameraX, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.throwableObjects);
    this.addObjectsToMap(this.level.coins);

    this.ctx.translate(-this.cameraX, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((obj) => this.addToMap(obj));
  }

  addToMap(movableObj) {
    if (movableObj.otherDirection) {
      this.flipImage(movableObj);
    }

    movableObj.draw(this.ctx);
    // movableObj.drawFrame(this.ctx);
    // movableObj.drawOffsetFrame(this.ctx);

    if (movableObj.otherDirection) {
      this.flipImageBack(movableObj);
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
