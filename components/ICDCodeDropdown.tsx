'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ICDCodeDropdownProps {
  icdCodes: Array<{
    code: string;
    description: string;
  }>;
  selectedCodes: string[];
  onCodeSelect: (code: string) => void;
  onCodeDeselect: (code: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const ICDCodeDropdown: React.FC<ICDCodeDropdownProps> = ({
  icdCodes,
  selectedCodes,
  onCodeSelect,
  onCodeDeselect,
  isOpen,
  onToggle
}) => {
  return (
    <div className="w-full max-w-md">
      <button
        onClick={onToggle}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-between hover:border-primary-500 transition-colors"
      >
        <span className="text-gray-900 font-medium">Process Note</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {icdCodes.map((icdCode, index) => {
            const isSelected = selectedCodes.includes(icdCode.code);
            return (
              <div
                key={icdCode.code}
                className={`px-4 py-3 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors ${
                  isSelected ? 'bg-primary-50 border-primary-200' : ''
                }`}
                onClick={() => isSelected ? onCodeDeselect(icdCode.code) : onCodeSelect(icdCode.code)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-4 h-4 rounded border-2 mt-1 flex items-center justify-center ${
                    isSelected ? 'bg-primary-500 border-primary-500' : 'border-gray-300'
                  }`}>
                    {isSelected && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{icdCode.code}</div>
                    <div className="text-sm text-gray-600 mt-1">{icdCode.description}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
