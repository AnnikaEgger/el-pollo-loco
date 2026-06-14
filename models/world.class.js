class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  statusbarHealth = new StatusbarHealth("blue");
  statusbarBottle = new StatusbarBottle("blue");
  statusbarCoins = new StatusbarCoins("blue");
  throwableObjects = [];

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
    }, 200);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColiding(enemy)) {
        this.character.hit();
        this.statusbarHealth.setPercentage(this.character.energy);
      }
    });
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      console.log("D pressed");

      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100,
      );
      this.throwableObjects.push(bottle);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.cameraX, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.cameraX, 0);
    // space for fixed objects
    this.addToMap(this.statusbarHealth);
    this.addToMap(this.statusbarBottle);
    this.addToMap(this.statusbarCoins);

    this.ctx.translate(this.cameraX, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);

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
