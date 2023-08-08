import { ILegendProps, LegendFormatTypes } from "@/app/types";
import TabledDotPoints from "@components/tabledDotPoints/tabledDotPoints";
import Image from "next/image";

// Assets
import LegendIconGreen from "@assets/icons/legendIconGreen.svg";
import LegendIconRed from "@assets/icons/legendIconRed.svg";
import LegendIconYellow from "@assets/icons/legendIconYellow.svg";
import LegendIconPurple from "@assets/icons/legendIconPurple.svg";
import LegendIconBlue from "@assets/icons/legendIconBlue.svg";
import LegendIconTeal from "@assets/icons/legendIconTeal.svg";
import LegendIconFluro from "@assets/icons/legendIconFluro.svg";

const Legend: React.FC<ILegendProps> = ({
  modifierClass,
  labels,
  onClick,
  legendFormat = "horizontal",
}) => {
  return legendFormat === "tabled" ? (
    <TabledDotPoints dotpoints={labels} onClick={onClick} />
  ) : (
    <div className={`chart__legend ${modifierClass}`}>
      <form className={`legend__format legend__format--${legendFormat}`}>
        {labels.map(({ name, color, id }) => {
          return (
            <div key={id} className="chart__legend-icon-label">
              {color === "accent-green" && (
                <Image src={LegendIconGreen} alt="Legend Icon" />
              )}
              {color === "accent-red" && (
                <Image src={LegendIconRed} alt="Legend Icon" />
              )}
              {color === "accent-yellow" && (
                <Image src={LegendIconYellow} alt="Legend Icon" />
              )}
              {color === "accent-purple" && (
                <Image src={LegendIconPurple} alt="Legend Icon" />
              )}
              {color === "accent-blue" && (
                <Image src={LegendIconBlue} alt="Legend Icon" />
              )}
              {color === "accent-teal" && (
                <Image src={LegendIconTeal} alt="Legend Icon" />
              )}
              {color === "accent-fluro" && (
                <Image src={LegendIconFluro} alt="Legend Icon" />
              )}
              <input
                className="chart__legend-item"
                type="checkbox"
                id={id}
                name="legend"
                value={name}
                onChange={(e) => onClick(e.currentTarget.id)}
              />
              <label htmlFor={id} className="typography__body--small">
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
