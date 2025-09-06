import {View, Text, TouchableOpacity, Image, StyleSheet, FlatList} from 'react-native';

export default function ConsultasPassadas({navigation}) {
  const medFut = [
    {
      id: 1,
      img: require('../imagens/medico/mdc1.png'),
      nome: 'Marcos Henrique Santos',
      hosp: 'Psicologia Taboão da Serra',
      formato: 'Online',
      data: '14 de janeiro',
      hora: '15:00',
    },
    {
      id: 2,
      img: require('../imagens/medico/mdc1.png'),
      nome: 'Marcos Henrique Santos',
      hosp: 'Psicologia Taboão da Serra',
      formato: 'Presencial',
      data: '21 de janeiro',
      hora: '10:00',
    },
    {
      id: 3,
      img: require('../imagens/medico/mdc3.png'),
      nome: 'Ana Maria Beto',
      hosp: 'Psicologia Pereira Santos',
      formato: 'Online',
      data: '30 de janeiro',
      hora: '18:00',
    },
  ];

  const medPas = [
    {
      id: 1,
      img: require('../imagens/medico/mdc3.png'),
      nome: 'Ana Maria Beto',
      hosp: 'Psicologia Pereira Santos',
      formato: 'Online',
      data: '28 de dezembro de 2023',
      hora: '15:00',
    },
    {
      id: 2,
      img: require('../imagens/medico/mdc3.png'),
      nome: 'Ana Maria Beto',
      hosp: 'Psicologia Pereira Santos',
      formato: 'Presencial',
      data: '21 de dezembro de 2023',
      hora: '10:00',
    },
    {
      id: 3,
      img: require('../imagens/medico/mdc2.png'),
      nome: 'Laurêncio Gonzales Pinto',
      hosp: 'Hospital Elma Mário',
      formato: 'Presencial',
      data: '01 de dezembro de 2023',
      hora: '9:00',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={style.card}>
      <Image style={style.imagem} source={item.img}/>
      <View style={{flexDirection: 'column'}}>
        <Text style={style.nome}>{item.nome}</Text>
        <Text style={style.hosp}>{item.hosp}</Text>
        <Text style={style.text}>{item.formato}</Text>
        <Text style={style.text}>{item.data}, às {item.hora}</Text>
      </View>
    </View>
  );

  return (
    <View style={style.container}>
      <View style={style.headerContainer}>
        <TouchableOpacity
          style={style.buttonActive}
          onPress={() => navigation.navigate('ConsultasFuturas')}
        >
          <Text style={style.buttonText}>Agendamento</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.buttonInactive}
          onPress={() => navigation.navigate('ConsultasPassadas')}
          disabled={true}
        >
          <Text style={style.buttonText}>Suas Consultas</Text>
        </TouchableOpacity>
      </View>

      <Text style={style.title}>Consultas futuras</Text>
      <FlatList
        style={{width: '90%', padding: 5}}
        data={medFut}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      <Text style={style.title}>Consultas anteriores</Text>
      <FlatList
        style={{width: '90%', padding: 5}}
        data={medPas}
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

  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 30,
    marginBottom: 10,
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
  imagem: {
    height: 70,
    width: 70,
    padding: 10,
    marginRight: 15,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 3,
  },
  hosp: {
    fontSize: 18,
    marginVertical: 3,
  },
  text: {
    fontSize: 16,
    marginVertical: 3,
  },
});