/**
 * Displays the amount of throwable bottles currently available to the player.
 * @class StatusbarBottles
 */
class StatusbarBottles extends Statusbar {
  y;

  static IMAGES = [
    "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  /**
   * Creates the bottle count status bar and positions it above the ground area.
   */
  constructor() {
    let chosenImages = StatusbarBottles.IMAGES;
    super(chosenImages, "bottles");
    this.getDimensions();
  }

  /**
   * Places the bottle status bar at its custom vertical position.
   */
  getDimensions() {
    super.getDimensions();
    this.y = (50 / 480) * canvas.height;
  }
}
