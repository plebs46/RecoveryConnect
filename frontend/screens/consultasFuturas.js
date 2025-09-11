import {View, Text, TouchableOpacity, Image, StyleSheet, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react';

export default function ConsultasFuturas({navigation}) {
  const medPresentes = 
    [
      {
        id: 1,
        foto: require('../imagens/medico/mdc1.png'),
        rating: '⭐⭐⭐⭐⭐',
        quantR: '(102)',
        nome: 'Marcos Henrique Santos',
        hosp: 'Psicologia Taboão da Serra',
        endereco: 'Av. Vida Nova, 28 - 901 A, Jardim Maria Rosa, Taboão da Serra - SP, 06768-000',
        valor: '180,00',
        formacao: 'Faculdade de Medicina da Universidade de São Paulo',
        dias: 'Domingo a Sexta',
        hora: '9:00 - 18:00',
        formato: 'Online / Presencial',
      },
      {
        id: 2,
        foto: require('../imagens/medico/mdc2.png'),
        rating: '⭐⭐⭐⭐⭐',
        quantR: '(284)',
        nome: 'Laurêncio Gonzales Pinto',
        hosp: 'Hospital Elma Mário',
        endereco: 'Av. Armando de Andrade, 346, Parque Santos Dumont, Taboão da Serra - SP, 06754-210',
        valor: '106,90',
        formacao: 'Faculdade de Medicina da Universidade de São Paulo',
        dias: 'Segunda a Sexta',
        hora: '9:00 - 18:00',
        formato: 'Online / Presencial',
      },
      {
        id: 3,
        foto: require('../imagens/medico/mdc3.png'),
        rating: '⭐⭐⭐⭐⭐',
        quantR: '(157)',
        nome: 'Ana Maria Beto',
        hosp: 'Hospital Santos Pereira',
        endereco: 'Estr. São Francisco, 2008, Jardim Wanda, Taboão da Serra - SP, 06765-904',
        valor: '74,99',
        formacao: 'Faculdade de Medicina da Universidade de São Paulo',
        dias: 'Segunda a Sábado',
        hora: '9:00 - 18:00',
        formato: 'Online / Presencial',
      },
    ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={style.card} onPress={() => handlePress(item)}>
      <View style={{flexDirection: 'column', alignItems: 'center', marginRight: 15}}>
        <Image style={style.foto} source={item.foto}/>
        <Text style={{fontSize: 14}}>{item.rating}</Text>
        <Text style={style.rating}>{item.quantR}</Text>
      </View>
      <View style={{flexDirection: 'column'}}>
        <Text style={style.nome}>{item.nome}</Text>
        <Text style={style.text}>{item.hosp}</Text>
        <View style={{flexDirection: 'row'}}>
          <Icon name="map-marker" size={20} color="#E74C3C" style={{top: 5}}/>
          <Text style={style.endereco}>{item.endereco}</Text>
        </View>
        <Text style={style.text}>R${item.valor}</Text>
      </View>
    </TouchableOpacity>
  );

  const handlePress = (medico) => {
    navigation.navigate('InfMedico', { medico });
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>Com quem você quer falar?</Text>
      <FlatList
        data={medPresentes}
        style={{width: '90%', padding: 5}}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: 'white',
    alignItems:'center',
  },

  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#5ce1e6',
    borderRadius: 15,
    paddingTop: 50,
    width: '100%'
  },
  buttonInactive: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 15,
    alignItems: 'center',
    marginRight: 5,
  },
  buttonActive: {
    flex: 1,
    backgroundColor: '#5ce1e6',
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },

  listContainer: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  item: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    marginHorizontal: 5,
    borderRadius: 20,
    padding: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 30,
    marginBottom: 7.5,
  },
  month: {
    fontSize: 16,
    marginVertical: 7.5,
  },

  card: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c0c0c0',
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  foto: {
    height: 70,
    width: 70,
    padding: 10,
  },
  rating: {
    color: '#c0c0c0',
    fontSize: 14,
    marginTop: 5,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 3,
  },
  text: {
    fontSize: 16,
    marginVertical: 3,
  },
  endereco: {
    fontSize: 16,
    marginVertical: 3,
    width: '80%',
    marginLeft: 3,
  },
});