import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function ClinicasMapa() {
  const [clinicaSelecionada, setClinicaSelecionada] = useState(null);

  const clinicas = [
    {
      id: '1',
      nome: 'AmorSaúde Taboão da Serra',
      endereco: 'Av. Dr. José Maciel, 688 - Taboão da Serra',
      latitude: -23.612980560824774,
      longitude: -46.76352812301982,
      telefone: '(11) 3132-8738',
      horarioSemana: 'Segunda a Sexta 7:00 - 18:00',
      avaliacao: '⭐⭐⭐ (367)',
      imagem: require('../imagens/amor-saude-foto.jpeg'),
    },
    {
      id: '2',
      nome: 'Psicologia Taboão da Serra',
      endereco: 'Av. Vida Nova, 28 - Taboão da Serra',
      latitude: -23.60962169397969, 
      longitude: -46.769529375695434,
      telefone: '(11) 98515-4367',
      horarioSemana: 'Segunda a Sexta 8:00 - 21:00',
      avaliacao: '⭐⭐⭐⭐⭐ (19)',
      imagem: require('../imagens/psicoTaboao.png'),
    },
    {
      id: '3',
      nome: 'Clínica Master Health',
      endereco: 'Rua B, 456 - Taboão da Serra',
      latitude: -23.610616595326317, 
      longitude: -46.75891965850886,
      telefone: '(11) 98515-4367',
      horarioSemana: 'Segunda a Sexta 9:00 - 19:00',
      avaliacao: '⭐⭐⭐⭐⭐ (280)',
      imagem: require('../imagens/logoEx.png'),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.tituloLista}>Procure uma organização</Text>
      {!clinicaSelecionada ? (
        <FlatList
          data={clinicas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => setClinicaSelecionada(item)}>
              <Image source={item.imagem} style={styles.imagemClinica} />
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.endereco}>{item.endereco}</Text>
              <Text style={styles.info}>📞 {item.telefone}</Text>
              <Text style={styles.info}>🕘 {item.horarioSemana}</Text>
              <Text style={styles.info}>👍 {item.avaliacao}</Text>
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
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  info: {
    fontSize: 13,
    color: '#444',
    marginTop: 2,
  },
});