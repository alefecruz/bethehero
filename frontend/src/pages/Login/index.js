import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { FiLogIn } from 'react-icons/fi';
import herosImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import './style.css';

export default function Login() {
  const history = useHistory();
  const [id, setId] = useState('');



  async function handleLogin(e){
    e.preventDefault();
    try {
      const response = await api.post('sessions', {id})
      console.log(response.data.name);
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.name);
      history.push('/profile');
    }catch (err) {
      alert('Falha no login tente novamente.');
    }
  }
  return (
    <div className="login-conteiner">
      <section className="form">
        <img src={ logoImg } alt="Be the Hero" />

        <form onSubmit={handleLogin}>
          <h1>
            Faça seu login
          </h1>

          <input 
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>
          <Link className="text-link" to="/register">
            <FiLogIn size={16} color="#E02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={ herosImg } alt="Heros" />
    </div>
  );
}