// Components
import FourColumnGrid from "@/grids/fourColumnGrid";
import TabledDotPoints from "@components/tabledDotPoints/tabledDotPoints";

const Interesting = () => {
  return (
    <FourColumnGrid
      gridHeading="Interesting"
      column1={{
        header: <h2 className="typography__display--5">Price Volatility</h2>,
        content: (
          <TabledDotPoints
            dotpoints={[
              { title: "NFT Top 20", value: 0.8, color: "accent-green" },
              { title: "NFT Top 20", value: -0.8, color: "accent-blue" },
              { title: "NFT Top 20", value: 2, color: "accent-purple" },
              { title: "NFT Top 20", value: 10, color: "accent-orange" },
            ]}
          />
        ),
      }}
      column2={{
        header: <h2 className="typography__display--5">Volume Distribution</h2>,
        content: (
          <TabledDotPoints
            dotpoints={[
              { title: "NFT Top 20", value: 0.8, color: "black" },
              { title: "NFT Top 20", value: 0.8, color: "darker-green" },
              { title: "NFT Top 20", value: 0.8, color: "dark-green" },
              { title: "NFT Top 20", value: 0.8, color: "accent-green" },
            ]}
          />
        ),
      }}
      column3={{
        header: <h2 className="typography__display--5">Top Sweeps</h2>,
        content: "fd",
      }}
      column4={{
        header: <h2 className="typography__display--5">Graveyard</h2>,
        content: "fd",
      }}
    />
  );
};

export default Interesting;
