import React, { createContext, useReducer, useState } from "react";

interface contextProviderProps {
  children: React.ReactNode;
}
interface initialStateType {
  id: number;
  name: String;
  parentGroupId: number;
  color: String;
  image: String;
  child: Array<initialStateType>;
}

interface contextProps {
  state: any;
  dispatch: any;
}
const initialState = {
  id: 0,
  name: "",
  parentGroupId: 0,
  color: "",
  image: "",
  child: [],
};

const modalReducer = (state: initialStateType, action: any) => {
  switch (action.type) {
    case "ADD":
      return {
        showLogin: true,
      };
    case "DELETE":
      return {
        ...state,
        showLogin: false,
        showSignUp: true,
        showPhoneValidation: false,
      };
    default:
      return state;
  }
};

export const inventory_context = createContext({} as contextProps);
const Inventory_context = ({ children }: contextProviderProps) => {
  const [state, dispatch] = useReducer<any>(modalReducer, initialState);
  return (
    <inventory_context.Provider value={{ state, dispatch }}>
      {children}
    </inventory_context.Provider>
  );
};
export default Inventory_context;
