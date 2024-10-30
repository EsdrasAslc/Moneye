"use client"

import "@/app/login/login-style.css";
import { useState } from "react";
import Image from 'next/image';
import LoginImage from '@/app/login/images/login.svg';


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
            <div className="container-login">
                <div className="img-box">
                    <Image
                        src={LoginImage} // Caminho da imagem dentro da pasta public
                        alt="Descrição da imagem"
                        width={500} // Largura da imagem
                        height={300} // Altura da imagem
                    />
                </div>
            </div>
            <div className="content-box">
                <div className="form-box">
                    <h2>Entrar</h2>
                    <form>

                        <div className="input-box">
                            <span>Usuário</span>
                            <input type="email" placeholder="@mail.com" />
                        </div>

                        <div className="input-box">
                            <span>Senha</span>
                            <input type="password" placeholder="password" />
                        </div>

                        <div className="remember">
                            <label>
                                <input type="checkbox" /> Remember me
                            </label>
                            <a href="#">Esqueceu a Senha?</a>
                        </div>

                        <div className="input-box">
                            <input type="submit" value="Entrar" />
                        </div>

                        <div className="input-box">
                            <p>Não tem uma Conta? <a href="/register">Inscrever-se</a>   </p>
                        </div>
                    </form>

                    <h3>Logar Com</h3>
                    <ul className="ul">

                    </ul>

                </div>

            </div>


            {/* <section> 
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
            </section> */}
        </main>
    );
}
