import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { googleKey } from '../constants/supabase';

export default function ClinicasMapa() {
  const [clinicaSelecionada, setClinicaSelecionada] = useState(null);

  const [clinicas, setClinicas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarClinicas = async () => {
      try {
        const { data, error } = await supabase
          .from('organizacao')
          .select(`
            codigo,
            nome,
            imagem_perfil,
            tipo,
            telefone,
            rede_social,
            endereco (
              cep,
              rua,
              numero,
              bairro,
              cidade,
              estado
            ),
            organizacao_horarios (
              dia_semana,
              hora_inicio,
              hora_fim
            )
          `);

        if (error) {
          console.error('Erro ao buscar organizações:', error);
          return;
        }

        const nomeDias = [
          'domingo',
          'segunda-feira',
          'terça-feira',
          'quarta-feira',
          'quinta-feira',
          'sexta-feira',
          'sábado',
        ];

        const clinicasFormatadas = data.map((item) => {
          const horarios = item.organizacao_horarios || [];

          const grupos = {};
          horarios.forEach((h) => {
            const faixa = `${h.hora_inicio.slice(0, 5)} - ${h.hora_fim.slice(0, 5)}`;
            if (!grupos[faixa]) grupos[faixa] = [];
            grupos[faixa].push(h.dia_semana);
          });

          const formatarDias = (dias) => {
            const ordem = ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo'];
            dias.sort((a, b) => ordem.indexOf(a) - ordem.indexOf(b));

            if (dias.length === 1) return dias[0];
            if (dias.length === 2) return `${dias[0]} e ${dias[1]}`;
            return `${dias[0]} a ${dias[dias.length - 1]}`;
          };

          const horariosTexto =
            Object.keys(grupos).length > 0
              ? Object.entries(grupos)
                .map(([faixa, dias]) => `${formatarDias(dias)}: ${faixa}`)
                .join('\n')
              : 'Horário não informado';

          return {
            id: item.codigo,
            nome: item.nome,
            telefone: item.telefone ?? 'Sem telefone',
            tipo: item.tipo ?? 'Não informado',
            rede_social: item.rede_social,
            imagem: item.imagem_perfil
              ? { uri: item.imagem_perfil }
              : require('../imagens/logoEx.png'),
            endereco: Array.isArray(item.endereco) && item.endereco.length > 0
              ? `${item.endereco[0].rua}, ${item.endereco[0].numero} - ${item.endereco[0].bairro}, ${item.endereco[0].cidade} - ${item.endereco[0].estado}, ${item.endereco[0].cep}`
              : 'Endereço não informado',
            horarios: horariosTexto,
          };
        });

        setClinicas(clinicasFormatadas);
      } catch (err) {
        console.error('Erro inesperado:', err);
      } finally {
        setLoading(false);
      }
    };

    carregarClinicas();
  }, []);

  const getCoordinates = async (address) => {
    try {
      const apiKey = googleKey;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return {
          latitude: location.lat,
          longitude: location.lng,
        };
      } else {
        Alert.alert('Erro', 'Endereço não encontrado.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar coordenadas:', error);
      Alert.alert('Erro', 'Não foi possível converter o endereço.');
      return null;
    }
  };

  const handleSelecionarClinica = async (item) => {
    const coords = await getCoordinates(item.endereco);

    if (coords) {
      setClinicaSelecionada({
        ...item,
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#5ce1e6" />
        <Text style={{ textAlign: 'center', marginTop: 10 }}>Carregando organizações...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tituloLista}>Procure uma organização</Text>
      {!clinicaSelecionada ? (
        <FlatList
          data={clinicas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handleSelecionarClinica(item)}>
              <Image source={item.imagem} style={styles.imagemClinica} />
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.endereco}>{item.endereco}</Text>
              <Text style={styles.info}>🕒 {item.horarios}</Text>
              <Text style={styles.info}>📞 {item.telefone}</Text>
              <Text style={styles.info}>🏷️ {item.tipo}</Text>
              {item.rede_social ? (
                <Text style={styles.info}>🌐 {item.rede_social}</Text>
              ) : null}
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.mapaContainer}>
          <Text style={styles.tituloMapa}>
            Localização: {clinicaSelecionada.nome}
          </Text>
          <MapView
            provider='google'
            style={styles.mapa}
            initialRegion={{
              latitude: clinicaSelecionada.latitude,
              longitude: clinicaSelecionada.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: clinicaSelecionada.latitude,
                longitude: clinicaSelecionada.longitude,
              }}
              title={clinicaSelecionada.nome}
              description={clinicaSelecionada.endereco}
            />
          </MapView>
          <TouchableOpacity style={styles.botaoFechar} onPress={() => setClinicaSelecionada(null)}>
            <Text style={styles.textoFechar}>Fechar mapa</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  tituloLista: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#444',
  },
  card: {
    padding: 15,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  endereco: {
    fontSize: 14,
    color: '#555',
  },
  mapaContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  tituloMapa: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  mapa: {
    flex: 1,
    borderRadius: 10,
  },
  botaoFechar: {
    backgroundColor: '#5ce1e6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  textoFechar: {
    color: 'white',
    fontWeight: 'bold',
  },
  imagemClinica: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 10,
    alignSelf: 'center',
  },
  info: {
    fontSize: 13,
    color: '#444',
    marginTop: 2,
  },
});