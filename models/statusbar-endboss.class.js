class StatusbarEndboss extends Statusbar {
  y = 0;
  x = (500 / 720) * canvas.width;

  static IMAGES = [
    "../img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "../img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "../img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "../img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "../img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "../img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];

  constructor() {
    let chosenImages = StatusbarEndboss.IMAGES;
    super(chosenImages, "endboss");
  }
}
