import { DataTableColumnLabelsTypes } from "@/app/types";

export const ColumnLabels: DataTableColumnLabelsTypes[] = [
  {
    name: "#",
    id: "number",
    hasChevronDown: false,
    active: false,
    category: "",
  },

  {
    name: "Collection",
    id: "collection",
    hasChevronDown: false,
    active: false,
    category: "",
  },
  {
    name: "True Volume",
    id: "true-volume",
    hasChevronDown: true,
    active: true,
    category: "True Volumes",
  },
  {
    name: "True V %",
    id: "true-volume-percentage",
    hasChevronDown: true,
    active: false,
    category: "True Volume Percentages",
  },
  {
    name: "Total Volume",
    id: "total-volume",
    hasChevronDown: true,
    active: false,
    category: "Total Volumes",
  },
  {
    name: "Loans",
    id: "loans",
    hasChevronDown: true,
    active: false,
    category: "Loan Volumes",
  },
  {
    name: "Revenue",
    id: "revenue",
    hasChevronDown: true,
    active: false,
    category: "Revenue Volumes",
  },
  {
    name: "Fake",
    id: "fake",
    hasChevronDown: true,
    active: false,
    category: "Fake Volumes",
  },
  {
    name: "True Sales Count",
    id: "sales",
    hasChevronDown: true,
    active: false,
    category: "True Sales",
  },
  {
    name: "Total Sales Count",
    id: "total-sales-count",
    hasChevronDown: true,
    active: false,
    category: "Total Sales Counts",
  },
];
