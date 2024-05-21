import React,{ useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg'
import './style.css';

export default function NewIncident(){
  const history = useHistory();

  const [title,setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);

  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(e) {
    e.preventDefault();

    const payload = {
      "title" : title,
      "description" : description,
      "value" : value
    };
   
    await api.post('incidents',payload, {
      headers: {
          Authorization: ongId
      }
    }).then(response => {
      alert('Caso cadastrado com sucesso.');
      history.push('/profile');
    })
    .catch(error => {
      alert('Erro ao cadastrar o caso, tente novamente.');
    });

  }
  
  return(
    <div className="new-incident-conteiner">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero"/>
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente e encontre um herói para resolver isso.</p>
          
          <Link className="text-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para Profile
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input 
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input 
            type="number"
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}