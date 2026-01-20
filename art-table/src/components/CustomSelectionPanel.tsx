import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

interface Props {
  visible: boolean;
  onHide: () => void;
  onCustomSelect: (count: number) => void;
  maxSelection: number;
}

const CustomSelectionPanel: React.FC<Props> = ({
  visible,
  onHide,
  onCustomSelect,
  maxSelection,
}) => {
  const [count, setCount] = useState<number>(1);

  const handleSelect = () => {
    if (count > 0 && count <= maxSelection) {
      onCustomSelect(count);
      onHide();
    } else {
      alert(`Enter a number between 1 and ${maxSelection}`);
    }
  };

  return (
    <Dialog
      header="Custom Row Selection"
      visible={visible}
      onHide={onHide}
      modal
      style={{ width: '400px' }}
    >
      <div className="p-fluid">
        <label className="mb-2 block">
          Number of rows (max {maxSelection})
        </label>

        <InputNumber
          value={count}
          onValueChange={(e) => setCount(e.value || 1)}
          min={1}
          max={maxSelection}
          showButtons
        />

        <small className="block mt-2">
          Selects rows from the current page only
        </small>

        <div className="flex justify-content-end mt-4 gap-2">
          <Button label="Cancel" onClick={onHide} className="p-button-text" />
          <Button label="Select" onClick={handleSelect} />
        </div>
      </div>
    </Dialog>
  );
};

export default CustomSelectionPanel;
