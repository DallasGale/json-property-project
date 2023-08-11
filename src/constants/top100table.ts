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
    category: "Alphabetically",
  },
  {
    name: "True Volume",
    id: "true-volume",
    hasChevronDown: true,
    active: true,
    category: "True Volume",
  },
  {
    name: "True V %",
    id: "true-volume-percentage",
    hasChevronDown: true,
    active: false,
    category: "True Volume Percentage",
  },
  {
    name: "Total Volume",
    id: "total-volume",
    hasChevronDown: true,
    active: false,
    category: "Total Volume",
  },
  {
    name: "Loans",
    id: "loans",
    hasChevronDown: true,
    active: false,
    category: "Loan Volume",
  },
  {
    name: "Revenue",
    id: "revenue",
    hasChevronDown: true,
    active: false,
    category: "Revenue Volume",
  },
  {
    name: "Fake",
    id: "fake",
    hasChevronDown: true,
    active: false,
    category: "Fake Volume",
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
    category: "Total Sales Count",
  },
];
