"use client";
import "@/app/controle/controle-style.css";
import { useEffect, useState } from "react";
import { useSensitiveData } from "@/app/context/SensitiveDataContext"; 

export default function HistoricoReceita() {
    const { sensitiveData } = useSensitiveData(); // Obtém o dado sensível do contexto
    const [receitas, setReceitas] = useState([]); // Estado para armazenar receitas

    async function buscaReceita() {
        try {
            const response = await fetch(`http://localhost:3000/api/receita/buscar?id=${sensitiveData}`);

            if (!response.ok) {
                throw new Error(`Erro na API: ${response.status}`);
            }

            const data = await response.json();
            setReceitas(data.response); // Supondo que o backend retorna receitas no campo "response"
        } catch (error) {
            console.error("Erro ao buscar receitas:", error);
        }
    }

    useEffect(() => {
        buscaReceita(); // Busca as receitas ao montar o componente
    }, [sensitiveData]); // Dependência em sensitiveData para reexecutar quando mudar

    // Função para formatar a data e adicionar 3 horas
    const formatarData = (dataReceita) => {
        const dataOriginal = new Date(dataReceita);
        dataOriginal.setHours(dataOriginal.getHours() + 3); // Adiciona 3 horas
        return dataOriginal.toLocaleDateString('pt-BR'); // Formata para o padrão brasileiro
    };

    return (
        <main>
            <h5>Histórico de Receitas:</h5>
            <ul>
                {receitas && receitas.length > 0 ? (
                    receitas.map((receita) => (
                        <li key={receita.id}>
                            <b>Categoria:</b> {receita.nome_categoria} <b>Valor:</b> R${receita.valor} <br></br><b>Data:</b> {formatarData(receita.data)}
                        </li>
                    ))
                ) : (
                    <p>Nenhuma receita encontrada.</p>
                )}
            </ul>
        </main>
    );
}
