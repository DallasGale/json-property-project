export type NavigationTypes = {
  name: string;
  id: string;
  link: string;
};

const navigation: NavigationTypes[] = [
  {
    name: "Market Overview",
    id: "market-overview",
    link: "/",
  },
  {
    name: "Leaderboards",
    id: "leaderboards",
    link: "/leaderboards",
  },
];

export default navigation;
