import "@/app/controle/controle-style.css"
import { useSensitiveData } from '@/app/context/SensitiveDataContext';
import Saldo from "@/app/controle/components/saldo";
import Receita from "@/app/controle/components/receita"
import UserInfo from "./components/userInfos";

export default async function Controle() {
  // const { sensitiveData } = useSensitiveData(); // Acessa o dado sensível
  const sensitiveData = 1;

  return (
    <main className="parent">
      
      <div className="div1"> 
        <UserInfo></UserInfo> 
      </div>
      <div className="div2">
        <Saldo></Saldo>
      </div>
      <div className="div3">
        <Receita></Receita>
      </div>
      <div className="div4">Dados Sensíveis: {sensitiveData}</div>
    </main>);
}
