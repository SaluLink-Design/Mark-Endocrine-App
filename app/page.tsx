'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { AuthiModel } from '@/lib/authiModel';
import { DataService } from '@/lib/dataService';
import { CaseData, ExtractedCondition } from '@/lib/types';
import { Sidebar } from '@/components/Sidebar';
import { ConditionConfirmation } from '@/components/ConditionConfirmation';
import { ICDCodeDropdown } from '@/components/ICDCodeDropdown';
import { TreatmentProtocol } from '@/components/TreatmentProtocol';
import { MedicineMapping } from '@/components/MedicineMapping';
import { CaseSummary } from '@/components/CaseSummary';
import { CaseManagement } from '@/components/CaseManagement';
import { PDFExportService } from '@/lib/pdfExportService';
import { Loader2, Play } from 'lucide-react';

type WorkflowStep = 
  | 'note-entry'
  | 'condition-confirmation'
  | 'icd-mapping'
  | 'diagnostic-treatment'
  | 'ongoing-treatment'
  | 'medicine-mapping'
  | 'notes-motivation'
  | 'case-summary'
  | 'case-management';

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>('note-entry');
  const [patientNotes, setPatientNotes] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [extractedConditions, setExtractedConditions] = useState<ExtractedCondition[]>([]);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [selectedIcdCodes, setSelectedIcdCodes] = useState<string[]>([]);
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<string[]>([]);
  const [selectedOngoing, setSelectedOngoing] = useState<string[]>([]);
  const [selectedMedicines, setSelectedMedicines] = useState<string[]>([]);
  const [motivationNotes, setMotivationNotes] = useState('');
  const [chronicRegistrationNotes, setChronicRegistrationNotes] = useState('');
  const [planType, setPlanType] = useState('Core');
  const [currentCase, setCurrentCase] = useState<CaseData | null>(null);
  const [cases, setCases] = useState<CaseData[]>([]);
  const [showIcdDropdown, setShowIcdDropdown] = useState(false);
  const [showOngoing, setShowOngoing] = useState(false);

  const authiModel = AuthiModel.getInstance();
  const dataService = DataService.getInstance();

  // Step 1: Note Entry and Analysis
  const handleAnalyze = async () => {
    if (!patientNotes.trim()) {
      toast.error('Please enter patient notes');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await authiModel.processClinicalNote(patientNotes);
      setExtractedConditions(result.extractedConditions);
      
      if (result.extractedConditions.length > 0) {
        setCurrentStep('condition-confirmation');
        toast.success('Analysis complete! Please confirm the condition.');
      } else {
        toast.error('No supported conditions found in the notes.');
      }
    } catch (error) {
      toast.error('Error analyzing notes');
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Step 2: Condition Confirmation
  const handleConditionConfirm = () => {
    if (!selectedCondition) {
      toast.error('Please select a condition');
      return;
    }
    setCurrentStep('icd-mapping');
    toast.success('Condition confirmed!');
  };

  // Step 3: ICD Code Mapping
  const handleIcdConfirm = () => {
    if (selectedIcdCodes.length === 0) {
      toast.error('Please select at least one ICD code');
      return;
    }
    setCurrentStep('diagnostic-treatment');
    toast.success('ICD codes confirmed!');
  };

  // Step 4: Diagnostic Treatment
  const handleDiagnosticConfirm = () => {
    if (selectedDiagnostic.length === 0) {
      toast.error('Please select at least one diagnostic procedure');
      return;
    }
    setShowOngoing(true);
    toast.success('Diagnostic procedures confirmed!');
  };

  // Step 5: Ongoing Treatment
  const handleOngoingConfirm = () => {
    if (selectedOngoing.length === 0) {
      toast.error('Please select at least one ongoing procedure');
      return;
    }
    setCurrentStep('medicine-mapping');
    toast.success('Ongoing procedures confirmed!');
  };

  // Step 6: Medicine Mapping
  const handleMedicineConfirm = () => {
    if (selectedMedicines.length === 0) {
      toast.error('Please select at least one medication');
      return;
    }
    setCurrentStep('notes-motivation');
    toast.success('Medications confirmed!');
  };

  // Step 7: Notes/Motivation
  const handleNotesConfirm = () => {
    setCurrentStep('case-summary');
    createCaseSummary();
    toast.success('Case completed!');
  };

  // Step 8: Case Summary
  const createCaseSummary = () => {
    const caseData: CaseData = {
      id: Date.now().toString(),
      patientNotes,
      extractedConditions,
      confirmedCondition: selectedCondition!,
      selectedIcdCodes,
      diagnosticProcedures: selectedDiagnostic.map(name => ({
        name,
        code: 'N/A',
        coverage: 1
      })),
      ongoingProcedures: selectedOngoing.map(name => ({
        name,
        code: 'N/A',
        coverage: 1
      })),
      selectedMedicines: selectedMedicines.map(name => ({
        name,
        class: 'N/A',
        activeIngredient: 'N/A',
        cda: 'N/A'
      })),
      motivationNotes,
      chronicRegistrationNotes,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setCurrentCase(caseData);
    setCases(prev => [caseData, ...prev]);
  };

  const handleExportPDF = () => {
    if (currentCase) {
      PDFExportService.exportCaseSummary(currentCase);
      toast.success('PDF exported successfully!');
    }
  };

  const handleExportAllCases = () => {
    if (cases.length > 0) {
      PDFExportService.exportMultipleCases(cases);
      toast.success('All cases exported successfully!');
    } else {
      toast.error('No cases to export');
    }
  };

  const handleViewCase = (caseData: CaseData) => {
    setCurrentCase(caseData);
    setCurrentStep('case-summary');
  };

  const handleDeleteCase = (caseId: string) => {
    setCases(prev => prev.filter(c => c.id !== caseId));
    if (currentCase?.id === caseId) {
      setCurrentCase(null);
      setCurrentStep('note-entry');
    }
    toast.success('Case deleted successfully');
  };

  const handleNewCase = () => {
    setCurrentStep('note-entry');
    setPatientNotes('');
    setExtractedConditions([]);
    setSelectedCondition(null);
    setSelectedIcdCodes([]);
    setSelectedDiagnostic([]);
    setSelectedOngoing([]);
    setSelectedMedicines([]);
    setMotivationNotes('');
    setChronicRegistrationNotes('');
    setCurrentCase(null);
    setShowOngoing(false);
    setShowIcdDropdown(false);
  };

  const handleViewCases = () => {
    setCurrentStep('case-management');
  };

  const getCurrentStepData = () => {
    if (!selectedCondition) return { conditions: [], treatments: [], medicines: [] };
    
    const conditions = dataService.getConditionsByType(selectedCondition);
    const treatments = dataService.getTreatmentsByCondition(selectedCondition);
    const medicines = dataService.getMedicinesByCondition(selectedCondition);
    
    return { conditions, treatments, medicines };
  };

  const { conditions, treatments, medicines } = getCurrentStepData();

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        onNewCase={handleNewCase}
        onViewCases={handleViewCases}
        onClearConversations={() => setCases([])}
        onLightMode={() => toast.success('Light mode activated')}
        onMyAccount={() => toast.success('My account clicked')}
        onUpdatesFAQ={() => toast.success('Updates & FAQ clicked')}
        onLogout={() => toast.success('Logout clicked')}
      />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Authi 1.0</h1>
                <p className="text-gray-600">SaluLink Specialist Aid Documentation</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {currentStep === 'case-management' ? 'Case Management' : `Step ${getStepNumber(currentStep)} of 8`}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {currentStep === 'note-entry' && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Patient Notes Entry</h2>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient Notes:
                  </label>
                  <textarea
                    value={patientNotes}
                    onChange={(e) => setPatientNotes(e.target.value)}
                    placeholder="Enter or paste patient notes here..."
                    className="input-field h-40 resize-none"
                  />
                </div>
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !patientNotes.trim()}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                  {isAnalyzing ? 'Analyzing...' : 'Analyse'}
                </button>
              </div>
            )}

            {currentStep === 'condition-confirmation' && (
              <ConditionConfirmation
                extractedConditions={extractedConditions}
                selectedCondition={selectedCondition}
                onConditionSelect={setSelectedCondition}
                onConfirm={handleConditionConfirm}
              />
            )}

            {currentStep === 'icd-mapping' && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">ICD-10 Code Mapping</h2>
                <p className="text-gray-600 mb-6">
                  Select the appropriate ICD-10 codes for {selectedCondition}:
                </p>
                <ICDCodeDropdown
                  icdCodes={conditions.map(c => ({
                    code: c.icdCode,
                    description: c.icdDescription
                  }))}
                  selectedCodes={selectedIcdCodes}
                  onCodeSelect={(code) => setSelectedIcdCodes(prev => [...prev, code])}
                  onCodeDeselect={(code) => setSelectedIcdCodes(prev => prev.filter(c => c !== code))}
                  isOpen={showIcdDropdown}
                  onToggle={() => setShowIcdDropdown(!showIcdDropdown)}
                />
                <button
                  onClick={handleIcdConfirm}
                  disabled={selectedIcdCodes.length === 0}
                  className="btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm ICD Codes
                </button>
              </div>
            )}

            {currentStep === 'diagnostic-treatment' && (
              <TreatmentProtocol
                treatments={treatments}
                selectedDiagnostic={selectedDiagnostic}
                selectedOngoing={selectedOngoing}
                onDiagnosticSelect={(treatment) => setSelectedDiagnostic(prev => [...prev, treatment])}
                onOngoingSelect={(treatment) => setSelectedOngoing(prev => [...prev, treatment])}
                onConfirmDiagnostic={handleDiagnosticConfirm}
                onConfirmOngoing={handleOngoingConfirm}
                showOngoing={showOngoing}
              />
            )}

            {currentStep === 'medicine-mapping' && (
              <MedicineMapping
                medicines={medicines}
                selectedMedicines={selectedMedicines}
                onMedicineSelect={(medicine) => setSelectedMedicines(prev => [...prev, medicine])}
                onConfirm={handleMedicineConfirm}
                planType={planType}
                onPlanTypeChange={setPlanType}
              />
            )}

            {currentStep === 'notes-motivation' && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Additional Notes</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chronic Registration Notes:
                    </label>
                    <textarea
                      value={chronicRegistrationNotes}
                      onChange={(e) => setChronicRegistrationNotes(e.target.value)}
                      placeholder="Enter chronic registration notes..."
                      className="input-field h-32 resize-none"
                    />
                  </div>
                  <button
                    onClick={handleNotesConfirm}
                    className="btn-primary"
                  >
                    Complete Case
                  </button>
                </div>
              </div>
            )}

            {currentStep === 'case-summary' && currentCase && (
              <CaseSummary
                caseData={currentCase}
                onExportPDF={handleExportPDF}
                onViewCase={() => setCurrentStep('case-management')}
              />
            )}

            {currentStep === 'case-management' && (
              <CaseManagement
                cases={cases}
                onViewCase={handleViewCase}
                onDeleteCase={handleDeleteCase}
                onExportAll={handleExportAllCases}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function getStepNumber(step: WorkflowStep): number {
  const stepMap: Record<WorkflowStep, number> = {
    'note-entry': 1,
    'condition-confirmation': 2,
    'icd-mapping': 3,
    'diagnostic-treatment': 4,
    'ongoing-treatment': 5,
    'medicine-mapping': 6,
    'notes-motivation': 7,
    'case-summary': 8,
    'case-management': 0
  };
  return stepMap[step];
}
