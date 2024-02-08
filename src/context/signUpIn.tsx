import React, { createContext, useReducer, useState } from 'react';

interface contextProviderProps {
    children : React.ReactNode
}
interface initialStateType {
    showLogin : boolean,
    showSignUp : boolean,
    showPhoneValidation : boolean,
    showConfirmPassword : boolean,
    showForgetPassword : boolean,
    showGetCofee : boolean,
    showCheckOut : boolean,
    phoneNumber : string,
    password : string,
    name:string,
    address:string,
}
interface contextProps {
    state : any
    dispatch : any
}
const initialState = {
    showLogin : true,
    showSignUp : false,
    showPhoneValidation : false,
    showConfirmPassword : false,
    showForgetPassword : false,
    showGetCofee : false,
    showCheckOut : false,
    phoneNumber : '',
    password : '',
    name:'',
    address:'',
}
const modalReducer = (state:initialStateType,action:any) => {
    switch(action.type){
            case "ON_LOGIN" :
                return {
                    showLogin : true,
                }
            // case "OFF_LOGIN" :
            // return {
            //     ...state,
            //     showLogin : false
            // }  
            case "ON_SIGNUP" :
                return {
                    ...state,
                    showLogin : false,
                    showSignUp : true,
                    showPhoneValidation : false
                }
            // case "OFF_SIGNUP" :
            //     return {
            //         ...state,
            //         showSignUp : false,
            //     }
            case "ON_VALIDATION" :
                return {
                    ...state ,
                    showLogin : false,
                    showSignUp : false,
                    showPhoneValidation : true,
                    showForgetPassword : false,
                    phoneNumber : action.payload
                }
                case "ON_SETNAME" :
                return {
                    ...state ,
                    name : action.payload
                }
                case "ON_SETADDRESS" :
                return {
                    ...state ,
                    address : action.payload
                }
            case "ON_GETCOFFEE"   : 
             return {
                ...state,
                showPhoneValidation : false,
                showSignUp : false,
                showLogin : false,
                showGetCofee : true
             }  
             case "ON-CHECKOUT" : 
             return {
                ...state,
                showPhoneValidation : false,
                showSignUp : false,
                showLogin : false,
                showGetCofee : false,
                showCheckOut : true
             }
            // case "OFF_VALIDATION" :
            //     return {
            //         showPhoneValidation : false,
            //     }
            // case "ON_CONFIRM-PASSWORD" :
            //         return {
            //             showConfirmPassword : true,
            //             showPhoneValidation : false,
            //         }
            // case "OFF_CONFIRM-PASSWORD" :
            //             return {
            //                 showConfirmPassword : false,
            //             }  
            // case "ON_FORGET-PASSWORD" :
            //     return {
            //         showForgetPassword : true,
            //         phoneNumber : action.payload 
            //     }  
            // case "OFF_FORGET-PASSWORD" :
            //     return {
            //         showForgetPassword : false,
            //         phoneNumber : action.payload 
            //     }                         
        default : return state
    }
}


export const signUpIn = createContext({} as contextProps)
const SignUpIn = ({children} : contextProviderProps) => {
    const [state , dispatch] = useReducer<any>(modalReducer,initialState)
    return (
         <signUpIn.Provider value={{state , dispatch}}>
                    {children}
         </signUpIn.Provider>
    );
};
export default SignUpIn ;