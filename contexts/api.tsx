import React, { createContext, useContext, useEffect } from "react";
import api from '../services/api';

const ApiContext = createContext({
  api
});

export const ApiProvider = ({ children }: any) => {
  return (
    <ApiContext.Provider
      value={{ api }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
