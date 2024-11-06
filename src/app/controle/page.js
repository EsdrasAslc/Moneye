"use client";

import { useSensitiveData } from '@/app/context/SensitiveDataContext';

export default function Controle() {
  const { sensitiveData } = useSensitiveData(); // Acessa o dado sensível

  return <div>Dados Sensíveis: {sensitiveData}</div>;
}
