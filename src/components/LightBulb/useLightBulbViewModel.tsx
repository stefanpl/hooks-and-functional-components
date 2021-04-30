import { useEffect, useState } from "react";
import toggle from "../../pages/toggle";
import useRestoreTitleOnUnmount from "../../pages/useRestoreTitleOnUnmount";
import { LightBulbViewModel } from "./LightBulbInterfaces";

export const useLightBulbViewModel = (): LightBulbViewModel => {
  const [isTurnedOn, setTurnedOn] = useState<boolean>(true);

  useRestoreTitleOnUnmount();

  /**
   * Changing the title according to the current status
   */
  function effectCallback(): void {
    window.document.title = `The light is now ${isTurnedOn ? "on" : "off"}`;
  }

  useEffect(effectCallback, [isTurnedOn]);

  const style = {
    backgroundColor: isTurnedOn ? "yellow" : "black",
    width: 100,
    height: 100,
    borderRadius: "50%",
  };

  return {
    toggleLightBulb: () => {
      setTurnedOn(toggle);
    },
    style,
  };
};
