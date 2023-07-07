"use client";
import { useState } from "react";
interface LegendProps {
  labels: LabelTypes[];
  onClick: (e: string) => void;
}

type LabelTypes = {
  color: string;
  name: string;
  id: string;
};
const Legend: React.FC<LegendProps> = ({ labels, onClick }) => {
  return (
    <div className="chart__legend">
      <form>
        {labels.map(({ name, color, id }) => {
          return (
            <>
              <input
                className={`chart__legend-item  chart__legend-item--${color}`}
                type="checkbox"
                id={id}
                name="legend"
                value={name}
                onChange={(e) => onClick(e.currentTarget.id)}
              />
              <label htmlFor={id} className="typography__label--1">
                {name}
              </label>
            </>
          );
        })}
      </form>
    </div>
  );
};

export default Legend;
