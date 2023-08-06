import { DataTableColumnLabelsTypes } from "@/app/types";

export const ColumnLabels: DataTableColumnLabelsTypes[] = [
  {
    name: "#",
    id: "number",
    hasChevronDown: false,
    active: false,
  },

  {
    name: "Collection",
    id: "collection",
    hasChevronDown: false,
    active: false,
  },
  {
    name: "True Volume",
    id: "true-volume",
    hasChevronDown: true,
    active: true,
  },
  {
    name: "True V %",
    id: "true-volume-percentage",
    hasChevronDown: true,
    active: false,
  },
  {
    name: "Total Volume",
    id: "total-volume",
    hasChevronDown: true,
    active: false,
  },
  {
    name: "True Sales",
    id: "sales",
    hasChevronDown: true,
    active: false,
  },
  {
    name: "Loans",
    id: "loans",
    hasChevronDown: true,
    active: false,
  },
  {
    name: "Revenue",
    id: "revenue",
    hasChevronDown: true,
    active: false,
  },
  {
    name: "Fake",
    id: "fake",
    hasChevronDown: true,
    active: false,
  },
  {
    name: "Total Sales Count",
    id: "total-sales-count",
    hasChevronDown: true,
    active: false,
  },
];
