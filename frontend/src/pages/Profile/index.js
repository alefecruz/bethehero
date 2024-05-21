import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import './style.css';
import logoImg from '../../assets/logo.svg'
import { FiPower, FiTrash2 } from 'react-icons/fi';


export default function Profile() {
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  const history = useHistory();
  const [incidents, setIncidents] = useState([]);

  useEffect(()=> {
    api.get('profile', {
      headers : {
        Authorization : ongId
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId]);

  function handleLogout () {
    localStorage.clear();
    history.push('/');
  }

  async function handleDeleteIncident(id) {

    try {
      await api.delete(`incidents/${id}`, {
        headers: {
            Authorization: ongId
        }
      });
      setIncidents(incidents.filter(incident => incident.id !== id));
    }catch( err) {
        alert('Error ao remover');
    }

  }
  return  (
    <div className="profile-conteiner">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vindo, {ongName}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#E02041"></FiPower>
        </button>
      </header>

      <h1>Casos Cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incidents.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>
            
            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>
            
            <strong>VALOR:</strong>
            <p>
            {
              Intl.NumberFormat('pt-Br', { 
                style:'currency', 
                currency : 'BRL' 
                })
              .format(incident.value) 
            }
            </p>
            <button type="button" 
              onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b2"></FiTrash2>
            </button>
          </li>
        ))}
        
      </ul>
    </div>
  );
}