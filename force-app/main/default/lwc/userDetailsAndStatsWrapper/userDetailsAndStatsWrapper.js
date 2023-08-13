import { LightningElement, api } from "lwc";

export default class UserDetailsAndStatsWrapper extends LightningElement {
  @api recordId;
  @api objectApiName;
  @api resumeUrl;

  @api trailheadBadges;
  @api trailheadPoints;
  @api trailheadTrails;
  @api trailheadRank;
}
