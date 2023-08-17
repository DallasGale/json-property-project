import { ILegendProps } from "@/app/types";
import TabledDotPoints from "@components/tabledDotPoints/tabledDotPoints";
import Image from "next/image";

// Assets
import LegendIconGreen from "@assets/icons/legendIconGreen.svg";
import LegendIconRed from "@assets/icons/legendIconRed.svg";
import LegendIconGrey from "@assets/icons/legendIconGrey.svg";

// Utils
import { VolumeFormatter } from "@/utils/volumeFormatter";

const Legend: React.FC<ILegendProps> = ({
  modifierClass,
  labels,
  onClick,
  legendFormat = "horizontal",
  legendItemVolume,
}) => {
  return legendFormat === "tabled" ? (
    <TabledDotPoints dotpoints={labels} onClick={onClick} />
  ) : (
    <div className={`chart__legend ${modifierClass}`}>
      <form className={`legend__format legend__format--${legendFormat}`}>
        {labels.map(({ name, color, id }) => {
          return (
            <div key={id} className="chart__legend-icon-label-wrapper">
              <div className="chart__legend-icon-label">
                {color === "accent-green" && (
                  <Image src={LegendIconGreen} alt="Legend Icon" />
                )}
                {color === "accent-red" && (
                  <Image src={LegendIconRed} alt="Legend Icon" />
                )}

                {color === "grey" && (
                  <Image src={LegendIconGrey} alt="Legend Icon" />
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

              {legendItemVolume && (
                <div className="chart__legend-icon-label">
                  <p className="typography__body--small">
                    {legendItemVolume.map((item) => {
                      if (item.id === id) {
                        return VolumeFormatter(item.value);
                      }
                    })}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default Legend;
