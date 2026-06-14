class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  energy = 100;
  lastHit = 0;
  speedY = 0;
  acceleration = 2.5;

  offset = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 150;
    }
  }

  playAnimation(images) {
    let index = this.currentImgSrc % images.length;
    let path = images[index];
    this.img = this.imageCache[path];
    this.currentImgSrc++;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }

  isColiding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - this.offset.right &&
      this.y + mo.offset.top < mo.y + mo.height - this.offset.bottom
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isDead() {
    return this.energy == 0;
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    if (timePassed > 1) {
      return false;
    } else {
      return true;
    }
  }
}
