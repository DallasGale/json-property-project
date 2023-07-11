import { LegendFormatTypes } from "@/app/types";
interface LegendProps {
  labels: LabelTypes[];
  modifierClass?: string;
  legendFormat?: LegendFormatTypes;
  onClick: (e: string) => void;
}

type LabelTypes = {
  color: string;
  name: string;
  id: string;
};
const Legend: React.FC<LegendProps> = ({
  modifierClass,
  labels,
  onClick,
  legendFormat = "horizontal",
}) => {
  return (
    <div className={`chart__legend ${modifierClass}`}>
      <form className={`legend__format legend__format--${legendFormat}`}>
        {labels.map(({ name, color, id }) => {
          return (
            <div key={id}>
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
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default Legend;
