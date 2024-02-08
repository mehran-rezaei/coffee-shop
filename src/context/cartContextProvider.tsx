import React, { useReducer, createContext, useEffect, useState } from "react";
import { getCookie, setCookie } from "../Dataservice/Configs/cookieProvider";

interface initialStateType {
  selectedItem: any;
  itemsCounter: number;
  total: number;
  checkout: boolean;
  statrted: boolean;
}
let stateFromLocalStorage = "";
if (typeof window !== "undefined") {
  stateFromLocalStorage = JSON.parse(localStorage.getItem("card"));
}

const initialState = {
  selectedItem: [],
  itemsCounter: 0,
  total: 0,
  checkout: false,
  statrted: false,
};
interface contextProviderProps {
  children: React.ReactNode;
}
interface contextProps {
  state2: any;
  dispatch2: any;
}
const sumItems = (item: any) => {
  const itemsCounter = item.reduce(
    (total: any, product: any) => total + product.quantityy,
    0
  );
  const total = item
    .reduce(
      (total: any, product: any) =>
        total + product.salePrice * product.quantityy,
      0
    )
    .toFixed(2);
  return { itemsCounter, total };
};
//  const sumItemsOptions = (item:any) => {
//     const itemsCounter = item.reduce((total:any , product:any) =>  total+ product.quantityy , 0)
//     const total = item.reduce((total:any , product:any) => total + product.price * product.quantity,0).toFixed(2)
//     return {itemsCounter , total}
//    }

const cartReducer = (state: initialStateType, action: any) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (
        !state.selectedItem.find(
          (item: { uniqueId: any }) => item.uniqueId === action.payload.uniqueId
        )
      ) {
        state.selectedItem.push({
          ...action.payload,
          quantityy: action.payload.quantityy,
        });
      }
      return {
        ...state,
        selectedItem: [...state.selectedItem],
        ...sumItems(state.selectedItem),
        checkout: false,
        statrted: true,
      };
    case "ADD_ITEM_Options":
      if (
        !state.selectedItem.find(
          (item: { id: any }) => item.id === action.payload.id
        )
      ) {
        state.selectedItem.push({
          ...action.payload,
          quantityy: action.payload.quantityy,
        });
      }
      return {
        ...state,
        selectedItem: [...state.selectedItem],
        ...sumItems(state.selectedItem),
        checkout: false,
        statrted: true,
      };
    case "REMOVE_ITEM":
      const newSeletedItem = state.selectedItem.filter(
        (item: { uniqueId: any }) => item.uniqueId !== action.payload.uniqueId
      );
      return {
        ...state,
        selectedItem: [...newSeletedItem],
        ...sumItems(newSeletedItem),
      };
    case "REMOVE_ITEM_OPTIONS":
      const newSeletedItemOptions = state.selectedItem.filter(
        (item: { id: any }) => item.id !== action.payload.id
      );
      return {
        ...state,
        selectedItem: [...newSeletedItemOptions],
        ...sumItems(newSeletedItemOptions),
      };
    case "INCREASE":
      const IndexI = state.selectedItem.findIndex(
        (item: { uniqueId: any }) => item.uniqueId === action.payload.uniqueId
      );
      state.selectedItem[IndexI].quantityy += action.payload.quantityy / 2;
      return {
        ...state,
        ...sumItems(state.selectedItem),
      };
    case "INCREASE_OPTIONS":
      const IndexII = state.selectedItem.findIndex(
        (item: { id: any }) => item.id === action.payload.id
      );
      state.selectedItem[IndexII].quantityy += action.payload.quantityy / 2;
      return {
        ...state,
        ...sumItems(state.selectedItem),
      };
    case "INCREASE_CARD":
      const IndexIII = state.selectedItem.findIndex(
        (item: { uniqueId: any }) => item.uniqueId === action.payload.uniqueId
      );
      state.selectedItem[IndexIII].quantityy += 0.5;
      return {
        ...state,
        ...sumItems(state.selectedItem),
      };
    case "INCREASE_OPTIONS_CARD":
      const IndexIIII = state.selectedItem.findIndex(
        (item: { id: any }) => item.id === action.payload.id
      );
      state.selectedItem[IndexIIII].quantityy += 0.5;
      return {
        ...state,
        ...sumItems(state.selectedItem),
      };

    case "DECREASE":
      const IndexD = state.selectedItem.findIndex(
        (item: { uniqueId: any }) => item.uniqueId === action.payload.uniqueId
      );
      state.selectedItem[IndexD].quantityy =
        state.selectedItem[IndexD].quantityy - 0.5;
      return {
        ...state,
        ...sumItems(state.selectedItem),
      };
    case "DECREASE_OPTIONS":
      const IndexDD = state.selectedItem.findIndex(
        (item: { id: any }) => item.id === action.payload.id
      );
      state.selectedItem[IndexDD].quantityy =
        state.selectedItem[IndexDD].quantityy - 0.5;
      return {
        ...state,
        ...sumItems(state.selectedItem),
      };
    case "CLEAR":
      return {
        selectedItem: [],
        itemsCounter: 0,
        total: 0,
        checkout: false,
        statrted: true,
      };

    case "CHECKOUT":
      return {
        selectedItem: [],
        itemsCounter: 0,
        total: 0,
        checkout: true,
        statrted: true,
      };
    default:
      return state;
  }
};
export const CartContext = createContext({} as contextProps);

const CartContextProvider = ({ children }: contextProviderProps) => {
  // const [stateFromLocalStorage , setStateFromLocalStorage] = useState<any>()

  // useEffect(() => {
  //     // setStateFromLocalStorage(JSON.parse(localStorage.getItem('card')) || initialState)
  // },[])

  const [state2, dispatch2] = useReducer<any>(
    cartReducer,
    stateFromLocalStorage || initialState
  );
  useEffect(() => {
    if (state2.statrted == true)
      localStorage.setItem("card", JSON.stringify(state2));
  }, [state2]);

  return (
    <CartContext.Provider value={{ state2, dispatch2 }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
