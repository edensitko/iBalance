import { createContext, ReactNode, useReducer } from "react";

type Theme = {
  mode: string;
};
type Action = {
  type: string;
  payload?: any;
};

//set type to mode and func
export const ThemeContext = createContext<{
  mode: string;
  changeMode: (mode: string) => void;
}>

//set the function to darkmode 
({
  mode: "dark",
  changeMode: () => {}, 
});

type ThemeProviderProps = {
  children: ReactNode;
};

const themeReducer = (state: Theme, action: Action): Theme => {

  //set reducer states value for action mode 
  switch (action.type) {
    case "CHANGE_MODE":
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};

  //function for theme provider dark 
function ThemeProvider({ children }: ThemeProviderProps) {
  const [state, dispatch] = useReducer(themeReducer, {
    mode: "dark",
  });

//function of changing mode by dispatch
  const changeMode = (mode: string) => {
    dispatch({ type: "CHANGE_MODE", payload: mode });
  };
//returning value state and function to children components
  return (
    <ThemeContext.Provider value={{ ...state, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
