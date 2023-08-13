import { LightningElement, api } from "lwc";
import PortfolioAssets from "@salesforce/resourceUrl/PortfolioAssets";

export default class UserStatsWrapper extends LightningElement {
  trailheadRankImage;

  @api rank;
  @api trails;
  @api badges;
  @api points;

  renderedCallback() {
    if (this.rank) {
      this.trailheadRankImage = `${PortfolioAssets}/PortfolioAssets/Ranks/${this.rank}.png`;
    }
  }
}
