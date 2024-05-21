import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';
import { Feather } from '@expo/vector-icons';
import logoImg from '../../assets/logo.png';
import styles from './style';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [totalIncidents, setTotalIncidents] = useState(0);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navagation = useNavigation();

  function navigateToDatail(incident){
    navagation.navigate('Detail', { incident });
  }

  async function loadIncidents() {
    if(loading)
      return;

    if(totalIncidents > 0 && incidents.length === totalIncidents)
      return;

    setLoading(true);
    
    const response = await api.get('incidents',{
      params: { page }
    });
    setIncidents([...incidents,...response.data]);
    setTotalIncidents(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }
  useEffect(()=>{
    loadIncidents();
  },[]);

  return (
    <View style={styles.conteiner}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{totalIncidents} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
    
      <FlatList 
        data={incidents}
        style={styles.incidentsList}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({item : incident}) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>Caso:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>
          
            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>{
              Intl.NumberFormat('pt-BR', { 
                  style: 'currency', 
                  currency:'BRL'
                }).format(incident.value)
              }
            </Text>
            <TouchableOpacity 
              style={styles.detailsButton}
              onPress={() => navigateToDatail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041"></Feather>          
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}