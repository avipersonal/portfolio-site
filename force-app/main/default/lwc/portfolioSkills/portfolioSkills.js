import { LightningElement, wire, api } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import TECHNICAL_SKILLS_FIELD from "@salesforce/schema/Portfolio__c.Technical_Skills__c";
import SOFT_SKILLS_FIELD from "@salesforce/schema/Portfolio__c.Soft_Skills__c";
import SOFTWARE_TOOLS_FIELD from "@salesforce/schema/Portfolio__c.Software_Tools__c";
import SOFTWARE_METHODOLOGIES_FIELD from "@salesforce/schema/Portfolio__c.Software_Development_Methodologies__c";

export default class PortfolioSkills extends LightningElement {
  @api recordId;
  techSkills = [];
  softSkills = [];
  softDevMeths = [];
  softAndTools = [];

  @wire(getRecord, {
    recordId: "$recordId",
    fields: [
      TECHNICAL_SKILLS_FIELD,
      SOFTWARE_METHODOLOGIES_FIELD,
      SOFTWARE_TOOLS_FIELD,
      SOFT_SKILLS_FIELD
    ]
  })
  skillsHandler({ data, error }) {
    if (data) {
      console.log(JSON.stringify(data));
      this.formatData(data);
    }
    if (error) {
      console.error(error);
    }
  }

  formatData(data) {
    const {
      Technical_Skills__c,
      Soft_Skills__c,
      Software_Tools__c,
      Software_Development_Methodologies__c
    } = data.fields;
    this.softSkills = Soft_Skills__c.value
      ? Soft_Skills__c.value.split(",")
      : [];
    this.techSkills = Technical_Skills__c.value
      ? Technical_Skills__c.value.split(",")
      : [];
    this.softDevMeths = Software_Development_Methodologies__c.value
      ? Software_Development_Methodologies__c.value.split(",")
      : [];
    this.softAndTools = Software_Tools__c.value
      ? Software_Tools__c.value.split(",")
      : [];
  }
}
