export type StateRow = {
  abbr: string;
  name: string;
  /** Illustrative per-person meal cap for demo enforcement (not legal advice). */
  demoPerPersonCapUsd: number;
  /**
   * Demo-only modeled average F&B per transaction for UI exploration.
   * National CMS aggregates are cited separately; state-level CMS does not publish this uniformly.
   */
  modeledAvgFnbPerTxnUsd: number;
};

/** Synthetic + modeled fields for product visualization. See footer for CMS source of record-level aggregates. */
export const STATE_ROWS: StateRow[] = [
  { abbr: "AL", name: "Alabama", demoPerPersonCapUsd: 95, modeledAvgFnbPerTxnUsd: 62 },
  { abbr: "AK", name: "Alaska", demoPerPersonCapUsd: 115, modeledAvgFnbPerTxnUsd: 88 },
  { abbr: "AZ", name: "Arizona", demoPerPersonCapUsd: 102, modeledAvgFnbPerTxnUsd: 71 },
  { abbr: "AR", name: "Arkansas", demoPerPersonCapUsd: 98, modeledAvgFnbPerTxnUsd: 64 },
  { abbr: "CA", name: "California", demoPerPersonCapUsd: 108, modeledAvgFnbPerTxnUsd: 78 },
  { abbr: "CO", name: "Colorado", demoPerPersonCapUsd: 104, modeledAvgFnbPerTxnUsd: 72 },
  { abbr: "CT", name: "Connecticut", demoPerPersonCapUsd: 100, modeledAvgFnbPerTxnUsd: 76 },
  { abbr: "DE", name: "Delaware", demoPerPersonCapUsd: 99, modeledAvgFnbPerTxnUsd: 70 },
  { abbr: "DC", name: "District of Columbia", demoPerPersonCapUsd: 105, modeledAvgFnbPerTxnUsd: 82 },
  { abbr: "FL", name: "Florida", demoPerPersonCapUsd: 101, modeledAvgFnbPerTxnUsd: 69 },
  { abbr: "GA", name: "Georgia", demoPerPersonCapUsd: 97, modeledAvgFnbPerTxnUsd: 66 },
  { abbr: "HI", name: "Hawaii", demoPerPersonCapUsd: 118, modeledAvgFnbPerTxnUsd: 91 },
  { abbr: "ID", name: "Idaho", demoPerPersonCapUsd: 96, modeledAvgFnbPerTxnUsd: 61 },
  { abbr: "IL", name: "Illinois", demoPerPersonCapUsd: 103, modeledAvgFnbPerTxnUsd: 74 },
  { abbr: "IN", name: "Indiana", demoPerPersonCapUsd: 109, modeledAvgFnbPerTxnUsd: 68 },
  { abbr: "IA", name: "Iowa", demoPerPersonCapUsd: 94, modeledAvgFnbPerTxnUsd: 63 },
  { abbr: "KS", name: "Kansas", demoPerPersonCapUsd: 93, modeledAvgFnbPerTxnUsd: 60 },
  { abbr: "KY", name: "Kentucky", demoPerPersonCapUsd: 96, modeledAvgFnbPerTxnUsd: 65 },
  { abbr: "LA", name: "Louisiana", demoPerPersonCapUsd: 99, modeledAvgFnbPerTxnUsd: 67 },
  { abbr: "ME", name: "Maine", demoPerPersonCapUsd: 101, modeledAvgFnbPerTxnUsd: 71 },
  { abbr: "MD", name: "Maryland", demoPerPersonCapUsd: 102, modeledAvgFnbPerTxnUsd: 75 },
  { abbr: "MA", name: "Massachusetts", demoPerPersonCapUsd: 104, modeledAvgFnbPerTxnUsd: 79 },
  { abbr: "MI", name: "Michigan", demoPerPersonCapUsd: 100, modeledAvgFnbPerTxnUsd: 70 },
  { abbr: "MN", name: "Minnesota", demoPerPersonCapUsd: 103, modeledAvgFnbPerTxnUsd: 73 },
  { abbr: "MS", name: "Mississippi", demoPerPersonCapUsd: 92, modeledAvgFnbPerTxnUsd: 58 },
  { abbr: "MO", name: "Missouri", demoPerPersonCapUsd: 98, modeledAvgFnbPerTxnUsd: 66 },
  { abbr: "MT", name: "Montana", demoPerPersonCapUsd: 97, modeledAvgFnbPerTxnUsd: 64 },
  { abbr: "NE", name: "Nebraska", demoPerPersonCapUsd: 95, modeledAvgFnbPerTxnUsd: 62 },
  { abbr: "NV", name: "Nevada", demoPerPersonCapUsd: 106, modeledAvgFnbPerTxnUsd: 77 },
  { abbr: "NH", name: "New Hampshire", demoPerPersonCapUsd: 102, modeledAvgFnbPerTxnUsd: 74 },
  { abbr: "NJ", name: "New Jersey", demoPerPersonCapUsd: 103, modeledAvgFnbPerTxnUsd: 77 },
  { abbr: "NM", name: "New Mexico", demoPerPersonCapUsd: 99, modeledAvgFnbPerTxnUsd: 66 },
  { abbr: "NY", name: "New York", demoPerPersonCapUsd: 107, modeledAvgFnbPerTxnUsd: 81 },
  { abbr: "NC", name: "North Carolina", demoPerPersonCapUsd: 99, modeledAvgFnbPerTxnUsd: 69 },
  { abbr: "ND", name: "North Dakota", demoPerPersonCapUsd: 96, modeledAvgFnbPerTxnUsd: 63 },
  { abbr: "OH", name: "Ohio", demoPerPersonCapUsd: 101, modeledAvgFnbPerTxnUsd: 70 },
  { abbr: "OK", name: "Oklahoma", demoPerPersonCapUsd: 94, modeledAvgFnbPerTxnUsd: 61 },
  { abbr: "OR", name: "Oregon", demoPerPersonCapUsd: 105, modeledAvgFnbPerTxnUsd: 76 },
  { abbr: "PA", name: "Pennsylvania", demoPerPersonCapUsd: 102, modeledAvgFnbPerTxnUsd: 73 },
  { abbr: "RI", name: "Rhode Island", demoPerPersonCapUsd: 100, modeledAvgFnbPerTxnUsd: 75 },
  { abbr: "SC", name: "South Carolina", demoPerPersonCapUsd: 98, modeledAvgFnbPerTxnUsd: 67 },
  { abbr: "SD", name: "South Dakota", demoPerPersonCapUsd: 95, modeledAvgFnbPerTxnUsd: 62 },
  { abbr: "TN", name: "Tennessee", demoPerPersonCapUsd: 99, modeledAvgFnbPerTxnUsd: 68 },
  { abbr: "TX", name: "Texas", demoPerPersonCapUsd: 100, modeledAvgFnbPerTxnUsd: 71 },
  { abbr: "UT", name: "Utah", demoPerPersonCapUsd: 103, modeledAvgFnbPerTxnUsd: 72 },
  { abbr: "VT", name: "Vermont", demoPerPersonCapUsd: 101, modeledAvgFnbPerTxnUsd: 72 },
  { abbr: "VA", name: "Virginia", demoPerPersonCapUsd: 104, modeledAvgFnbPerTxnUsd: 76 },
  { abbr: "WA", name: "Washington", demoPerPersonCapUsd: 106, modeledAvgFnbPerTxnUsd: 78 },
  { abbr: "WV", name: "West Virginia", demoPerPersonCapUsd: 94, modeledAvgFnbPerTxnUsd: 60 },
  { abbr: "WI", name: "Wisconsin", demoPerPersonCapUsd: 102, modeledAvgFnbPerTxnUsd: 69 },
  { abbr: "WY", name: "Wyoming", demoPerPersonCapUsd: 98, modeledAvgFnbPerTxnUsd: 65 },
];

export const STATE_BY_NAME = new Map(
  STATE_ROWS.map((row) => [row.name.toLowerCase(), row]),
);

/** Choropleth fills for light UI (readable on off-white map canvas). */
export function colorForCap(cap: number): string {
  if (cap <= 96) return "#D6EEF7";
  if (cap <= 102) return "#B8E3F3";
  if (cap <= 108) return "#8FD4EC";
  return "#73C7E3";
}

/** Choropleth for dark map canvas — slightly brighter steps for contrast. */
export function colorForCapDark(cap: number): string {
  if (cap <= 96) return "#1a3a52";
  if (cap <= 102) return "#234a68";
  if (cap <= 108) return "#2f5f82";
  return "#3d7aa3";
}
