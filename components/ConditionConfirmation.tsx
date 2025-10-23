'use client';

import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface ConditionConfirmationProps {
  extractedConditions: Array<{
    condition: string;
    confidence: number;
  }>;
  selectedCondition: string | null;
  onConditionSelect: (condition: string) => void;
  onConfirm: () => void;
}

export const ConditionConfirmation: React.FC<ConditionConfirmationProps> = ({
  extractedConditions,
  selectedCondition,
  onConditionSelect,
  onConfirm
}) => {
  return (
    <div className="card max-w-2xl">
      <h3 className="text-xl font-semibold mb-4">Confirm Condition</h3>
      <p className="text-gray-600 mb-6">
        Authi 1.0 has identified the following conditions from your notes. Please select the correct one:
      </p>

      <div className="space-y-3 mb-6">
        {extractedConditions.map((condition, index) => (
          <div
            key={condition.condition}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedCondition === condition.condition
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onConditionSelect(condition.condition)}
          >
            <div className="flex items-center gap-3">
              {selectedCondition === condition.condition ? (
                <CheckCircle className="w-6 h-6 text-primary-500" />
              ) : (
                <Circle className="w-6 h-6 text-gray-400" />
              )}
              <div className="flex-1">
                <div className="font-medium text-gray-900">{condition.condition}</div>
                <div className="text-sm text-gray-600">
                  Confidence: {Math.round(condition.confidence * 100)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onConfirm}
        disabled={!selectedCondition}
        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Confirm Condition
      </button>
    </div>
  );
};
