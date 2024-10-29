import React, { useState } from 'react';

export default function EmailForm({ nextStep }) {
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const [senha1, setSenha1] = useState('');
  const [senha2, setSenha2] = useState('');
  let id;
  function isValidEmail(email) {
    // Expressão regular para verificar e-mail válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function handleSubmit() {
    if (!isValidEmail(email1)) {
      alert("Email inválido!");
      return;
    }

    if (!email1 || !email2 || !senha1 || !senha2) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    if (email1 !== email2) {
      alert("Email ERR");
      return;
    }

    if (senha1 !== senha2) {
      alert("Senha ERR");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/register/user', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email1, senha: senha1 })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert(`Registro bem sucedido`);
          id = data.id;
        } else {
          alert("Registro Falhou! E-mail já em uso!");
        }
      } else {
          const error = await response.json();
          alert(`Erro: ${error.message}`);
      }
    } catch (err) {
      console.error('Erro ao tentar registrar:', err);
      alert('Erro no servidor, tente novamente mais tarde.');
    }
    nextStep(id); 
  }

  return (
    <div>
      <h2>Registro - Email e Senha</h2>
      <input type="email" placeholder="Digite seu email" value={email1} onChange={(e) => setEmail1(e.target.value)} />
      <input type="email" placeholder="Repita seu email" value={email2} onChange={(e) => setEmail2(e.target.value)} />
      <input type="password" placeholder="Digite sua senha" value={senha1} onChange={(e) => setSenha1(e.target.value)} />
      <input type="password" placeholder="Repita sua senha" value={senha2} onChange={(e) => setSenha2(e.target.value)} />
      <button onClick={handleSubmit}>Próximo</button>
    </div>
  );
}
