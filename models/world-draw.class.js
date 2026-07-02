/**
 * Handles the rendering pipeline for drawing the game world to the canvas.
 * @class WorldDraw
 */
class WorldDraw {
  /**
   * Renders the current frame and schedules the next animation frame.
   */

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.roundedCameraX = Math.round(this.cameraX);
    this.ctx.translate(this.roundedCameraX, 0);
    this.addAllObjectsToMap();
    this.ctx.translate(-this.roundedCameraX, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds all background, interactive, and fixed objects to the map in the correct order.
   */
  addAllObjectsToMap() {
    this.addBackgroundObjectsToMap();
    this.addInteractiveObjectstoMap();
    this.addFixedObjectsToMap();
    this.addToMap(this.character);
  }

  /**
   * Draws the HUD elements that stay fixed relative to the camera.
   */
  addFixedObjectsToMap() {
    this.ctx.translate(-this.roundedCameraX, 0);

    this.addToMap(this.statusbarHealth);
    this.addToMap(this.statusbarBottles);
    this.addToMap(this.statusbarCoins);
    if (this.endboss.hadFirstContact) this.addToMap(this.statusbarEndboss);

    this.ctx.translate(this.roundedCameraX, 0);
  }

  /**
   * Adds the layered background objects to the map.
   */
  addBackgroundObjectsToMap() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
  }

  /**
   * Adds the character, enemies, bottles, and coins to the map.
   */
  addInteractiveObjectstoMap() {
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.throwableObjects);
    this.addObjectsToMap(this.level.coins);
  }

  /**
   * Draws a list of objects using the shared map rendering logic.
   * @param {Array} objects - The objects to draw.
   */
  addObjectsToMap(objects) {
    objects.forEach((obj) => this.addToMap(obj));
  }

  /**
   * Draws a single object and flips it horizontally when needed.
   * @param {DrawableObject} obj - The object to render.
   */
  addToMap(obj) {
    if (obj.otherDirection) this.flipImage(obj);
    obj.draw(this.ctx);
    if (obj.otherDirection) this.flipImageBack(obj);
  }

  /**
   * Flips the canvas context for rendering a horizontally mirrored object.
   * @param {DrawableObject} movableObj - The object that should be mirrored.
   */
  flipImage(movableObj) {
    this.ctx.save();
    this.ctx.translate(movableObj.width, 0);
    this.ctx.scale(-1, 1);
    movableObj.x = movableObj.x * -1;
  }

  /**
   * Restores the canvas context after mirroring an object.
   * @param {DrawableObject} movableObj - The object whose mirrored position should be reset.
   */
  flipImageBack(movableObj) {
    movableObj.x = movableObj.x * -1;
    this.ctx.restore();
  }

  /**
   * Prevents the player from throwing bottles too frequently by applying a short cooldown.
   */
  startBottleCooldown() {
    this.allowNewBottle = false;
    setTimeout(() => (this.allowNewBottle = true), 750);
  }

  /**
   * Updates the bottle status bar to reflect the current inventory count.
   */
  updateBottlesStatusbar() {
    this.statusbarBottles.setPercentage(this.availableBottles * (100 / 10));
  }

  /**
   * Updates the coin status bar to reflect the current inventory count.
   */
  updateCoinsStatusbar() {
    this.statusbarCoins.setPercentage(this.availableCoins * (100 / 20));
  }
}
