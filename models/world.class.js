class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];
  backgroundObjects = [
    new BackgroundObject("img/5_background/layers/air.png", 0),

    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
    // new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 0),
    // new BackgroundObject("img/5_background/layers/3_third_layer/full.png", 0),

    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
    // new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 0),
    // new BackgroundObject("img/5_background/layers/2_second_layer/full.png", 0),

    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
    // new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 0),
    // new BackgroundObject("img/5_background/layers/1_first_layer/full.png", 0),
  ];

  canvas;
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.clouds);

    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  addToMap(movableObj) {
    this.ctx.drawImage(
      movableObj.img,
      movableObj.x,
      movableObj.y,
      movableObj.width,
      movableObj.height,
    );
  }
}

// Aufgabe: draw enemies (for loop)
