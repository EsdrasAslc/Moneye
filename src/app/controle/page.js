"use client";
import "@/app/controle/controle-style.css"
import { useSensitiveData } from '@/app/context/SensitiveDataContext';
import Saldo from "@/app/controle/components/saldo";
import Receita from "@/app/controle/components/receita"

export default function Controle() {
  // const { sensitiveData } = useSensitiveData(); // Acessa o dado sensível
  const sensitiveData = 1;

  return (
    <main>
      <Saldo></Saldo>
      <Receita></Receita>
      <div>Dados Sensíveis: {sensitiveData}</div>
    </main>);
}
