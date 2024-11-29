"use client";
import { createContext, useContext, useState } from "react";

const SaldoContext = createContext();

export function SaldoProvider({ children }) {
    const [atualizarSaldo, setAtualizarSaldo] = useState(false);

    function toggleAtualizarSaldo() {
        setAtualizarSaldo((prev) => !prev);
    }

    return (
        <SaldoContext.Provider value={{ atualizarSaldo, toggleAtualizarSaldo }}>
            {children}
        </SaldoContext.Provider>
    );
}

export function useSaldo() {
    return useContext(SaldoContext);
}
