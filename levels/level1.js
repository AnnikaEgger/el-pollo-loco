const canvas = document.getElementById("canvas");
let MAX_Y = 65;
let BOTTLE_Y = 370;

function getRandomX(type) {
  if (type == "coin") {
    return (
      Math.random() * (canvas.width * 3 - (250 / 720) * canvas.width) +
      (250 / 720) * canvas.width
    );
  } else {
    return (
      Math.random() * (canvas.width * 3 - (400 / 720) * canvas.width) +
      (400 / 720) * canvas.width
    );
  }
}

function getRandomY(type) {
  if (type == "coin") {
    return MAX_Y + Math.random() * ((320 / 480) * canvas.height - MAX_Y);
  } else {
    return MAX_Y + Math.random() * ((380 / 480) * canvas.height - MAX_Y);
  }
}

function createLevel1() {
  return new Level(
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
      new Cloud(1, canvas.width),
      new Cloud(0, canvas.width * 2),
      new Cloud(1, canvas.width * 3),
      new Cloud(0, canvas.width * 4),
    ],
    [
      new BackgroundObject(
        "img/5_background/layers/air.png",
        -canvas.width,
        canvas,
      ),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        -canvas.width,
        canvas,
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        -canvas.width,
        canvas,
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        -canvas.width,
        canvas,
      ),

      new BackgroundObject("img/5_background/layers/air.png", 0, canvas),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        0,
        canvas,
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        0,
        canvas,
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        0,
        canvas,
      ),

      new BackgroundObject(
        "img/5_background/layers/air.png",
        canvas.width,
        canvas,
      ),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        canvas.width,
        canvas,
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        canvas.width,
        canvas,
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        canvas.width,
        canvas,
      ),

      new BackgroundObject(
        "img/5_background/layers/air.png",
        canvas.width * 2,
        canvas,
      ),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        canvas.width * 2,
        canvas,
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        canvas.width * 2,
        canvas,
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        canvas.width * 2,
        canvas,
      ),

      new BackgroundObject(
        "img/5_background/layers/air.png",
        canvas.width * 3,
        canvas,
      ),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        canvas.width * 3,
        canvas,
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        canvas.width * 3,
        canvas,
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        canvas.width * 3,
        canvas,
      ),

      new BackgroundObject(
        "img/5_background/layers/air.png",
        canvas.width * 4,
        canvas,
      ),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        canvas.width * 4,
        canvas,
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        canvas.width * 4,
        canvas,
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        canvas.width * 4,
        canvas,
      ),
    ],
    [
      new ThrowableObject(getRandomX("bottle"), BOTTLE_Y, false, "on ground"),
      new ThrowableObject(getRandomX("bottle"), BOTTLE_Y, false, "on ground"),
      new ThrowableObject(getRandomX("bottle"), BOTTLE_Y, false, "on ground"),
      new ThrowableObject(getRandomX("bottle"), BOTTLE_Y, false, "on ground"),
      new ThrowableObject(getRandomX("bottle"), BOTTLE_Y, false, "on ground"),
      new ThrowableObject(getRandomX("bottle"), BOTTLE_Y, false, "on ground"),
      new ThrowableObject(getRandomX("bottle"), BOTTLE_Y, false, "on ground"),
      new ThrowableObject(getRandomX("bottle"), BOTTLE_Y, false, "on ground"),
      new ThrowableObject(getRandomX("bottle"), BOTTLE_Y, false, "on ground"),
    ],
    [
      new Coin(getRandomX("coin"), getRandomY("coin")),
      new Coin(getRandomX("coin"), getRandomY("coin")),
      new Coin(getRandomX("coin"), getRandomY("coin")),
      new Coin(getRandomX("coin"), getRandomY("coin")),
      new Coin(getRandomX("coin"), getRandomY("coin")),
      new Coin(getRandomX("coin"), getRandomY("coin")),
      new Coin(getRandomX("coin"), getRandomY("coin")),
      new Coin(getRandomX("coin"), getRandomY("coin")),
      new Coin(getRandomX("coin"), getRandomY("coin")),
      new Coin(getRandomX("coin"), getRandomY("coin")),
      new Coin(getRandomX("coin"), getRandomY("coin")),
      new Coin(getRandomX("coin"), getRandomY("coin")),
      new Coin(getRandomX("coin"), getRandomY("coin")),
      new Coin(getRandomX("coin"), getRandomY("coin")),
      new Coin(getRandomX("coin"), getRandomY("coin")),
    ],
  );
}
