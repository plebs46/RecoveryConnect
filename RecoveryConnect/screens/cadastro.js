import {  SafeAreaView ,View, Text, TextInput, TouchableOpacity, Image, StyleSheet} from 'react-native';

export default function Cadastro({navigation}) {
  return (
    <SafeAreaView style={est.container}>
      <Image
        source={require('../imagens/RecoveryConnect.png')}
        style={est.logo}
      />

      <Text style={est.title}>
        Crie a sua conta!
      </Text>
      
      <TextInput style={est.textBox} placeholder='Nome de Usuário' placeholderTextColor='lightGray'/>
      <TextInput style={est.textBox} placeholderTextColor='lightGray' placeholder="DD/MM/AAAA" keyboardType="numeric" maxLength={10}/>
      <TextInput style={est.textBox} placeholder='CPF' placeholderTextColor='lightGray'/>
      <TextInput style={est.textBox} placeholder='Cidade' placeholderTextColor='lightGray'/>

      <View style={est.buttonContainer}>
        <TouchableOpacity style={est.button} onPress={()=>navigation.navigate("Cadastro1")}>
          <Text style={{alignSelf:'center',fontWeight:'bold',}}>Continuar</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: '30%'}}>
          <Text style={est.textCadlog}>
            Já possui uma conta?
          </Text>
          <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
            <Text style={est.cadlogNav}>
              Entre
            </Text>
          </TouchableOpacity>
          <Text style={est.textCadlog}>
            agora!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const est = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: 'white',
    alignItems:'center',
  },

  logo: {
    height: '25%',
    width: '60%',
    marginTop: 40,
  },

  title:{
    fontSize:24,
    fontWeight:'bold',
    marginBottom: 20,
  },

  button:{
    backgroundColor:'#5ce1e6',
    borderRadius:100,
    padding: 10,
    width:'100%',
  },

  buttonContainer: {
    width:'80%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems:'center'
  },

  textCadlog:{
    fontFamily: 'Arial',
    fontSize: 12,
    color:'#ababab',
  },
  cadlogNav:{
    fontFamily: 'Arial',
    fontSize: 12,
    color:'#5CE1E6',
    paddingHorizontal: 4,
    paddingVertical: 5,
  },
  textBox:{
    borderRadius: 10,
    borderWidth: 1,
    borderColor:'gray',
    padding:12,
    paddingLeft:17,
    margin:5,
    width:'80%',
    marginVertical: 10,
  },
});