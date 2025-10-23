import { ExtractedCondition, AuthiResult } from './types';
import { DataService } from './dataService';

export class AuthiModel {
  private static instance: AuthiModel;
  private dataService: DataService;
  private targetConditions = [
    'Diabetes insipidus',
    'Diabetes mellitus type 1', 
    'Diabetes mellitus type 2'
  ];

  private constructor() {
    this.dataService = DataService.getInstance();
  }

  public static getInstance(): AuthiModel {
    if (!AuthiModel.instance) {
      AuthiModel.instance = new AuthiModel();
    }
    return AuthiModel.instance;
  }

  /**
   * Simulates ClinicalBERT processing to extract conditions from clinical notes
   * In a real implementation, this would use the actual ClinicalBERT model
   */
  public async extractConditions(clinicalNote: string): Promise<ExtractedCondition[]> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const extractedConditions: ExtractedCondition[] = [];
    const noteLower = clinicalNote.toLowerCase();

    // Enhanced keyword matching with confidence scoring
    this.targetConditions.forEach(condition => {
      const conditionLower = condition.toLowerCase();
      let confidence = 0;

      // Direct match
      if (noteLower.includes(conditionLower)) {
        confidence = 0.95;
      }
      // Partial matches
      else if (conditionLower.includes('diabetes')) {
        if (noteLower.includes('diabetes')) {
          if (conditionLower.includes('type 1') && noteLower.includes('type 1')) {
            confidence = 0.90;
          } else if (conditionLower.includes('type 2') && noteLower.includes('type 2')) {
            confidence = 0.90;
          } else if (conditionLower.includes('insipidus') && noteLower.includes('insipidus')) {
            confidence = 0.90;
          } else if (noteLower.includes('insulin-dependent') && conditionLower.includes('type 1')) {
            confidence = 0.85;
          } else if (noteLower.includes('non-insulin-dependent') && conditionLower.includes('type 2')) {
            confidence = 0.85;
          } else {
            confidence = 0.60; // Generic diabetes mention
          }
        }
      }

      // Additional context clues
      if (noteLower.includes('excessive thirst') && conditionLower.includes('insipidus')) {
        confidence = Math.max(confidence, 0.80);
      }
      if (noteLower.includes('insulin therapy') && conditionLower.includes('type 1')) {
        confidence = Math.max(confidence, 0.85);
      }
      if (noteLower.includes('metformin') && conditionLower.includes('type 2')) {
        confidence = Math.max(confidence, 0.80);
      }

      if (confidence > 0.5) {
        extractedConditions.push({
          condition,
          confidence
        });
      }
    });

    // Sort by confidence
    return extractedConditions.sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Integrates extracted conditions with data from CSV files
   */
  public async integrateData(extractedConditions: ExtractedCondition[]): Promise<AuthiResult> {
    const result: AuthiResult = {
      conditions: [],
      treatments: [],
      medicines: []
    };

    // Get the most confident condition
    const primaryCondition = extractedConditions[0];
    if (!primaryCondition) {
      return result;
    }

    // Get related data
    result.conditions = this.dataService.getConditionsByType(primaryCondition.condition);
    result.treatments = this.dataService.getTreatmentsByCondition(primaryCondition.condition);
    result.medicines = this.dataService.getMedicinesByCondition(primaryCondition.condition);

    return result;
  }

  /**
   * Main processing function that combines extraction and integration
   */
  public async processClinicalNote(clinicalNote: string): Promise<{
    extractedConditions: ExtractedCondition[];
    integratedData: AuthiResult;
  }> {
    const extractedConditions = await this.extractConditions(clinicalNote);
    const integratedData = await this.integrateData(extractedConditions);

    return {
      extractedConditions,
      integratedData
    };
  }

  /**
   * Get all available conditions for reference
   */
  public getTargetConditions(): string[] {
    return [...this.targetConditions];
  }

  /**
   * Validate if a condition is supported
   */
  public isSupportedCondition(condition: string): boolean {
    return this.targetConditions.some(target => 
      target.toLowerCase().includes(condition.toLowerCase()) ||
      condition.toLowerCase().includes(target.toLowerCase())
    );
  }
}
