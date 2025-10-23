import Papa from 'papaparse';
import { Condition, Treatment, Medicine } from './types';

// Mock data based on the CSV files provided
const mockConditions: Condition[] = [
  {
    chronicCondition: 'Diabetes Insipidus',
    icdCode: 'E23.2',
    icdDescription: 'Diabetes insipidus'
  },
  {
    chronicCondition: 'Diabetes Insipidus',
    icdCode: 'N25.1',
    icdDescription: 'Nephrogenic diabetes insipidus'
  },
  {
    chronicCondition: 'Diabetes Mellitus Type 1',
    icdCode: 'E10.0',
    icdDescription: 'Insulin-dependent diabetes mellitus with coma'
  },
  {
    chronicCondition: 'Diabetes Mellitus Type 1',
    icdCode: 'E10.1',
    icdDescription: 'Insulin-dependent diabetes mellitus with ketoacidosis'
  },
  {
    chronicCondition: 'Diabetes Mellitus Type 2',
    icdCode: 'E11.0',
    icdDescription: 'Non-insulin-dependent diabetes mellitus with coma'
  },
  {
    chronicCondition: 'Diabetes Mellitus Type 2',
    icdCode: 'E11.1',
    icdDescription: 'Non-insulin-dependent diabetes mellitus with ketoacidosis'
  }
];

const mockTreatments: Treatment[] = [
  {
    condition: 'Diabetes Insipidus',
    diagnosticBasket: 'U & E only',
    diagnosticCode: '4171',
    diagnosticCoverage: 1,
    ongoingBasket: 'U & E only',
    ongoingCode: '4171',
    ongoingCoverage: 3,
    specialistsCovered: '1'
  },
  {
    condition: 'Diabetes Mellitus Type 1',
    diagnosticBasket: 'ECG – Electrocardiogram',
    diagnosticCode: '1232 or 1233 or 1236',
    diagnosticCoverage: 1,
    ongoingBasket: 'ECG – Electrocardiogram',
    ongoingCode: '1232 or 1233 or 1236',
    ongoingCoverage: 1,
    specialistsCovered: '1 (Ophthalmologist) 4 (Other Specialist)'
  },
  {
    condition: 'Diabetes Mellitus Type 2',
    diagnosticBasket: 'ECG – Electrocardiogram',
    diagnosticCode: '1232 or 1233 or 1236',
    diagnosticCoverage: 1,
    ongoingBasket: 'ECG – Electrocardiogram',
    ongoingCode: '1232 or 1233 or 1236',
    ongoingCoverage: 1,
    specialistsCovered: '1 (Ophthalmologist) 1 (Other Specialist)'
  }
];

const mockMedicines: Medicine[] = [
  {
    chronicDiseaseCondition: 'Diabetes Insipidus',
    cdaCorePrioritySaver: 'R1 500',
    cdaExecutiveComprehensive: 'R1 750',
    medicineClass: 'Posterior pituitary hormones: Vasopressin and analogues',
    activeIngredient: 'Desmopressin',
    medicineNameStrength: 'Ddavp nasal spray 5ml 0.1mg/1ml'
  },
  {
    chronicDiseaseCondition: 'Diabetes Mellitus Type 1',
    cdaCorePrioritySaver: 'R 440.00',
    cdaExecutiveComprehensive: 'R 440.00',
    medicineClass: 'Anti-diabetic agents: Long-acting Insulins',
    activeIngredient: 'Insulin Detemir',
    medicineNameStrength: 'Levemir - pre-filled cartridge 3ml'
  },
  {
    chronicDiseaseCondition: 'Diabetes Mellitus Type 2',
    cdaCorePrioritySaver: 'R 50.00',
    cdaExecutiveComprehensive: 'R 50.00',
    medicineClass: 'Anti-diabetic agents: Biguanides',
    activeIngredient: 'Metformin',
    medicineNameStrength: 'Accord Metformin 500mg; 850mg'
  }
];

export class DataService {
  private static instance: DataService;
  private conditions: Condition[] = [];
  private treatments: Treatment[] = [];
  private medicines: Medicine[] = [];

  private constructor() {
    this.loadData();
  }

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  private async loadData() {
    try {
      // For now, use mock data. In production, you would load from actual CSV files
      this.conditions = mockConditions;
      this.treatments = mockTreatments;
      this.medicines = mockMedicines;
    } catch (error) {
      console.error('Error loading data:', error);
      // Fallback to mock data
      this.conditions = mockConditions;
      this.treatments = mockTreatments;
      this.medicines = mockMedicines;
    }
  }

  public getConditions(): Condition[] {
    return this.conditions;
  }

  public getTreatments(): Treatment[] {
    return this.treatments;
  }

  public getMedicines(): Medicine[] {
    return this.medicines;
  }

  public getConditionsByType(conditionType: string): Condition[] {
    return this.conditions.filter(c => 
      c.chronicCondition.toLowerCase().includes(conditionType.toLowerCase())
    );
  }

  public getTreatmentsByCondition(condition: string): Treatment[] {
    return this.treatments.filter(t => 
      t.condition.toLowerCase().includes(condition.toLowerCase())
    );
  }

  public getMedicinesByCondition(condition: string): Medicine[] {
    return this.medicines.filter(m => 
      m.chronicDiseaseCondition.toLowerCase().includes(condition.toLowerCase())
    );
  }

  public async loadFromCSV(file: File, type: 'conditions' | 'treatments' | 'medicines'): Promise<void> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          try {
            switch (type) {
              case 'conditions':
                this.conditions = results.data.map((row: any) => ({
                  chronicCondition: row['CHRONIC CONDITIONS'],
                  icdCode: row['ICD-CODE'],
                  icdDescription: row['ICD-CODE Description']
                }));
                break;
              case 'treatments':
                this.treatments = results.data.map((row: any) => ({
                  condition: row['CONDITION'],
                  diagnosticBasket: row['DIAGNOSTIC BASKET'],
                  diagnosticCode: row['DIAGNOSTIC BASKET.1'],
                  diagnosticCoverage: parseInt(row['DIAGNOSTIC BASKET.2']) || 0,
                  ongoingBasket: row['ONGOING MANAGEMENT BASKET'],
                  ongoingCode: row['ONGOING MANAGEMENT BASKET.1'],
                  ongoingCoverage: parseInt(row['ONGOING MANAGEMENT BASKET.2']) || 0,
                  specialistsCovered: row['ONGOING MANAGEMENT BASKET.3']
                }));
                break;
              case 'medicines':
                this.medicines = results.data.map((row: any) => ({
                  chronicDiseaseCondition: row['CHRONIC DISEASE LIST CONDITION'],
                  cdaCorePrioritySaver: row['CDA FOR CORE, PRIORITY AND SAVER PLANS'],
                  cdaExecutiveComprehensive: row['CDA FOR EXECUTIVE AND COMPREHENSIVE PLANS'],
                  medicineClass: row['MEDICINE CLASS'],
                  activeIngredient: row['ACTIVE INGREDIENT'],
                  medicineNameStrength: row['MEDICINE NAME AND STRENGTH']
                }));
                break;
            }
            resolve();
          } catch (error) {
            reject(error);
          }
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }
}
