class Level {
  enemies;
  clouds;
  backgroundObjects;
  throwableObjects;
  coins;
  levelEndX;

  constructor(enemies, clouds, backgroundObjects, throwableObjects, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.throwableObjects = throwableObjects;
    this.coins = coins;
    this.levelEndX = canvas.width * 4;
  }
}
