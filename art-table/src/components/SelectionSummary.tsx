import React from 'react';
import { Chip } from 'primereact/chip';

interface SelectionSummaryProps {
  selectedCount: number;
  totalItems: number;
  allSelectedMode: boolean;
}

const SelectionSummary: React.FC<SelectionSummaryProps> = ({
  selectedCount,
  totalItems,
  allSelectedMode,
}) => {
  return (
    <div className="flex align-items-center gap-3 mb-3">
      <Chip
        label={`Selected: ${selectedCount} / ${totalItems}`}
        className="bg-primary text-white"
      />
      {allSelectedMode && (
        <Chip
          label="All Mode Active"
          icon="pi pi-check-circle"
          className="bg-green-500 text-white"
        />
      )}
      {selectedCount > 0 && (
        <span className="text-sm text-gray-600">
          {allSelectedMode
            ? "All items selected except explicitly deselected"
            : "Individual selection mode"}
        </span>
      )}
    </div>
  );
};

export default SelectionSummary;