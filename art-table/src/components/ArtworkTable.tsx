import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';

import { useArtworkData } from '../hooks/useArtworkData';
import { SelectionManager } from '../utils/selectionManager';
import CustomSelectionPanel from './CustomSelectionPanel';
import SelectionSummary from './SelectionSummary';
import type { Artwork } from '../types';

const ROWS_PER_PAGE = 12;

const ArtworkTable: React.FC = () => {
  const { data, loading, error, pagination, fetchArtworks } = useArtworkData();

  const [selectionManager] = useState(() => new SelectionManager());
  const [selectedCount, setSelectedCount] = useState(0);
  const [showCustomPanel, setShowCustomPanel] = useState(false);

  const updateSelectedCount = () => {
    setSelectedCount(
      selectionManager.getSelectedCount(pagination.totalItems)
    );
  };

  const handlePageChange = (event: { page: number }) => {
    fetchArtworks(event.page + 1);
  };

  const handleRowToggle = (id: number) => {
    selectionManager.toggleSelection(id);
    updateSelectedCount();
  };

  const handleSelectPage = () => {
    selectionManager.selectPage(data.map(d => d.id));
    updateSelectedCount();
  };

  const handleDeselectPage = () => {
    selectionManager.deselectPage(data.map(d => d.id));
    updateSelectedCount();
  };

  const handleToggleAllMode = () => {
    selectionManager.toggleAllMode();
    updateSelectedCount();
  };

  const handleCustomSelect = (count: number) => {
    selectionManager.customSelect(
      count,
      data.map(d => d.id)
    );
    updateSelectedCount();
  };

  const selectionHeader = () => (
    <input
      type="checkbox"
      checked={data.every(d => selectionManager.isSelected(d.id))}
      onChange={e =>
        e.target.checked ? handleSelectPage() : handleDeselectPage()
      }
    />
  );

  const selectionBody = (row: Artwork) => (
    <input
      type="checkbox"
      checked={selectionManager.isSelected(row.id)}
      onChange={() => handleRowToggle(row.id)}
    />
  );

  const toolbarLeft = () => (
    <div className="flex gap-2">
      <Button label="Select Page" onClick={handleSelectPage} />
      <Button
        label="Deselect Page"
        onClick={handleDeselectPage}
        className="p-button-secondary"
      />
      <Button
        label={
          selectionManager.getState().allSelectedMode
            ? 'Exit All-Mode'
            : 'Enable All-Mode'
        }
        onClick={handleToggleAllMode}
        className="p-button-success"
      />
      <Button
        label="Custom Select"
        onClick={() => setShowCustomPanel(true)}
        className="p-button-info"
      />
    </div>
  );

  if (loading && !data.length) {
    return (
      <div className="flex justify-content-center mt-6">
        <ProgressSpinner />
      </div>
    );
  }

  if (error) {
    return <Message severity="error" text={error} />;
  }

  return (
    <div className="p-4">
      <h2 className="mb-3">Art Institute of Chicago – Artworks</h2>

      <SelectionSummary
        selectedCount={selectedCount}
        totalItems={pagination.totalItems}
        allSelectedMode={selectionManager.getState().allSelectedMode}
      />

      <Toolbar left={toolbarLeft} className="mb-3" />

      <DataTable value={data} responsiveLayout="scroll">
        <Column header={selectionHeader} body={selectionBody} style={{ width: 70 }} />
        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Year" />
        <Column field="date_end" header="End Year" />
      </DataTable>

      <Paginator
        className="mt-4"
        rows={ROWS_PER_PAGE}
        first={(pagination.currentPage - 1) * ROWS_PER_PAGE}
        totalRecords={pagination.totalItems}
        onPageChange={handlePageChange}
      />

      <CustomSelectionPanel
        visible={showCustomPanel}
        onHide={() => setShowCustomPanel(false)}
        onCustomSelect={handleCustomSelect}
        maxSelection={data.length}
      />
    </div>
  );
};

export default ArtworkTable;
