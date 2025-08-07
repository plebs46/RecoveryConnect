import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';

const InfMedico = ({ route, navigation }) => {
  const { medico } = route.params;

  return (
    <View style={style.container}>
      <View style={style.header}/>
      <View style={{width: '90%'}}>
        <TouchableOpacity style={style.back} onPress={()=>navigation.goBack()}>
          <Icon
            name={'arrow-left'}
            size={30}
          />
        </TouchableOpacity>
      </View>

      <Image style={style.foto} source={medico.foto}/>
      <Text style={style.title}>{medico.nome}</Text>
      <View style={{width: '80%'}}>
        <View style={style.infCont}>
          <MaterialIcons name="business" size={20} color="blue" />
          <Text style={style.text}>{medico.formacao}</Text>
        </View>
        <View style={style.infCont}>
          <FontAwesome name="calendar" size={20} color="red" />
          <Text style={style.text}>{medico.dias}</Text>
        </View>
        <View style={style.infCont}>
          <Feather name="clock" size={20} color="skyblue" />
          <Text style={style.text}>{medico.hora}</Text>
        </View>
        <View style={style.infCont}>
          <MaterialIcons name="medical-services" size={20} color="black" />
          <Text style={style.text}>{medico.formato}</Text>
        </View>
        <View style={style.infCont}>
          <MaterialIcons name="location-pin" size={20} color="red" />
          <Text style={style.text}>{medico.hosp}</Text>
        </View>
        <View style={style.infCont}>
          <FontAwesome name="star" size={20} color="orange" />
          <Text style={style.text}>{medico.rating} {medico.quantR}</Text>
        </View>
        <View style={style.infCont}>
          <MaterialIcons name="attach-money" size={20} color="green" />
          <Text style={style.text}>{medico.valor}</Text>
        </View>
      </View>
      <TouchableOpacity style={style.button} onPress={()=>navigation.navigate("Agendamento")}>
        <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>Agendar</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 10,
  },
  back: {
    margin: 10,
    padding: 10,
  },
  text: {
    fontSize: 18,
    marginLeft: 8,
  },
  infCont: {
    flexDirection: 'row',
    marginVertical: 7.5,
    paddingHorizontal: 20,
  },
  foto: {
    height: 200,
    width: 200,
    marginBottom: 20,
  },
  button:{
    backgroundColor:'#5ce1e6',
    borderRadius:100,
    padding: 10,
    width:'50%',
    marginTop: 20,
    marginBottom: 5,
  },
});

export default InfMedico;