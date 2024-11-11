"use client";
import "@/app/controle/controle-style.css";
import { useSensitiveData } from "@/app/context/SensitiveDataContext";
import { useState, useEffect } from "react";

export default function Saldo() {
    //   const { sensitiveData } = useSensitiveData(); // Acessa o dado sensível
    const sensitiveData = 1;
    const id_user = sensitiveData
    const [saldo, setSaldo] = useState("");

    async function buscarSaldo() {
        try {
            const response = await fetch("http://localhost:3000/api/saldo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id_user })
            });
            
            if (response.ok) {
                const data = await response.json();
                // Supondo que `data` tenha a estrutura `{ saldo: <valor> }`
                setSaldo(data.saldo);
            } else {
                const error = await response.json();
                setSaldo(`Erro: ${error.message}`);
            }
        } catch (error) {
            setSaldo("Erro no servidor, tente novamente mais tarde.");
        }
    }

    // Use `useEffect` para buscar o saldo ao montar o componente
    useEffect(() => {
        buscarSaldo();
    }, []);

    return (
        <main>
            <div>Saldo: {saldo || "carregando..."}</div>
        </main>
    );
}
