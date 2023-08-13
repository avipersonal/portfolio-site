import { LightningElement, wire, api } from "lwc";
import { getRelatedListRecords } from "lightning/uiRelatedListApi";
import EDUCATION_OBJECT from "@salesforce/schema/Education__c";
import INSTITUTION_NAME_FIELD from "@salesforce/schema/Education__c.Institution_Name__c";
import TITLE_FIELD from "@salesforce/schema/Education__c.Title__c";
import PASSING_YEAR_FIELD from "@salesforce/schema/Education__c.Passing_Year__c";

const EDUCATION_RELATION_APINAME = EDUCATION_OBJECT.objectApiName.replace(
  "__c",
  "__r"
);

const EDUCATION_TABLE_COLUMNS = [
  { label: "Institution Name", fieldName: "InstitutionName", type: "text" },
  { label: "Title", fieldName: "Title", type: "text" },
  { label: "Passing Year", fieldName: "PassingYear", type: "text" }
];

export default class PortfolioEducation extends LightningElement {
  @api recordId;
  educationList = [];
  educationTableColumns = EDUCATION_TABLE_COLUMNS;

  @wire(getRelatedListRecords, {
    parentRecordId: "$recordId",
    relatedListId: EDUCATION_RELATION_APINAME,
    fields: [
      EDUCATION_OBJECT.objectApiName +
        "." +
        INSTITUTION_NAME_FIELD.fieldApiName,
      EDUCATION_OBJECT.objectApiName + "." + TITLE_FIELD.fieldApiName,
      EDUCATION_OBJECT.objectApiName + "." + PASSING_YEAR_FIELD.fieldApiName
    ],
    sortBy: [PASSING_YEAR_FIELD.fieldApiName]
  })
  educationRecordsHandler({ data, error }) {
    if (data) {
      console.log(JSON.stringify(data));
      this.formatEducationData(data);
    }
    if (error) {
      console.log(error);
    }
  }

  formatEducationData(data) {
    this.educationList = [...data.records].reverse().map((item) => {
      const id = item.id;
      const { Institution_Name__c, Title__c, Passing_Year__c } = item.fields;
      return {
        id,
        InstitutionName: Institution_Name__c.value,
        Title: Title__c.value,
        PassingYear: Passing_Year__c.value
      };
    });
    console.log(JSON.stringify(this.educationList));
  }
}
