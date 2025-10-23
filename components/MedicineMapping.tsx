'use client';

import React, { useState } from 'react';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';

interface MedicineMappingProps {
  medicines: Array<{
    medicineClass: string;
    activeIngredient: string;
    medicineNameStrength: string;
    cdaCorePrioritySaver: string;
    cdaExecutiveComprehensive: string;
  }>;
  selectedMedicines: string[];
  onMedicineSelect: (medicine: string) => void;
  onConfirm: () => void;
  planType: string;
  onPlanTypeChange: (planType: string) => void;
}

export const MedicineMapping: React.FC<MedicineMappingProps> = ({
  medicines,
  selectedMedicines,
  onMedicineSelect,
  onConfirm,
  planType,
  onPlanTypeChange
}) => {
  const [showMotivation, setShowMotivation] = useState(false);
  const [motivationNote, setMotivationNote] = useState('');

  const planTypes = [
    'KeyCare',
    'Core',
    'Priority', 
    'Saver',
    'Executive',
    'Comprehensive'
  ];

  const isExcluded = (medicine: any) => {
    return medicine.medicineNameStrength.includes('Not available on KeyCare plans') ||
           medicine.medicineNameStrength.includes('Only Executive and Comprehensive plans');
  };

  const getCDAValue = (medicine: any) => {
    if (['Executive', 'Comprehensive'].includes(planType)) {
      return medicine.cdaExecutiveComprehensive;
    }
    return medicine.cdaCorePrioritySaver;
  };

  return (
    <div className="space-y-6">
      {/* Plan Filter */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Medication Mapping</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Medical Aid Plan:
          </label>
          <select
            value={planType}
            onChange={(e) => onPlanTypeChange(e.target.value)}
            className="input-field"
            aria-label="Select Medical Aid Plan"
          >
            {planTypes.map(plan => (
              <option key={plan} value={plan}>{plan}</option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          {medicines.map((medicine, index) => {
            const isSelected = selectedMedicines.includes(medicine.medicineNameStrength);
            const excluded = isExcluded(medicine);
            const cdaValue = getCDAValue(medicine);

            return (
              <div
                key={index}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50'
                    : excluded
                    ? 'border-red-200 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onMedicineSelect(medicine.medicineNameStrength)}
              >
                <div className="flex items-start gap-3">
                  {isSelected ? (
                    <CheckCircle className="w-6 h-6 text-primary-500 mt-1" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400 mt-1" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{medicine.medicineNameStrength}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      <div>Class: {medicine.medicineClass}</div>
                      <div>Active Ingredient: {medicine.activeIngredient}</div>
                      <div className="font-medium text-primary-600">
                        CDA ({planType}): {cdaValue}
                      </div>
                    </div>
                    {excluded && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>Excluded from {planType} plans</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => {
            const hasExcluded = selectedMedicines.some(med => 
              medicines.find(m => m.medicineNameStrength === med) && 
              isExcluded(medicines.find(m => m.medicineNameStrength === med)!)
            );
            if (hasExcluded) {
              setShowMotivation(true);
            } else {
              onConfirm();
            }
          }}
          disabled={selectedMedicines.length === 0}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          Confirm Medication Selection
        </button>
      </div>

      {/* Motivation Letter */}
      {showMotivation && (
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Motivation Letter</h3>
          <p className="text-gray-600 mb-4">
            Some selected medications are excluded from your plan. Please provide a motivation letter:
          </p>
          
          <textarea
            value={motivationNote}
            onChange={(e) => setMotivationNote(e.target.value)}
            placeholder="Enter motivation letter for scheme submission..."
            className="input-field h-32 resize-none"
          />
          
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setShowMotivation(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                setShowMotivation(false);
              }}
              disabled={!motivationNote.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Motivation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
