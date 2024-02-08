import React, { createContext, useReducer, useState } from "react";
interface stateType {
  open: boolean;
}
interface contextProviderProps {
  children: React.ReactNode;
}
interface contextProps {
  state: any;
  dispatch: any;
}
const initdata = { open: false };

const modalReducer = (state: stateType, action: any) => {
  switch (action.type) {
    case "INCREASE":
      // @ts-ignore
      const items = JSON.parse(localStorage.getItem("dataKey"));
      return {
        open: true,
      };

    case "DECREASE":
      return {
        open: false,
      };
    default:
      return state;
  }
};
export const menuContext = createContext({} as contextProps);
const MenuContext = ({ children }: contextProviderProps) => {
  const [state, dispatch] = useReducer<any>(modalReducer, initdata);
  return (
    <menuContext.Provider value={{ state, dispatch }}>
      {children}
    </menuContext.Provider>
  );
};
export default MenuContext;
