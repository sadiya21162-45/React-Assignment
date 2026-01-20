export interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
  thumbnail?: {
    lqip: string;
    alt_text: string;
  };
}

export interface ApiResponse {
  data: Artwork[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
    next_url: string | null;
    prev_url: string | null;
  };
}

/**
 * Used ONLY for UI / persistence
 * Convert to Set inside utils
 */
export interface SelectionState {
  selectedIds: number[];
}
