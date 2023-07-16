import React, { useReducer, useContext, useEffect } from 'react';
import reducer from './reducer';
import {
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR
} from './actions';

const initialState = {
  user: null,
  userLoading: false,
}

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
  
    useEffect(() => {
    //   getCurrentUser();
    }, []);
  
    return (
      <AppContext.Provider
        value={{
          ...state,
  
        }}
      >
        {children}
      </AppContext.Provider>
    );
  };

  const useAppContext = () => {
    return useContext(AppContext);
  };
  
  export { AppProvider, initialState, useAppContext };