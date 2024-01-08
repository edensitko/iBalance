import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

type ThemeContextType = {

  changeMode: (mode: string) => void;
  mode: string;
};

  function useTheme(): ThemeContextType {
    const Context = useContext(ThemeContext);

  if (!Context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return Context;

}

export default useTheme;
