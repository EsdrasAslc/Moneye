'use client'

import "@/app/controle/controle-style.css";
import { useState, useEffect } from "react";
import { useSaldo } from "@/app/controle/context/saldoContext";

export default function Saldo() {
    const { atualizarSaldo } = useSaldo(); // Acessa o estado do contexto
    const sensitiveData = 1;
    const id_user = sensitiveData;
    const [saldo, setSaldo] = useState("");
    const [visivel, setVisivel] = useState(true);

    async function buscarSaldo() {
        try {
            const response = await fetch("http://localhost:3000/api/saldo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id_user }),
            });

            if (response.ok) {
                const data = await response.json();
                setSaldo(data.saldo);
            } else {
                const error = await response.json();
                setSaldo(`Erro: ${error.message}`);
            }
        } catch (error) {
            setSaldo("Erro no servidor, tente novamente mais tarde.");
        }
    }

    useEffect(() => {
        buscarSaldo();
    }, [atualizarSaldo]); // Recarrega o saldo sempre que atualizarSaldo mudar

    return (
        <main>
            <div className="saldoContainer">
                <p>Saldo: R$ {visivel ? (saldo || "Carregando...") : "******"}</p>
                <button id="ocultarSaldo" onClick={() => setVisivel(!visivel)}>
                    {visivel ? "🐵" : "🙈"}
                </button>
            </div>
        </main>
    );
}
