class Level {
  enemies = [];
  clouds;
  backgroundObjects;
  throwableObjects = [];
  coins = [];
  levelEndX;

  constructor(clouds, backgroundObjects) {
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.createObjects();
    this.getDimensions();
  }

  createObjects() {
    this.createBottlesOnGround();
    this.createCoins();
    this.createChickens();
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
    for (let i = 0; i < 20; i++) {
      let coin = new Coin(this.coins);
      this.coins.push(coin);
    }
  }

  createChickens() {
    this.createNormalChickens();
    this.createSmallChickens();
  }

  createNormalChickens() {
    for (let i = 0; i < 10; i++) {
      let chickenNormal = new ChickenNormal(this.enemies);
      this.enemies.push(chickenNormal);
    }
  }

  createSmallChickens() {
    for (let i = 0; i < 10; i++) {
      let chickenSmall = new ChickenSmall(this.enemies);
      this.enemies.push(chickenSmall);
    }
  }
}
