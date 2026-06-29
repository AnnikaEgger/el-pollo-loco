class Level {
  enemies;
  clouds;
  backgroundObjects;
  throwableObjects;
  coins;
  levelEndX;

  constructor(enemies, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.throwableObjects = [];
    this.coins = [];
    this.createBottlesOnGround();
    this.createCoins();
    this.getDimensions();
  }

  getDimensions() {
    this.levelEndX = canvas.width * 4;
  }

  resize() {
    this.getDimensions();
  }

  createBottlesOnGround() {
    for (let i = 0; i < 15; i++) {
      let bottle = new ThrowableObject({
        throwableObjects: this.throwableObjects,
      });
      this.throwableObjects.push(bottle);
    }
  }

  createCoins() {
    for (let i = 0; i < 20; i++) {
      let coin = new Coin(this.coins);
      this.coins.push(coin);
    }
  }
}
