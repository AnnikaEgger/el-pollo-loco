class Level {
  enemies;
  clouds;
  backgroundObjects;
  levelEndX = 720 * 3;

  constructor(enemies, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
