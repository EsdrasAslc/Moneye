"use client"

import "@/app/login/login-style.css";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');

    async function login() {
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });

            if (response.ok) {
                const data = await response.json();
                setMensagem(`Login bem-sucedido! ID do usuário: ${data.id}`);
            } else {
                const error = await response.json();
                setMensagem(`Erro: ${error.message}`);
            }
        } catch (err) {
            console.error('Erro ao tentar logar:', err);
            setMensagem('Erro no servidor, tente novamente mais tarde.');
        }
    }

    return (
        <main>
            <section>
                <div>
                    <label htmlFor="login">Digite seu email</label>
                    <input 
                        type="email" 
                        id="login" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div>
                    <label htmlFor="password">Digite a sua senha</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={senha} 
                        onChange={(e) => setSenha(e.target.value)} 
                    />
                </div>
                <p>Caso não possua conta clique aqui!</p>
                <button onClick={login}>Login</button>
                {mensagem && <p>{mensagem}</p>}
            </section>
        </main>
    );
}
