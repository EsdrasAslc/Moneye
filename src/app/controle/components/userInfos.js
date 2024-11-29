"use client";
import "@/app/controle/controle-style.css";
import { useSensitiveData } from "@/app/context/SensitiveDataContext";
import { useState, useEffect } from "react";

export default function UserInfo() {
    //   const { sensitiveData } = useSensitiveData(); // Acessa o dado sensível
    const sensitiveData = 1;
    const [nome, setNome] = useState("");
    const [profissao, setProfissao] = useState('');

    async function buscarNome() {
        try {
            const response = await fetch(`http://localhost:3000/api/userInfo?id=${sensitiveData}`);
            
            if (response.ok) {
                const data = await response.json();
                setNome(data.nome);
                setProfissao(data.profissao);
            } else {
                const error = await response.json();
                setNome(`Erro: ${error.message}`);
            }
        } catch (error) {
            setNome("Erro no servidor, tente novamente mais tarde.");
        }
    }

    // Use `useEffect` para buscar o saldo ao montar o componente
    useEffect(() => {
        buscarNome();
    }, []);

    return (
        <main className="userInfoContainer">
            <div>{nome || "Carregando..."}</div>
            <div>{profissao || ""}</div>
        </main>
    );
}
