"use client";
import "@/app/controle/controle-style.css";
import { useSensitiveData } from "@/app/context/SensitiveDataContext";
import { useState, useEffect } from "react";

export default function Receita() {
    // const { sensitiveData } = useSensitiveData(); // Acessa o dado sensível
    const sensitiveData = 1;
    const id_user = sensitiveData;
    const [formulario, criaFormulario] = useState(false);

    async function criarReceita() {
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
                console.log("Dados recebidos:", data);
            } else {
                const error = await response.json();
                console.error("Erro na resposta:", error);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }

    function formularioState() {
        criaFormulario(prevState => !prevState);
    }

    useEffect(() => {
        // Coloque aqui qualquer lógica necessária ao montar o componente
    }, []);

    return (
        <main>
            <h5>Receita:</h5>
            <button onClick={formularioState}>+</button>

            {formulario && (
                <form>
                    <input type="text" />
                </form>
            )}
        </main>
    );
}
