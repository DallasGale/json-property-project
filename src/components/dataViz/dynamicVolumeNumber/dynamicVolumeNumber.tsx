// Components
import Image from "next/image";

// Utils
import calculateVolumeTotal from "@utils/calculateVolumeTotal";

// Assets
import CryptoIcon from "@assets/icons/crypto.svg";

// Types
interface DynamicVolumeNumberTypes {
  timeframe: number;
  volumes: number[];
}

const DynamicVolumeNumber: React.FC<DynamicVolumeNumberTypes> = ({
  timeframe,
  volumes,
}) => {
  return (
    <p className="typography__label--2">
      <Image src={CryptoIcon} alt="Crypto Icon" />
      {calculateVolumeTotal(timeframe, volumes)}
    </p>
  );
};

export default DynamicVolumeNumber;
