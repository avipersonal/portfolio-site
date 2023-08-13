import { LightningElement, wire, api } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import SUPERBADGE_FIELD from "@salesforce/schema/Portfolio__c.Superbadges__c";
import AWARDS_FIELD from "@salesforce/schema/Portfolio__c.Awards__c";
import LANGUAGE_FIELD from "@salesforce/schema/Portfolio__c.Languages__c";
import PortfolioAssets from "@salesforce/resourceUrl/PortfolioAssets";

export default class PortfolioOtherDetails extends LightningElement {
  @api recordId;

  badgeIcon = `${PortfolioAssets}/PortfolioAssets/badge.png`;
  trophyIcon = `${PortfolioAssets}/PortfolioAssets/trophy.png`;
  languageIcon = `${PortfolioAssets}/PortfolioAssets/language.png`;

  superbadgeList = [];
  awardList = [];
  languageList = [];

  @wire(getRecord, {
    recordId: "$recordId",
    fields: [SUPERBADGE_FIELD, AWARDS_FIELD, LANGUAGE_FIELD]
  })
  otherDetailsHandler({ data, error }) {
    if (data) {
      console.log(JSON.stringify(data));
      this.formatData(data);
      if (error) {
        console.log(error);
      }
    }
  }

  formatData(data) {
    const { Awards__c, Languages__c, Superbadges__c } = data.fields;
    console.log(Awards__c.value);
    this.superbadgeList = Superbadges__c.value
      ? Superbadges__c.value.split(";")
      : [];
    this.languageList = Languages__c.value ? Languages__c.value.split(",") : [];
    this.awardList = Awards__c.value != null ? Awards__c.value.split(",") : [];
  }
}
