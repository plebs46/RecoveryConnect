import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

export default function Tutorial1({navigation}) {
  return (
    <View style={style.container}>
      <Image style={style.img} source={require('../imagens/tutorial1.png')}/>

      <Text style={style.title}>Como usar o aplicativo</Text>
      <Text style={style.text}>
        Use o <Text style={{fontWeight: 'bold'}}>diário</Text> para anotar seu progresso e manter a motivação em dia! Você pode rever o seu feito à partir dos seus relatos!
      </Text>

      <View style={style.buttonContainer}>
        <TouchableOpacity style={style.button} onPress={()=>navigation.navigate("Tutorial2")}>
          <Text style={{alignSelf:'center',fontWeight:'bold',}}>Prosseguir</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', width: '95%'}}>
          <View style={style.activeBar}/>
          <View style={style.inactiveBar}/>
          <View style={style.inactiveBar}/>
          <View style={style.inactiveBar}/>
        </View>
      </View>
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

  img: {
    width: '100%',
  },

  title:{
    fontSize: 28,
    fontWeight:'bold',
    marginTop: 35,
  },
  text: {
    width: '70%',
    fontSize: 17,
    lineHeight: 23,
    marginVertical: 15,
  },
  
  buttonContainer: {
    width: '60%',
    alignItems: 'center',  
  },
  button:{
    backgroundColor:'#5ce1e6',
    borderRadius:100,
    padding: 10,
    width:'100%',
    marginTop: 20,
    marginBottom: 5,
  },
  activeBar: {
    flex: 2,
    backgroundColor: '#99FFFF',
    borderRadius: 10,
    height: 7,
    marginTop: 5,
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  inactiveBar: {
    flex: 1,
    backgroundColor: '#DEFFFF',
    borderRadius: 10,
    height: 7,
    marginTop: 5,
    marginHorizontal: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
});