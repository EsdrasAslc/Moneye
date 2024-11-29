"use client";
import "@/app/controle/controle-style.css";
import { useState} from "react";
import FormDespesa from "./formularioDespesa";
import HistoricoDespesa from "./historicoDespesa";

export default function Despesa() {
    const [formulario, criaFormulario] = useState(false);

    function formularioState() {
        criaFormulario(prevState => !prevState);
    }

    return (
        <main id="despesa" className="box">
            <div className="criar">
                <p>Criar Despesa</p>
                <button onClick={formularioState}>-</button>
            </div>
            {formulario && (
               <FormDespesa></FormDespesa>
            )}
            {!formulario && (
                <HistoricoDespesa></HistoricoDespesa>
            ) }
            

        </main>
    );
}
