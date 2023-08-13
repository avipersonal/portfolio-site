import { LightningElement, wire, api } from "lwc";
import PortfolioAssets from "@salesforce/resourceUrl/PortfolioAssets"; //It contains the site link
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
// import PORTFOLIO_OBJECT from "@salesforce/schema/Portfolio__c";
import FULLNAME_FIELD from "@salesforce/schema/Portfolio__c.Full_Name__c";
import COMPANY_NAME_FIELD from "@salesforce/schema/Portfolio__c.Company_Name__c";
import COMPANY_LOCATON_FIELD from "@salesforce/schema/Portfolio__c.Company_Location__c";
import DESIGNATION_FIELD from "@salesforce/schema/Portfolio__c.Designation__c";

export default class PortfolioBanner extends LightningElement {
  @api recordId;
  @api linkedInUrl;
  @api trailheadUrl;
  @api youtubeUrl;
  @api githubUrl;
  @api blogUrl;
  @api twitterUrl;

  profileImage = `${PortfolioAssets}/PortfolioAssets/userPic.jpeg`;
  linkedInIcon = `${PortfolioAssets}/PortfolioAssets/Social/linkedin.svg`;
  trailheadIcon = `${PortfolioAssets}/PortfolioAssets/Social/trailhead1.svg`;
  twitterIcon = `${PortfolioAssets}/PortfolioAssets/Social/twitter.svg`;
  youtubeIcon = `${PortfolioAssets}/PortfolioAssets/Social/youtube.svg`;
  githubIcon = `${PortfolioAssets}/PortfolioAssets/Social/github.svg`;
  blogIcon = `${PortfolioAssets}/PortfolioAssets/Social/blogger.svg`;

  @wire(getRecord, {
    recordId: "$recordId",
    fields: [
      FULLNAME_FIELD,
      COMPANY_LOCATON_FIELD,
      COMPANY_NAME_FIELD,
      DESIGNATION_FIELD
    ]
  })
  portfolioRecord;

  get fullName() {
    return getFieldValue(this.portfolioRecord.data, FULLNAME_FIELD);
  }

  get designation() {
    return getFieldValue(this.portfolioRecord.data, DESIGNATION_FIELD);
  }

  get companyName() {
    return getFieldValue(this.portfolioRecord.data, COMPANY_NAME_FIELD);
  }

  get companyLocation() {
    return getFieldValue(this.portfolioRecord.data, COMPANY_LOCATON_FIELD);
  }
}
