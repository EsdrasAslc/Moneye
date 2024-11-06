"use client";
import { createContext, useContext, useState } from 'react';

// Cria o contexto
const SensitiveDataContext = createContext();

// Cria o provedor, que irá encapsular os componentes que precisam acessar o contexto
export function SensitiveDataProvider({ children }) {
  const [sensitiveData, setSensitiveData] = useState(null); // estado para armazenar o dado sensível

  return (
    <SensitiveDataContext.Provider value={{ sensitiveData, setSensitiveData }}>
      {children}
    </SensitiveDataContext.Provider>
  );
}

export function useSensitiveData() {
  return useContext(SensitiveDataContext);
}
