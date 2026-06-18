class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  energy = 100;
  lastHit = 0;
  speedY = 0;
  acceleration = 2.5;
  animationTicks = 0;
  lastImages;
  isInvincible = false;

  intervalIds = [];

  //   setStoppableInterval(fn, time) {
  //     let id = setInterval(fn, time);
  //     this.intervalIds.push(id);
  //   }

  //   stopGame() {
  //     this.intervalIds.forEach(clearInterval);
  //   }

  //   /* Alternative (quick and dirty), um alle Intervalle zu beenden. */
  // clearAllIntervals() {
  //     for (let i = 1; i < 9999; i++) window.clearInterval(i);
  //   }

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
      return this.y < 370;
    } else {
      return this.y < 150;
    }
  }

  playAnimation(images, speed = 1, interval = 50) {
    speed = speed * (100 / interval);

    if (this.lastImages !== images) {
      this.currentImg = 0;
      this.lastImages = images;
    }

    if (this.animationTicks % speed === 0) {
      let path = images[this.currentImg];
      this.img = this.imageCache[path];

      if (this.currentImg >= images.length - 1) {
        if (this instanceof ThrowableObject) return true;
        this.currentImg = 0;
      } else {
        this.currentImg++;
      }
    }

    if (this instanceof ThrowableObject) return false;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  hit(damage) {
    if (this.isInvincible) return;
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = Date.now();
    }
  }

  isWalking() {
    return this.world.keyboard.LEFT || this.world.keyboard.RIGHT;
  }

  isDead() {
    return this.energy == 0;
  }

  isHurt() {
    let timePassed = Date.now() - this.lastHit;
    timePassed = timePassed / 1000;
    if (timePassed > 0.75) {
      return false;
    } else {
      return true;
    }
  }

  playHurtAnimationAndSound(imgs) {
    this.playAnimation(imgs, 1);
    this.hurtingSound.play();
  }

  playDeathAnimationAndSound(imgs, animationInterval) {
    this.playAnimation(imgs, 2);
    this.dyingSound.play();
    if (this.currentImg == imgs.length - 1) {
      this.playAnimation(imgs, 2);
      clearInterval(animationInterval);
    }
  }
}
