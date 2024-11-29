import "@/app/controle/controle-style.css";
import { useState, useEffect } from "react";
import { useSaldo } from "@/app/controle/context/saldoContext";
import { useSensitiveData } from "@/app/context/SensitiveDataContext";

export default function FormDespesa() {

    const { toggleAtualizarSaldo } = useSaldo();
    const { sensitiveData } = useSensitiveData(); 
    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
    const [valorDespesa, setValorDespesa] = useState("");
    const [dataDespesa, setDataDespesa] = useState("");

    async function buscaCategoria() {
        try {
            const responseCat = await fetch("http://localhost:3000/api/despesa/categoria");

            if (!responseCat.ok) {
                throw new Error(`Erro na API: ${responseCat.status}`);
            }

            const data = await responseCat.json();
            setCategorias(data.categorias);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
    }

    async function enviaDespesa() {
        if (!categoriaSelecionada || !valorDespesa || !dataDespesa) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/despesa/criar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_user: sensitiveData,
                    categoria: categoriaSelecionada,
                    valor: valorDespesa,
                    data: dataDespesa,
                }),
            });

            if (response.ok) {
                alert("Despesa enviada com sucesso!");
                toggleAtualizarSaldo(); // Sinaliza que o saldo precisa ser atualizado
            } else {
                const error = await response.json();
                alert(`Erro ao enviar receita: ${error.message}`);
            }
        } catch (err) {
            console.error("Erro ao tentar enviar receita:", err);
            alert("Erro no servidor, tente novamente mais tarde.");
        }
    }

    useEffect(() => {
        buscaCategoria();
    }, []);

    return (
        <main className="userInfoContainer">
            <div>
                <label htmlFor="categoria">Selecione uma categoria:</label>
                <select
                    id="categoria"
                    value={categoriaSelecionada}
                    onChange={(e) => setCategoriaSelecionada(e.target.value)}
                >
                    <option value="">Escolha uma categoria</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nome}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="valor">Valor da Despesa:</label>
                <input
                    id="valor"
                    value={valorDespesa}
                    onChange={(e) => setValorDespesa(e.target.value)}
                    type="number"
                />
            </div>
            <div>
                <label htmlFor="data">Data da Despesa:</label>
                <input
                    id="data"
                    value={dataDespesa}
                    onChange={(e) => setDataDespesa(e.target.value)}
                    type="date"
                />
            </div>
            <button onClick={enviaDespesa}>Enviar</button>
        </main>
    );
}
