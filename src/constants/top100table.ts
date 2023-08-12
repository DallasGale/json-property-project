import { PropertyTableColumnLabelsTypes } from "@/app/types";

export const ColumnLabels: PropertyTableColumnLabelsTypes[] = [
  {
    name: "Address",
    id: "address",
    hasChevronDown: false,
    active: false,
  },
  {
    name: "Variance",
    id: "variance",
    hasChevronDown: true,
    active: true,
  },
  {
    name: "Indicative Price",
    id: "indicative-price",
    hasChevronDown: true,
    active: false,
  },
  {
    name: "Selling Price",
    id: "selling-price",
    hasChevronDown: true,
    active: false,
  },
];
