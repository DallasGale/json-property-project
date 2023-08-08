import { easings } from "@react-spring/web";

export const animation = {
  from: { y: 100, opacity: 0 },
  to: { y: 0, opacity: 1 },
  config: {
    tension: 90,
    friction: 16,
    duration: 750,
    easing: easings.easeInOutCubic,
  },
};

export const legendLabels = [
  {
    color: "accent-green",
    name: "Only Bought",
    id: "only-bought",
  },
  {
    color: "accent-red",
    name: "Only Sold",
    id: "only-sold",
  },
  {
    color: "accent-purple",
    name: "Bought and Sold",
    id: "bought-and-sold",
  },
];
