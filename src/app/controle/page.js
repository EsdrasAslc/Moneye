"use client";

import "@/app/controle/controle-style.css";
import { SaldoProvider } from "@/app/controle/context/saldoContext";
import Saldo from "@/app/controle/components/saldo";
import Receita from "@/app/controle/components/receita/receita";
import Despesa from "./components/despesa/despesa";
import UserInfo from "./components/userInfos";
import { useSensitiveData } from "@/app/context/SensitiveDataContext";
import dynamic from 'next/dynamic';
import { useState } from "react";
import ChartDespesa from "./components/charts/chartDespesa";
import ChartSaldo from "./components/charts/chartSaldo";

const ChartReceita = dynamic(() => import('@/app/controle/components/charts/chartReceita'), { ssr: false });

export default function Controle() {
    const { sensitiveData } = useSensitiveData(); // Acessa o dado sensível
    const [chartSelecionado, setChartSelecionado] = useState('receita'); // Estado do gráfico selecionado

    return (
        <SaldoProvider>
            <main className="parent">
                <div className="div1">
                    <UserInfo />
                </div>
                <div className="div2">
                    <Saldo />
                </div>
                <div className="div3">
                    <Receita />
                </div>
                <div className="div4">
                    <Despesa />
                </div>
                <div className="div5">
                    <div className="radio-group">
                        <input
                            id="receitaRadio"
                            name="chart"
                            value="receita"
                            type="radio"
                            defaultChecked 
                            onChange={() => setChartSelecionado('receita')}
                        />
                        <label htmlFor="receitaRadio">Receita</label>

                        <input
                            id="despesaRadio"
                            name="chart"
                            value="despesa"
                            type="radio"
                            onChange={() => setChartSelecionado('despesa')}
                        />
                        <label htmlFor="despesaRadio">Despesa</label>

                        <input
                            id="saldoRadio"
                            name="chart"
                            value="saldo"
                            type="radio"
                            onChange={() => setChartSelecionado('saldo')}
                        />
                        <label htmlFor="saldoRadio">Saldo</label>
                    </div>

                    {chartSelecionado === 'receita' && <ChartReceita />}
                    {chartSelecionado === 'despesa' && <ChartDespesa />}
                    {chartSelecionado === 'saldo' && <ChartSaldo />}
                </div>
            </main>
        </SaldoProvider>
    );
}
