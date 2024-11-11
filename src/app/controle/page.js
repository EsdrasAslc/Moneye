"use client";
import "@/app/controle/controle-style.css"
import { useSensitiveData } from '@/app/context/SensitiveDataContext';
import Saldo from "@/app/controle/components/saldo";

export default function Controle() {
  // const { sensitiveData } = useSensitiveData(); // Acessa o dado sensível
  const sensitiveData = 1;

  return (
    <main>
      <Saldo></Saldo>
      <div>Dados Sensíveis: {sensitiveData}</div>
    </main>);
}
