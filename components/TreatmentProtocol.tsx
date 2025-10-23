'use client';

import React from 'react';
import { CheckCircle, Circle, Upload, FileText } from 'lucide-react';

interface TreatmentProtocolProps {
  treatments: Array<{
    diagnosticBasket: string;
    diagnosticCode: string;
    diagnosticCoverage: number;
    ongoingBasket: string;
    ongoingCode: string;
    ongoingCoverage: number;
    specialistsCovered: string;
  }>;
  selectedDiagnostic: string[];
  selectedOngoing: string[];
  onDiagnosticSelect: (treatment: string) => void;
  onOngoingSelect: (treatment: string) => void;
  onConfirmDiagnostic: () => void;
  onConfirmOngoing: () => void;
  showOngoing: boolean;
}

export const TreatmentProtocol: React.FC<TreatmentProtocolProps> = ({
  treatments,
  selectedDiagnostic,
  selectedOngoing,
  onDiagnosticSelect,
  onOngoingSelect,
  onConfirmDiagnostic,
  onConfirmOngoing,
  showOngoing
}) => {
  return (
    <div className="space-y-6">
      {/* Diagnostic Basket */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Diagnostic Basket</h3>
        <p className="text-gray-600 mb-4">
          Select the diagnostic tests and procedures for this condition:
        </p>

        <div className="space-y-3 mb-6">
          {treatments.map((treatment, index) => (
            <div
              key={`diagnostic-${index}`}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedDiagnostic.includes(treatment.diagnosticBasket)
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onDiagnosticSelect(treatment.diagnosticBasket)}
            >
              <div className="flex items-center gap-3">
                {selectedDiagnostic.includes(treatment.diagnosticBasket) ? (
                  <CheckCircle className="w-6 h-6 text-primary-500" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400" />
                )}
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{treatment.diagnosticBasket}</div>
                  <div className="text-sm text-gray-600">
                    Code: {treatment.diagnosticCode} | Coverage: {treatment.diagnosticCoverage}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onConfirmDiagnostic}
          disabled={selectedDiagnostic.length === 0}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm Diagnostic Tests
        </button>
      </div>

      {/* Ongoing Management Basket */}
      {showOngoing && (
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Ongoing Management Basket</h3>
          <p className="text-gray-600 mb-4">
            Select the ongoing management procedures for this condition:
          </p>

          <div className="space-y-3 mb-6">
            {treatments.map((treatment, index) => (
              <div
                key={`ongoing-${index}`}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedOngoing.includes(treatment.ongoingBasket)
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onOngoingSelect(treatment.ongoingBasket)}
              >
                <div className="flex items-center gap-3">
                  {selectedOngoing.includes(treatment.ongoingBasket) ? (
                    <CheckCircle className="w-6 h-6 text-primary-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{treatment.ongoingBasket}</div>
                    <div className="text-sm text-gray-600">
                      Code: {treatment.ongoingCode} | Coverage: {treatment.ongoingCoverage}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Specialists: {treatment.specialistsCovered}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onConfirmOngoing}
            disabled={selectedOngoing.length === 0}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Ongoing Management
          </button>
        </div>
      )}

      {/* Documentation Section */}
      {showOngoing && (
        <div className="card">
          <h3 className="text-xl font-semibold mb-4">Treatment Documentation</h3>
          <p className="text-gray-600 mb-4">
            Upload images or add notes for each selected treatment:
          </p>

          <div className="space-y-4">
            {[...selectedDiagnostic, ...selectedOngoing].map((treatment, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="font-medium text-gray-900 mb-3">{treatment}</div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Upload className="w-4 h-4" />
                    Upload Image
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <FileText className="w-4 h-4" />
                    Add Notes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
