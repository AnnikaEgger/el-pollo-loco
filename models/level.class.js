/**
 * Defines a game level by creating its enemies, collectibles, and background elements.
 * @class Level
 */
class Level {
  enemies = [];
  clouds;
  backgroundObjects;
  throwableObjects = [];
  coins = [];
  levelEndX;

  /**
   * Creates the level content and calculates its overall dimensions.
   * @param {Cloud[]} clouds - The cloud objects that belong to the level.
   * @param {BackgroundObject[]} backgroundObjects - The background layers used in the level.
   */
  constructor(clouds, backgroundObjects) {
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.createObjects();
    this.getDimensions();
  }

  /**
   * Initializes the level's collectible objects, enemies, and throwable items.
   */
  createObjects() {
    this.createBottlesOnGround();
    this.createCoins();
    this.createChickens();
  }

  /**
   * Calculates the farthest x-position reachable in the level.
   */
  getDimensions() {
    this.levelEndX = canvas.width * 5;
  }

  /**
   * Recalculates level dimensions when the canvas size changes.
   */
  resize() {
    this.getDimensions();
  }

  /**
   * Spawns throwable bottles across the ground area of the level.
   */
  createBottlesOnGround() {
    for (let i = 0; i < 20; i++) {
      let bottle = new ThrowableObject({
        throwableObjects: this.throwableObjects,
      });
      this.throwableObjects.push(bottle);
    }
  }

  /**
   * Spawns collectible coins throughout the level.
   */
  createCoins() {
    for (let i = 0; i < 20; i++) {
      let coin = new Coin(this.coins);
      this.coins.push(coin);
    }
  }

  /**
   * Creates all enemy groups for the level.
   */
  createChickens() {
    this.createNormalChickens();
    this.createSmallChickens();
  }

  /**
   * Spawns the standard chicken enemies.
   */
  createNormalChickens() {
    for (let i = 0; i < 10; i++) {
      let chickenNormal = new ChickenNormal(this.enemies);
      this.enemies.push(chickenNormal);
    }
  }

  /**
   * Spawns the smaller chicken enemies.
   */
  createSmallChickens() {
    for (let i = 0; i < 10; i++) {
      let chickenSmall = new ChickenSmall(this.enemies);
      this.enemies.push(chickenSmall);
    }
  }
}
