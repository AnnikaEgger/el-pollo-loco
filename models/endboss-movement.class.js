/**
 * Encapsulates the end boss movement logic and battle-state updates.
 * @class EndbossMovement
 */
class EndbossMovement extends MovableObject {
  /**
   * Starts the boss movement loop and battle logic.
   */
  startEndbossMovement() {
    if (this.movementInterval) clearInterval(this.movementInterval);

    this.movementInterval = this.setStoppableInterval(() => {
      if (this.endbossUnmovable()) return;
      this.animationTicks++;
      this.moveEndboss();
      if (this.isHurt())
        this.playHurtAnimationAndSound(Endboss, this.IMAGES_HURT, 100);
      if (this.isDead()) this.handleEndbossDeath();
    }, 100);
  }

  /**
   * Checks whether the boss should currently stop moving.
   * @returns {boolean} True if the battle is paused or the boss is already dead.
   */
  endbossUnmovable() {
    return isPaused || currentGameState == "character dying" || this.isDead();
  }

  /**
   * Updates the boss movement and chooses between walking and attacking.
   */
  moveEndboss() {
    if (this.isDead()) return;
    if (this.characterIsNear()) this.attackCharacter();
    else {
      this.playAnimation(this.IMAGES_WALKING, 1, 100);
      this.speed = (10 / 720) * canvas.width;
    }

    if (this.characterIsLeft()) this.moveLeft();
    else if (this.characterIsRight()) this.moveRight();
  }

  /**
   * Moves the boss left and flips it to face the character.
   */
  moveLeft() {
    super.moveLeft();
    this.otherDirection = false;
  }

  /**
   * Moves the boss right and flips it to face the character.
   */
  moveRight() {
    super.moveRight();
    this.otherDirection = true;
  }

  /**
   * Makes the boss jump if it is currently standing on the ground.
   */
  jump() {
    if (this.isAboveGround()) return;
    this.speedY = (30 / 480) * canvas.height;
  }
}
