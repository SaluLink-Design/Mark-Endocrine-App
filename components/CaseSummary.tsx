'use client';

import React from 'react';
import { Download, Eye, Calendar, User } from 'lucide-react';
import { CaseData } from '@/lib/types';

interface CaseSummaryProps {
  caseData: CaseData;
  onExportPDF: () => void;
  onViewCase: () => void;
}

export const CaseSummary: React.FC<CaseSummaryProps> = ({
  caseData,
  onExportPDF,
  onViewCase
}) => {
  return (
    <div className="space-y-6">
      {/* Case Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Case Summary</h2>
          <div className="flex gap-3">
            <button
              onClick={onViewCase}
              className="btn-secondary flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View Case
            </button>
            <button
              onClick={onExportPDF}
              className="btn-primary flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">Created:</span>
            <span className="font-medium">{caseData.createdAt.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">Updated:</span>
            <span className="font-medium">{caseData.updatedAt.toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Original Notes */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-3">Original Specialist Notes</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 whitespace-pre-wrap">{caseData.patientNotes}</p>
        </div>
      </div>

      {/* Confirmed Condition */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-3">Confirmed Condition</h3>
        <div className="bg-primary-50 p-4 rounded-lg border border-primary-200">
          <p className="text-primary-800 font-medium">{caseData.confirmedCondition}</p>
        </div>
      </div>

      {/* ICD Codes */}
      {caseData.selectedIcdCodes.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-3">Selected ICD-10 Codes</h3>
          <div className="space-y-2">
            {caseData.selectedIcdCodes.map((code, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <span className="font-mono text-sm font-medium">{code}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Diagnostic Procedures */}
      {caseData.diagnosticProcedures.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-3">Diagnostic Procedures</h3>
          <div className="space-y-3">
            {caseData.diagnosticProcedures.map((procedure, index) => (
              <div key={index} className="border border-gray-200 p-3 rounded-lg">
                <div className="font-medium text-gray-900">{procedure.name}</div>
                <div className="text-sm text-gray-600">Code: {procedure.code}</div>
                <div className="text-sm text-gray-600">Coverage: {procedure.coverage}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ongoing Management */}
      {caseData.ongoingProcedures.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-3">Ongoing Management Procedures</h3>
          <div className="space-y-3">
            {caseData.ongoingProcedures.map((procedure, index) => (
              <div key={index} className="border border-gray-200 p-3 rounded-lg">
                <div className="font-medium text-gray-900">{procedure.name}</div>
                <div className="text-sm text-gray-600">Code: {procedure.code}</div>
                <div className="text-sm text-gray-600">Coverage: {procedure.coverage}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Medications */}
      {caseData.selectedMedicines.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-3">Selected Medications</h3>
          <div className="space-y-3">
            {caseData.selectedMedicines.map((medicine, index) => (
              <div key={index} className="border border-gray-200 p-3 rounded-lg">
                <div className="font-medium text-gray-900">{medicine.name}</div>
                <div className="text-sm text-gray-600">Class: {medicine.class}</div>
                <div className="text-sm text-gray-600">Active Ingredient: {medicine.activeIngredient}</div>
                <div className="text-sm text-primary-600 font-medium">CDA: {medicine.cda}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      {(caseData.motivationNotes || caseData.chronicRegistrationNotes) && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-3">Additional Notes</h3>
          {caseData.motivationNotes && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Motivation Letter:</h4>
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <p className="text-gray-700 whitespace-pre-wrap">{caseData.motivationNotes}</p>
              </div>
            </div>
          )}
          {caseData.chronicRegistrationNotes && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Chronic Registration Notes:</h4>
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="text-gray-700 whitespace-pre-wrap">{caseData.chronicRegistrationNotes}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
