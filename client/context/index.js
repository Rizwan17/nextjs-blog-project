import { createContext, useContext, useReducer } from "react";
import { authConstants } from "./constants";

const Store = createContext();

const reducer = (state, action) => {

    console.log(action);
    
    switch(action.type){
        case authConstants.LOGIN_REQUEST: {
            return {
                ...state,
                user: {
                    ...state.user,
                    authenticating: true,
                }
            }
        }
        case authConstants.LOGIN_SUCCESS:{
            return {
                ...state,
                user: {
                    ...action.payload.user,
                    authenticating: false,
                    authenticated: true
                }
            }
        }
        case authConstants.LOGIN_FAILURE: {
            return {
                ...state,
                user: {
                    ...state.user,
                    authenticating: false,
                    authenticated: false,
                    error: action.payload
                }
            }
        }
        default:
            {
                return state;
            }
    }
}

export const useStore = () => useContext(Store);

export const StoreProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, {
        user: {
            authenticated: false,
            authenticating: true,
            error: null
        }
    });
    
    return (
        <Store.Provider value={[state, dispatch]}>
            {children}
        </Store.Provider>
    );
}