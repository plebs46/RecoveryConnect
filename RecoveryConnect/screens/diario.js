import {View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Date} from 'react-native';
import Footer from '../components/Footer';

export default function Diario({navigation, route}) {
  const diarios = [
    {
      id:1,
      icon:require('../imagens/mediaDia/MuitoBom.png'),
      data:'12 de janeiro',
      mediaDia:'MUITO BOM',
      produtividade:'Bom',
      controle:'Moderado',
      tempo:'Bastante',
      coment:'',
    },
    {
      id:2,
      icon:require('../imagens/mediaDia/Bom.png'),
      data:'11 de janeiro',
      mediaDia:'BOM',
      produtividade:'Bom',
      controle:'Moderado',
      tempo:'Moderado',
      coment:'',
    },
    {
      id:3,
      icon:require('../imagens/mediaDia/MuitoRuim.png'),
      data:'09 de janeiro',
      mediaDia:'MUITO RUIM',
      produtividade:'Ruim',
      controle:'Sem',
      tempo:'Sem',
      coment:'Dia péssimo. Preciso melhorar urgente...',
    },
    {
      id:4,
      icon:require('../imagens/mediaDia/Ruim.png'),
      data:'08 de janeiro',
      mediaDia:'RUIM',
      produtividade:'Ruim',
      controle:'Ruim',
      tempo:'Moderado',
      coment:'',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={style.card}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image style={style.icon} source={item.icon}/>
        <View style={{flexDirection: 'column'}}>
          <Text style={style.data}>{item.data}</Text>
          <Text style={style.mediaDia}>{"O seu dia foi " + item.mediaDia}</Text>
        </View>
      </View>
      <Text style={style.dados}>{"Produtividade " + item.produtividade + ", controle " + item.controle + ", " + item.tempo + " tempo"}</Text>
      <Text style={style.coment}>{item.coment}</Text>
    </View>
  );

  return (
    <View style={style.container}>
      <View style={style.header}/> 
      <Text style={style.title}>Seus registros</Text>

      <View style={style.novoCont}>
        <Text style={style.subtitle}>Registre o seu dia de hoje!</Text>
        <View style={style.buttonCont}>
          <Text style={style.text}>Faça seu diário clicando no botão ao lado.</Text>
          <TouchableOpacity style={style.button} onPress={()=>navigation.navigate("DiarioNovo")}>
            <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>Escrever</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        style={{width: '90%', padding: 5}}
        data={diarios}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <Footer/>
        }
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
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    width: '80%',
    marginBottom: 20,
    marginTop: 30,
  },

  subtitle:{
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    marginHorizontal: 11,
    flex: 5,
  },

  button: {
    backgroundColor:'#5ce1e6',
    borderRadius:100,
    padding: 10,
    flex: 3,
  },
  buttonCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  novoCont: {
    backgroundColor: '#DEFFFF',
    padding: 10,
    width: '85%',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    marginBottom: 20,
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
    marginHorizontal: 3,
    width: '100%',
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  data: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 3,
  },
  mediaDia: {
    fontSize: 16,
  },
  dados: {
    fontSize: 14,
    marginTop: 5,
    maxWidth: '80%',
    marginLeft: 10,
  },
  coment: {
    fontSize: 14,
    marginTop: 7,
    maxWidth: '80%',
    marginLeft: 10,
    marginBottom: 5,
  },
});