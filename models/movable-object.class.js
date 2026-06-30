class MovableObject extends DrawableObject {
  speed;
  otherDirection = false;
  energy = 100;
  lastHit = 0;
  speedY = 0;
  acceleration;
  animationTicks = 0;
  lastImages;
  isInvincible = false;
  intervalIds = [];
  canMove = true;

  setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    this.intervalIds.push(id);
    return id;
  }

  constructor() {
    super();
    const parentAudios = super.initAudios();
    this.getDimensions();
  }

  getDimensions() {
    this.acceleration = (2.5 / 480) * canvas.height;
  }

  applyGravity() {
    this.setStoppableInterval(() => {
      if (isPaused) return;
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < this.bottomY;
  }

  playAnimation(images, speed = 1, interval = 50) {
    this.resetCurrentImgWhenNewAnimation(images);

    if (this.nextFrameIsReady(speed, interval)) {
      const animationHasFinished = this.setNextAnimationFrame(images);
      if (this instanceof ThrowableObject) {
        if (animationHasFinished) return true;
        else return false;
      }
    }
  }

  resetCurrentImgWhenNewAnimation(images) {
    if (this.lastImages !== images) {
      this.currentImg = 0;
      this.lastImages = images;
    }
  }

  nextFrameIsReady(speed, interval) {
    const calcSpeed = speed * (100 / interval);
    return this.animationTicks % calcSpeed === 0;
  }

  setNextAnimationFrame(images) {
    let path = images[this.currentImg];
    this.img = this.imageCache[path];

    if (this.currentImg >= images.length - 1) {
      this.currentImg = 0;
      return true;
    } else {
      this.currentImg++;
      return false;
    }
  }

  moveLeft() {
    if (isPaused || currentGameState !== "playing" || !this.canMove) return;
    this.x -= this.speed;
  }

  moveRight() {
    if (isPaused || currentGameState !== "playing" || !this.canMove) return;
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

  hit(damage, statusbar) {
    if (this.isInvincible) return;
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0;
    }

    this.isInvincible = true;
    setTimeout(() => {
      this.isInvincible = false;
    }, 500);

    statusbar.setPercentage(this.energy);
    this.lastHit = Date.now();
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

  playHurtAnimationAndSound(objClass, imgs) {
    this.playAnimation(imgs, 1);
    objClass.hurtingSound.play().catch(() => {});
  }

  // playDeathAnimationAndSound(objClass, imgs, int, speed) {
  //   let deathInt = this.setStoppableInterval(() => {
  //     this.playAnimation(imgs, speed);
  //   }, 100);
  //   objClass.dyingSound.play();
  //   if (this.currentImg == imgs.length - 1) {
  //     // this.playAnimation(imgs, speed);
  //     clearInterval(deathInt);
  //   }
  // }

  // continueAfterAudio(audioElement, callback) {
  //   console.log("function triggered");

  //   let fired = false;
  //   let maxSeconds = audioElement.duration + 1;

  //   const triggerNextStep = () => {
  //     if (!fired) {
  //       fired = true;
  //       audioElement.onended = null;
  //       clearTimeout(timeoutId);
  //       callback();
  //     }
  //   };

  //   const timeoutId = setTimeout(triggerNextStep, maxSeconds * 1000);
  //   audioElement.onended = triggerNextStep;
  // }
}
