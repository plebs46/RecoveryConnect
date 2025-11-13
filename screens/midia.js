import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Linking, Dimensions, ActivityIndicator } from 'react-native';
import { supabase } from '../lib/supabase';
import React, { useEffect, useState } from 'react';

export default function Midia({ navigation }) {
  const [midia, setMidia] = useState([]);
  const [nossasObras, setNossasObras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConteudo = async () => {
      try {
        // Busca todos os conteúdos
        const { data, error } = await supabase
          .from('conteudo_digital')
          .select('*')
          .order('data_publicacao', { ascending: false });

        if (error) throw error;

        // Separa por tipo
        const midiaList = data.filter(item => item.tipo === 'midia');
        const obrasList = data.filter(item => item.tipo === 'obra');

        setMidia(midiaList);
        setNossasObras(obrasList);
      } catch (error) {
        console.error('Erro ao buscar conteúdos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConteudo();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={style.card} onPress={() => Linking.openURL(item.link)}>
      {item.imagem_url ? (
        <Image style={style.imagem} source={{ uri: item.imagem_url }} />
      ) : null}
      <Text style={style.tituloMidia}>{item.titulo}</Text>
      <Text style={style.data}>{item.data_publicacao}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[style.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={style.container}>
      <View style={style.header} />

      <Text style={style.title}>Obras recomendadas</Text>
      <FlatList
        style={{ width: '90%', padding: 5 }}
        data={midia}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={style.title}>Produzidas pela equipe</Text>
      <FlatList
        style={{ width: '90%', padding: 5 }}
        data={nossasObras}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#5ce1e6',
    height: 50,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    width: '80%',
  },

  card: {
    backgroundColor: '#F3FFFF',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    marginVertical: 10,
    marginHorizontal: 10,
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').height * 0.32,
  },
  tituloMidia: {
    fontSize: 16,
    marginVertical: 10,
    width: '90%',
    height: '35%',
  },
  imagem: {
    width: '100%',
    height: '50%',
    borderRadius: 10,
  },
  data: {
    fontSize: 14,
    color: '#c0c0c0',
    height: '10%',
  }
});