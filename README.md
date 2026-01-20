# React Artworks Data Table (Art Institute of Chicago)

A React + TypeScript application that displays artwork data from the Art Institute of Chicago API using PrimeReact DataTable with server-side pagination and persistent row selection.

This project is built as part of a React internship assignment and demonstrates advanced UI features like server-side pagination, persistent selection across pages, and custom selection panel.

---

## 🚀 Features

### ✅ Data Table
- Displays artwork data with required fields:
  - `title`
  - `place_of_origin`
  - `artist_display`
  - `inscriptions`
  - `date_start`
  - `date_end`

### ✅ Server-side Pagination
- Fetches only one page at a time from the API
- Pagination controls allow navigation between pages
- No mass data storage or prefetching

### ✅ Persistent Row Selection
- Select/deselect rows across pages
- Selections remain even after navigating between pages
- Works without storing full page data for all pages

### ✅ Custom Selection Panel
- Select custom number of rows from the current page using a dialog input
- Selection is controlled by a safe strategy to avoid prefetching

---

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- PrimeReact (DataTable, Paginator, Dialog)
- REST API (Art Institute of Chicago)

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git

# Navigate into project folder
cd <repo-name>

# Install dependencies
npm install

# Run project
npm run dev
🧩 Project Structure


src/
├── components/
│   ├── ArtworkTable.tsx
│   ├── CustomSelectionPanel.tsx
│   └── SelectionSummary.tsx
│
├── hooks/
│   └── useArtworkData.ts
│
├── utils/
│   └── selectionManager.ts
│
└── types/
    └── index.ts
