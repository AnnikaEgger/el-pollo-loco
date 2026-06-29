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
    this.levelEndX = canvas.width * 5;
  }

  resize() {
    this.getDimensions();
  }

  createBottlesOnGround() {
    for (let i = 0; i < 20; i++) {
      let bottle = new ThrowableObject({
        throwableObjects: this.throwableObjects,
      });
      this.throwableObjects.push(bottle);
    }
  }

  createCoins() {
    for (let i = 0; i < 25; i++) {
      let coin = new Coin(this.coins);
      this.coins.push(coin);
    }
  }
}
