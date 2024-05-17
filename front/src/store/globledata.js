import React, { createContext, useReducer, useContext, useEffect } from 'react';

const initialState = {
  username: '',
  password: '',
  phone:'',
};
 
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case'SET_PHONE':
      return { ...state, phone: action.payload };
    default:
      return state;
  }
};

const GlobalDataContext = createContext();

export const useGlobalData = () => {
  return useContext(GlobalDataContext);
};

export const GlobalDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load state from local storage on component mount
  useEffect(() => {
    const storedState = localStorage.getItem('globalState');
    if (storedState) {
      dispatch({ type: 'RESTORE_STATE', payload: JSON.parse(storedState) });
    }
  }, []);

  // Save state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('globalState', JSON.stringify(state));
  }, [state]);

  return (
    <GlobalDataContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalDataContext.Provider>
  );
};
