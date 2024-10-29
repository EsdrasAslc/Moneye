import React, { useState } from 'react';

export default function InfoForm({ userId, nextStep }) {
  const [name, setName] = useState('');
  const [idade, setIdade] = useState('');
  const [profissao, setProfissao] = useState('');
  const [genero, setGenero] = useState('');

  async function handleSubmit() {
    if (!name || !idade || !profissao || !genero) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    try {
      const response = await fetch('/api/register/info-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_user: userId, name, profissao, genero, idade })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert(`Registro bem sucedido`);
        } else {
          alert("Registro falhou! Este usuário já possui informações.");
        }
      } else {
        const error = await response.json();
        alert(`Erro: ${error.message}`);
      }
    } catch (err) {
      console.error('Erro ao tentar registrar:', err);
      alert('Erro no servidor, tente novamente mais tarde.');
    }

    nextStep();
    alert("Registro completo!");
  }

  return (
    <div>
      <h2>Registro - Informações Gerais</h2>
      <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Profissão" value={profissao} onChange={(e) => setProfissao(e.target.value)} />
      <input type="number" placeholder="Idade" value={idade} onChange={(e) => setIdade(e.target.value)} />
      <input type="number" placeholder="Gênero" value={genero} onChange={(e) => setGenero(e.target.value)} />
      <button onClick={handleSubmit}>Completar Registro</button>
    </div>
  );
}
