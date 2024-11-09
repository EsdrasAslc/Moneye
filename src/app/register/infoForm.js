import React, { useState } from 'react';
import { useSensitiveData } from '@/app/context/SensitiveDataContext';
import { useRouter } from 'next/navigation';

export default function InfoForm({ userId }) {
  const [name, setName] = useState('');
  const [idade, setIdade] = useState('');
  const [profissao, setProfissao] = useState('');
  const [genero, setGenero] = useState('');
  const { setSensitiveData } = useSensitiveData();
  const router = useRouter();

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
          setSensitiveData(userId);
          router.push('/controle');
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


    const handleSetData = (id) => {
      setSensitiveData(id);
      router.replace('/controle');
  };
  }

  return (

    <main className="container-login">
      <div className="content-box">
        <h2>Registre-se</h2>
        <div className="form-box">
          <div>
            <div className="input-box">
              <span>Digite seu nome</span>
              <input 
                type="text" 
                placeholder="Nome" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              /> 
            </div>
            <div className="input-box">
              <span>Digite sua profissão</span>
              <input 
                type="text" 
                placeholder="Profissão" 
                value={profissao} onChange={(e) => setProfissao(e.target.value)} 
              />
            </div>
          </div>
          <div>
            <div className="input-box">
              <span>Digite sua idade</span>
              <input 
                type="number" 
                placeholder="Idade" 
                value={idade} 
                onChange={(e) => setIdade(e.target.value)} 
              />
            </div>
            <div className="input-box">
              <span>Escolha seu gênero</span>
              <select onChange={(e) => setGenero(e.target.value)}>
                <option value="1" selected>Masculino</option>
                <option value="2">Feminino</option>
              </select>
            </div>
          </div>
        </div>
        <div className="input-box">
          <button onClick={handleSubmit}>Próximo</button>
        </div>
      </div>
    </main>




    // <div>
    //    <h2>Registro - Informações Gerais</h2>
  
    //   <button onClick={handleSubmit}>Completar Registro</button> */}
    // </div>
  );
}
