export interface Condition {
  chronicCondition: string;
  icdCode: string;
  icdDescription: string;
}

export interface Treatment {
  condition: string;
  diagnosticBasket: string;
  diagnosticCode: string;
  diagnosticCoverage: number;
  ongoingBasket: string;
  ongoingCode: string;
  ongoingCoverage: number;
  specialistsCovered: string;
}

export interface Medicine {
  chronicDiseaseCondition: string;
  cdaCorePrioritySaver: string;
  cdaExecutiveComprehensive: string;
  medicineClass: string;
  activeIngredient: string;
  medicineNameStrength: string;
}

export interface ExtractedCondition {
  condition: string;
  confidence: number;
}

export interface CaseData {
  id: string;
  patientNotes: string;
  extractedConditions: ExtractedCondition[];
  confirmedCondition: string;
  selectedIcdCodes: string[];
  diagnosticProcedures: any[];
  ongoingProcedures: any[];
  selectedMedicines: any[];
  motivationNotes: string;
  chronicRegistrationNotes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthiResult {
  conditions: Condition[];
  treatments: Treatment[];
  medicines: Medicine[];
}
