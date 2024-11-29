"use client";
import "@/app/controle/controle-style.css";
import { SaldoProvider } from "@/app/controle/context/saldoContext";
import Saldo from "@/app/controle/components/saldo";
import Receita from "@/app/controle/components/receita/receita";
import Despesa from "./components/despesa/despesa";
import UserInfo from "./components/userInfos";
import { useSensitiveData } from "@/app/context/SensitiveDataContext";
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('@/app/controle/components/charts/chart'), { ssr: false });

export default function Controle() {
    const { sensitiveData } = useSensitiveData(); // Acessa o dado sensível

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
                <div className="div5"><Chart></Chart></div>
            </main>
        </SaldoProvider>
    );
}
