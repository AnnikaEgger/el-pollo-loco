class StatusbarBottles extends Statusbar {
  y = 50;

  static IMAGES = [
    "../img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "../img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "../img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "../img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "../img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "../img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  constructor() {
    let chosenImages = StatusbarBottles.IMAGES;
    super(chosenImages, "bottles");
  }
}
