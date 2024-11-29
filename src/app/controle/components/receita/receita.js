"use client";
import "@/app/controle/controle-style.css";
import { useState} from "react";
import FormReceita from "./formularioReceita";
import HistoricoReceita from "./historicoReceita"

export default function Receita() {
    const [formulario, criaFormulario] = useState(false);

    function formularioState() {
        criaFormulario(prevState => !prevState);
    }

    return (
        <main id="receita" className="box">
            <div className="criar">
                <p>Criar Receita</p>
                <button onClick={formularioState}>+</button>
            </div>
            {formulario && (
               <FormReceita></FormReceita>
            )}
            {!formulario && (
                <HistoricoReceita></HistoricoReceita>
            )}
            

        </main>
    );
}
