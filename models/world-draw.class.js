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

    this.ctx.translate(this.cameraX, 0);
    this.addAllObjectsToMap();
    this.ctx.translate(-this.cameraX, 0);

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
  }

  /**
   * Draws the HUD elements that stay fixed relative to the camera.
   */
  addFixedObjectsToMap() {
    this.ctx.translate(-this.cameraX, 0);

    this.addToMap(this.statusbarHealth);
    this.addToMap(this.statusbarBottles);
    this.addToMap(this.statusbarCoins);
    if (this.endboss.hadFirstContact) this.addToMap(this.statusbarEndboss);

    this.ctx.translate(this.cameraX, 0);
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
    this.addToMap(this.character);
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
}
