/**
 * Displays the current coin count collected by the player.
 * @class StatusbarCoins
 */
class StatusbarCoins extends Statusbar {
  y;

  static IMAGES = [
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  /**
   * Creates the coin count status bar and positions it below the health bar.
   */
  constructor() {
    let chosenImages = StatusbarCoins.IMAGES;
    super(chosenImages, "coins");
    this.getDimensions();
  }

  /**
   * Places the coin status bar at its custom vertical position.
   */
  getDimensions() {
    super.getDimensions();
    this.y = (100 / 480) * canvas.height;
  }
}
