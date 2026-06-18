class StatusbarEndboss extends Statusbar {
  y = 0;
  x = 500;

  static IMAGES = [
    "../img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "../img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "../img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "../img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "../img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "../img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  constructor() {
    let chosenImages = StatusbarEndboss.IMAGES;
    super(chosenImages, "endboss");
  }
}
