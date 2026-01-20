export const toggleRow = (
  selectedIds: Set<number>,
  id: number
): Set<number> => {
  const next = new Set(selectedIds);
  next.has(id) ? next.delete(id) : next.add(id);
  return next;
};

export const selectPageRows = (
  selectedIds: Set<number>,
  pageIds: number[]
): Set<number> => {
  const next = new Set(selectedIds);
  pageIds.forEach(id => next.add(id));
  return next;
};

export const deselectPageRows = (
  selectedIds: Set<number>,
  pageIds: number[]
): Set<number> => {
  const next = new Set(selectedIds);
  pageIds.forEach(id => next.delete(id));
  return next;
};

export const customSelectFromPage = (
  selectedIds: Set<number>,
  pageIds: number[],
  count: number
): Set<number> => {
  const next = new Set(selectedIds);
  const limit = Math.min(count, pageIds.length);

  for (let i = 0; i < limit; i++) {
    next.add(pageIds[i]);
  }

  return next;
};
