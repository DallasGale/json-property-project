export const handleHeroTimeframeClick = (
  e: React.MouseEvent,
  value: number | null,
  setHeroTimeframeClicked: (e: boolean) => void,
  setHeroTimeframe: (e: number) => void
) => {
  e.preventDefault();
  setHeroTimeframeClicked(true);
  setTimeout(() => {
    setHeroTimeframeClicked(false);
  }, 500);
  if (value) {
    setHeroTimeframe(value);
  }
};

// -----------------------------------------------------------
// This is to disable and enable the legend labels and dataset
type DisabledStatesType = {
  id: string;
  setter: any;
};
export const handleLegendClick = (
  e: string,
  disabledStates: DisabledStatesType[],
  labels: any[]
) => {
  if (document) {
    const domEls = document?.getElementsByTagName("input");
    for (let i = 0; i < domEls.length; i++) {
      if (domEls[i].id === e) {
        labels.forEach((label) => {
          disabledStates.forEach((disabledState) => {
            if (domEls[i].id === label.id && label.id === disabledState.id) {
              disabledState.setter();
            }
          });
        });
      }
    }
  }
};
