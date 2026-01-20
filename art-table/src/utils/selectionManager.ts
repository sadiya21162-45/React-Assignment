export interface SelectionState {
  selectedIds: Set<number>;
  allSelectedMode: boolean;
  deselectedIds: Set<number>;
}

export class SelectionManager {
  private state: SelectionState = {
    selectedIds: new Set(),
    deselectedIds: new Set(),
    allSelectedMode: false,
  };

  toggleSelection(id: number) {
    if (this.state.allSelectedMode) {
      this.state.deselectedIds.has(id)
        ? this.state.deselectedIds.delete(id)
        : this.state.deselectedIds.add(id);
    } else {
      this.state.selectedIds.has(id)
        ? this.state.selectedIds.delete(id)
        : this.state.selectedIds.add(id);
    }
  }

  isSelected(id: number): boolean {
    return this.state.allSelectedMode
      ? !this.state.deselectedIds.has(id)
      : this.state.selectedIds.has(id);
  }

  selectPage(ids: number[]) {
    ids.forEach(id => this.state.selectedIds.add(id));
  }

  deselectPage(ids: number[]) {
    ids.forEach(id => this.state.selectedIds.delete(id));
  }

  toggleAllMode() {
    this.state.allSelectedMode = !this.state.allSelectedMode;
    this.state.selectedIds.clear();
    this.state.deselectedIds.clear();
  }

  customSelect(count: number, ids: number[]) {
    this.state.selectedIds.clear();
    ids.slice(0, count).forEach(id => this.state.selectedIds.add(id));
  }

  getSelectedCount(totalItems: number): number {
    return this.state.allSelectedMode
      ? totalItems - this.state.deselectedIds.size
      : this.state.selectedIds.size;
  }

  getState() {
    return this.state;
  }
}
