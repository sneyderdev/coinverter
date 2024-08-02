import * as React from "react";
import { useStore } from "@nanostores/react";

import { $theme } from "@/store";

import Particles from "@/components/ui/particles";

export const Background = () => {
  const [color, setColor] = React.useState("#ffffff");

  const theme = useStore($theme);

  React.useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  return <Particles className="absolute inset-0 -z-10" color={color} refresh />;
};
