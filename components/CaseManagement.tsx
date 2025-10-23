'use client';

import React, { useState } from 'react';
import { CaseData } from '@/lib/types';
import { PDFExportService } from '@/lib/pdfExportService';
import { Calendar, User, FileText, Download, Eye, Trash2 } from 'lucide-react';

interface CaseManagementProps {
  cases: CaseData[];
  onViewCase: (caseData: CaseData) => void;
  onDeleteCase: (caseId: string) => void;
  onExportAll: () => void;
}

export const CaseManagement: React.FC<CaseManagementProps> = ({
  cases,
  onViewCase,
  onDeleteCase,
  onExportAll
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCondition, setFilterCondition] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'condition'>('date');

  // Filter and sort cases
  const filteredCases = cases
    .filter(caseData => {
      const matchesSearch = caseData.patientNotes.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           caseData.confirmedCondition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCondition = filterCondition === 'all' || 
                              caseData.confirmedCondition.toLowerCase().includes(filterCondition.toLowerCase());
      return matchesSearch && matchesCondition;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return b.createdAt.getTime() - a.createdAt.getTime();
      } else {
        return a.confirmedCondition.localeCompare(b.confirmedCondition);
      }
    });

  const uniqueConditions = Array.from(new Set(cases.map(c => c.confirmedCondition)));

  const handleExportCase = (caseData: CaseData) => {
    PDFExportService.exportCaseSummary(caseData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Case Management</h2>
        <button
          onClick={onExportAll}
          className="btn-primary flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export All Cases
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Cases
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by notes or condition..."
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Condition
            </label>
            <select
              value={filterCondition}
              onChange={(e) => setFilterCondition(e.target.value)}
              className="input-field"
              aria-label="Filter by Condition"
            >
              <option value="all">All Conditions</option>
              {uniqueConditions.map(condition => (
                <option key={condition} value={condition}>{condition}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'condition')}
              className="input-field"
              aria-label="Sort by"
            >
              <option value="date">Date Created</option>
              <option value="condition">Condition</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {filteredCases.length === 0 ? (
          <div className="card text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No cases found</h3>
            <p className="text-gray-600">
              {cases.length === 0 
                ? "You haven't created any cases yet. Start by creating a new case."
                : "No cases match your current filters. Try adjusting your search criteria."
              }
            </p>
          </div>
        ) : (
          filteredCases.map((caseData) => (
            <div key={caseData.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {caseData.confirmedCondition}
                    </h3>
                    <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">
                      {caseData.id}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {caseData.patientNotes.substring(0, 150)}
                    {caseData.patientNotes.length > 150 && '...'}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{caseData.createdAt.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      <span>{caseData.selectedIcdCodes.length} ICD codes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{caseData.selectedMedicines.length} medications</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => onViewCase(caseData)}
                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="View Case"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={() => handleExportCase(caseData)}
                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Export PDF"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={() => onDeleteCase(caseData.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Case"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Statistics */}
      {cases.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{cases.length}</div>
              <div className="text-sm text-gray-600">Total Cases</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{uniqueConditions.length}</div>
              <div className="text-sm text-gray-600">Unique Conditions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {Math.round(cases.reduce((acc, c) => acc + c.selectedIcdCodes.length, 0) / cases.length)}
              </div>
              <div className="text-sm text-gray-600">Avg ICD Codes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {Math.round(cases.reduce((acc, c) => acc + c.selectedMedicines.length, 0) / cases.length)}
              </div>
              <div className="text-sm text-gray-600">Avg Medications</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
