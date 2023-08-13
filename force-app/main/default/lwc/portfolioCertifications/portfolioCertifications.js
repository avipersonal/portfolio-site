import { LightningElement, wire, api } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import SF_CERTS_FIELD from "@salesforce/schema/Portfolio__c.Salesforce_Certifications__c";
import OTHER_CERTS_FIELD from "@salesforce/schema/Portfolio__c.Other_Certifications__c";
import PortfolioAssets from "@salesforce/resourceUrl/PortfolioAssets";

export default class PortfolioCertifications extends LightningElement {
  @api recordId;
  salesforceCertList;
  otherCertList;

  certIcon = `${PortfolioAssets}/PortfolioAssets/cert_logo.png`;

  @wire(getRecord, {
    recordId: "$recordId",
    fields: [SF_CERTS_FIELD, OTHER_CERTS_FIELD]
  })
  certificationHandler({ data, error }) {
    if (data) {
      this.formatData(data);
    }
    if (error) {
      console.error(error);
    }
  }

  formatData(data) {
    const { Salesforce_Certifications__c, Other_Certifications__c } =
      data.fields;
    this.salesforceCertList = Salesforce_Certifications__c.value
      ? Salesforce_Certifications__c.value.split(";").map((item) => {
          return "Salesforce Certified " + item;
        })
      : [];
    this.otherCertList = Other_Certifications__c.value
      ? Other_Certifications__c.value.split(",")
      : [];
  }
}
