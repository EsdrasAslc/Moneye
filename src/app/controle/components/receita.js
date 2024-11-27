"use client";
import "@/app/controle/controle-style.css";
import { useSensitiveData } from "@/app/context/SensitiveDataContext";
import { useState, useEffect } from "react";

export default function Receita() {
    const sensitiveData = 1;  // Pode vir do contexto ou outro lugar
    const id_user = sensitiveData;

    const [formulario, criaFormulario] = useState(false);
    const [categorias, setCategorias] = useState([]);  // Estado para armazenar as categorias

    // Função para buscar as categorias
    async function buscaCategoria() {
        try {
            const responseCat = await fetch("http://localhost:3000/api/receita/categoria");
            
            if (!responseCat.ok) {
                throw new Error(`Erro na API: ${responseCat.status}`);
            }
            
            const data = await responseCat.json();
            console.log("Categorias recebidas:", data);  // Verifique os dados recebidos
            setCategorias(data);  // Atualiza o estado com as categorias recebidas
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
    }

    // Função para criar a receita
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

    // Função para alternar o estado do formulário
    function formularioState() {
        criaFormulario(prevState => !prevState);
    }

    // Chama a função para buscar categorias ao montar o componente, independentemente do formulário estar visível ou não
    useEffect(() => {
        buscaCategoria();
    }, []);  // O array vazio garante que a requisição só aconteça uma vez, ao montar o componente

    // Verificar o estado das categorias para depuração
    console.log("Estado das categorias:", categorias);

    return (
        <main>
            <h5>Receita:</h5>
            <button onClick={formularioState}>+</button>

            {formulario && (
                <form>
                    <label htmlFor="categoria">Categoria:</label>
                    {categorias.length > 0 ? (
                        <select id="categoria" name="categoria">
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nome}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p>Carregando categorias...</p>  // Mensagem enquanto as categorias estão sendo carregadas
                    )}
                </form>
            )}
        </main>
    );
}
