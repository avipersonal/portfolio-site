public without sharing class NoteTakingAppController {
  @AuraEnabled(cacheable=true)
  public static list<My_Note__c> getAllNotes() {
    try {
      return [
        SELECT Name, Note_Description__c, LastModifiedDate
        FROM My_Note__c
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static My_Note__c createNote(string title, string description) {
    try {
      My_Note__c note = new My_Note__c(
        Name = title,
        Note_Description__c = description
      );
      insert note;
      return [
        SELECT Id, LastModifiedDate, Name, Note_Description__c
        FROM My_Note__c
        WHERE Id = :note.Id
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
