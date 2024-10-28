'use client'

import { useState } from "react";
import "@/app/register/register-style.css"

export default function Register() {
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const [senha1, setSenha1] = useState('');
  const [senha2, setSenha2] = useState('');

  function registro() {
    if (email1 !== email2) {
      alert("Email ERR");
    } 

    if (senha1 !== senha2) {
      alert("Senha ERR");
    }


  }

  return (
    <main>
      <section>
        <div>
          <label htmlFor="email">Digite seu email</label>
          <input
            type="email"
            id="email"
            value={email1}
            onChange={(e) => setEmail1(e.target.value)} 
          />
        </div>
        <div>
          <label htmlFor="email">Repita seu email</label>
          <input
            type="email"
            id="email"
            value={email2}
            onChange={(e) => setEmail2(e.target.value)} 
          />
        </div>
        <div>
          <label htmlFor="password">Digite a sua senha</label>
          <input
            type="password"
            id="password"
            value={senha1}
            onChange={(e) => setSenha1(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Repita a sua senha</label>
          <input
            type="password"
            id="password"
            value={senha2}
            onChange={(e) => setSenha2(e.target.value)}
          />
        </div>
        <p>Caso não possua conta clique aqui!</p>
        <button onClick={registro}>Login</button>
      </section>
    </main>
  );
}
