let level1;

function initLevel() {
  level1 = new Level(
    [
      new ChickenNormal(),
      new ChickenNormal(),
      new ChickenNormal(),
      new ChickenNormal(),
      new ChickenNormal(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
    ],
    [
      new Cloud(0, 0),
      new Cloud(1, 1),
      new Cloud(0, 2),
      new Cloud(1, 3),
      new Cloud(0, 4),
    ],
    [
      new BackgroundObject("./assets/img/5_background/layers/air.png", -1),
      new BackgroundObject(
        "./assets/img/5_background/layers/3_third_layer/2.png",
        -1,
      ),
      new BackgroundObject(
        "./assets/img/5_background/layers/2_second_layer/2.png",
        -1,
      ),
      new BackgroundObject(
        "./assets/img/5_background/layers/1_first_layer/2.png",
        -1,
      ),

      new BackgroundObject("./assets/img/5_background/layers/air.png", 0),
      new BackgroundObject(
        "./assets/img/5_background/layers/3_third_layer/1.png",
        0,
      ),
      new BackgroundObject(
        "./assets/img/5_background/layers/2_second_layer/1.png",
        0,
      ),
      new BackgroundObject(
        "./assets/img/5_background/layers/1_first_layer/1.png",
        0,
      ),

      new BackgroundObject("./assets/img/5_background/layers/air.png", 1),
      new BackgroundObject(
        "./assets/img/5_background/layers/3_third_layer/2.png",
        1,
      ),
      new BackgroundObject(
        "./assets/img/5_background/layers/2_second_layer/2.png",
        1,
      ),
      new BackgroundObject(
        "./assets/img/5_background/layers/1_first_layer/2.png",
        1,
      ),

      new BackgroundObject("./assets/img/5_background/layers/air.png", 2),
      new BackgroundObject(
        "./assets/img/5_background/layers/3_third_layer/1.png",
        2,
      ),
      new BackgroundObject(
        "./assets/img/5_background/layers/2_second_layer/1.png",
        2,
      ),
      new BackgroundObject(
        "./assets/img/5_background/layers/1_first_layer/1.png",
        2,
      ),

      new BackgroundObject("./assets/img/5_background/layers/air.png", 3),
      new BackgroundObject(
        "./assets/img/5_background/layers/3_third_layer/2.png",
        3,
      ),
      new BackgroundObject(
        "./assets/img/5_background/layers/2_second_layer/2.png",
        3,
      ),
      new BackgroundObject(
        "./assets/img/5_background/layers/1_first_layer/2.png",
        3,
      ),

      new BackgroundObject("./assets/img/5_background/layers/air.png", 4),
      new BackgroundObject(
        "./assets/img/5_background/layers/3_third_layer/1.png",
        4,
      ),
      new BackgroundObject(
        "./assets/img/5_background/layers/2_second_layer/1.png",
        4,
      ),
      new BackgroundObject(
        "./assets/img/5_background/layers/1_first_layer/1.png",
        4,
      ),
    ],
    // [
    //   new ThrowableObject(),
    //   new ThrowableObject(),
    //   new ThrowableObject(),
    //   new ThrowableObject(),
    //   new ThrowableObject(),
    //   new ThrowableObject(),
    //   new ThrowableObject(),
    //   new ThrowableObject(),
    //   new ThrowableObject(),
    //   new ThrowableObject(),
    //   new ThrowableObject(),
    //   new ThrowableObject(),
    //   new ThrowableObject(),
    //   new ThrowableObject(),
    //   new ThrowableObject(),
    // ],
    // [
    //   new Coin(),
    //   new Coin(),
    //   new Coin(),
    //   new Coin(),
    //   new Coin(),
    //   new Coin(),
    //   new Coin(),
    //   new Coin(),
    //   new Coin(),
    //   new Coin(),
    //   new Coin(),
    //   new Coin(),
    //   new Coin(),
    //   new Coin(),
    //   new Coin(),
    //   new Coin(),
    //   new Coin(),
    //   new Coin(),
    //   new Coin(),
    //   new Coin(),
    // ],
  );
}
