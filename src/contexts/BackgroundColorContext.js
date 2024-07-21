import { createContext } from "react";

export const backgroundColors = {
  primary: "primary",
  green: "green",
  darkblue: "darkBlue",
  grey: "grey",
  darkGreen: 'darkGreen'
};

export const BackgroundColorContext = createContext({
  color: backgroundColors.darkblue,
  changeColor: (color) => {},
});
