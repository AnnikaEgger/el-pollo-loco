class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  statusbarHealth = new StatusbarHealth("blue");
  statusbarBottles = new StatusbarBottles("blue");
  statusbarCoins = new StatusbarCoins("blue");
  availableBottles = 10;
  availableCoins = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkIfBottleCollected();
      this.checkIfCoinCollected();
    }, 200);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusbarHealth.setPercentage(this.character.energy);
      }
    });
  }

  checkIfBottleCollected() {
    this.level.throwableObjects.forEach((to) => {
      if (this.character.isColliding(to)) {
        if (this.availableCoins >= 2) {
          this.collectBottle(to);
        } else {
          to.errorSound.play();
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
    console.log(this.availableCoins);

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

        let bottle = new ThrowableObject(
          x,
          y,
          this.character.otherDirection,
          "throw",
        );
        this.level.throwableObjects.push(bottle);
        bottle.throw();
        if (this.availableBottles > 0) {
          this.availableBottles--;
          this.updateBottlesStatusbar();
        }
      } else {
        this.character.errorSound.play();
      }
    }
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
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  addToMap(movableObj) {
    if (movableObj.otherDirection) {
      this.flipImage(movableObj);
    }

    movableObj.draw(this.ctx);
    movableObj.drawFrame(this.ctx);
    movableObj.drawOffsetFrame(this.ctx);

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
