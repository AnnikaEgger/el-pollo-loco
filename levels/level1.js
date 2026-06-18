const MAX_Y = 65;
const BOTTLE_Y = 370;

function getRandomX(type) {
  if (type == "coin") {
    return Math.random() * (720 * 3 - 250) + 250;
  } else {
    return Math.random() * (720 * 3 - 400) + 400;
  }
}

function getRandomY(type) {
  if (type == "coin") {
    return MAX_Y + Math.random() * (320 - MAX_Y);
  } else {
    return MAX_Y + Math.random() * (380 - MAX_Y);
  }
}

const level1 = new Level(
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
  [new Cloud()],
  [
    new BackgroundObject("img/5_background/layers/air.png", -720),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -720),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -720),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -720),

    new BackgroundObject("img/5_background/layers/air.png", 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),

    new BackgroundObject("img/5_background/layers/air.png", 720),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 720),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 720),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 720),

    new BackgroundObject("img/5_background/layers/air.png", 720 * 2),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/1.png",
      720 * 2,
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/1.png",
      720 * 2,
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/1.png",
      720 * 2,
    ),

    new BackgroundObject("img/5_background/layers/air.png", 720 * 3),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/2.png",
      720 * 3,
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/2.png",
      720 * 3,
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/2.png",
      720 * 3,
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
  ],
);
