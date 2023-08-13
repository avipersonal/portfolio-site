import { LightningElement, wire, api } from "lwc";
import { getRelatedListRecords } from "lightning/uiRelatedListApi";
import WORKEXPERIENCE_OBJECT from "@salesforce/schema/Work_Experience__c";
import COMPANY_NAME_FIELD from "@salesforce/schema/Work_Experience__c.Company_Name__c";
import ROLE_FIELD from "@salesforce/schema/Work_Experience__c.Role__c";
import DESCRIPTION_FIELD from "@salesforce/schema/Work_Experience__c.Description__c";
import JOB_START_DATE_FIELD from "@salesforce/schema/Work_Experience__c.Job_Start_Date__c";
import JOB_END_DATE_FIELD from "@salesforce/schema/Work_Experience__c.Job_End_Date__c";
import IS_CURRENT_FIELD from "@salesforce/schema/Work_Experience__c.Is_Current__c";
import COMPANY_LOCATION_FIELD from "@salesforce/schema/Work_Experience__c.Company_Location__c";

const Work_EXPERIENCE_FIELDS = {
  Role: ROLE_FIELD.fieldApiName,
  CompanyName: COMPANY_NAME_FIELD.fieldApiName,
  JobStartDate: JOB_START_DATE_FIELD.fieldApiName,
  JobEndDate: JOB_END_DATE_FIELD.fieldApiName,
  IsCurrent: IS_CURRENT_FIELD.fieldApiName,
  Description: DESCRIPTION_FIELD.fieldApiName,
  CompanyLocation: COMPANY_LOCATION_FIELD.fieldApiName
};

const WORK_EXPERIENCE_RELATEDLIST_ID =
  WORKEXPERIENCE_OBJECT.objectApiName.replace("__c", "__r");

export default class PortfolioWorkExperience extends LightningElement {
  @api recordId;
  workExperienceList;

  @wire(getRelatedListRecords, {
    parentRecordId: "$recordId",
    relatedListId: WORK_EXPERIENCE_RELATEDLIST_ID,
    fields: [
      WORKEXPERIENCE_OBJECT.objectApiName + "." + Work_EXPERIENCE_FIELDS.Role,
      WORKEXPERIENCE_OBJECT.objectApiName +
        "." +
        Work_EXPERIENCE_FIELDS.CompanyName,
      WORKEXPERIENCE_OBJECT.objectApiName +
        "." +
        Work_EXPERIENCE_FIELDS.JobEndDate,
      WORKEXPERIENCE_OBJECT.objectApiName +
        "." +
        Work_EXPERIENCE_FIELDS.JobStartDate,
      WORKEXPERIENCE_OBJECT.objectApiName +
        "." +
        Work_EXPERIENCE_FIELDS.IsCurrent,
      WORKEXPERIENCE_OBJECT.objectApiName +
        "." +
        Work_EXPERIENCE_FIELDS.Description,
      WORKEXPERIENCE_OBJECT.objectApiName +
        "." +
        Work_EXPERIENCE_FIELDS.CompanyLocation
    ]
  })
  workExperienceHandler({ data, error }) {
    if (data) {
      this.formatData(data);
    }
    if (error) {
      console.log(error);
    }
  }

  formatData(data) {
    this.workExperienceList = [...data.records].reverse().map((item) => {
      const Id = item.id;
      console.log("Id", Id);
      const {
        Company_Name__c,
        Is_Current__c,
        Company_Location__c,
        Role__c,
        Job_Start_Date__c,
        Job_End_Date__c,
        Description__c
      } = item.fields;
      const work = {
        Id,
        CompanyName: this.fieldValue(Company_Name__c),
        IsCurrent: this.fieldValue(Is_Current__c),
        CompanyLocation: this.fieldValue(Company_Location__c),
        Role: this.fieldValue(Role__c),
        JobStartDate: this.fieldValue(Job_Start_Date__c),
        JobEndDate: this.fieldValue(Job_End_Date__c),
        Description: this.fieldValue(Description__c)
      };
      return work;
      // here this signifies to class object.
    });
    console.log(JSON.stringify(this.workExperienceList));
  }

  fieldValue(data) {
    return (data && data.displayValue) || data.value;
  }
}
