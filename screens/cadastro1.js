import {  SafeAreaView ,View, Text, TextInput, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Cadastro1({navigation}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={est.container}>
      <Image
        source={require('../imagens/RecoveryConnect.png')}
        style={est.logo}
      />

      <Text style={est.title}>
        Conclua o cadastro!
      </Text>
      
      <TextInput style={est.textBox} placeholder='E-mail' placeholderTextColor='lightGray'/>
      <TextInput style={est.textBox} placeholder='Telefone' placeholderTextColor='lightGray'/>

      <View style={est.passwordContainer}>
        <TextInput style={est.passwordInput} placeholder='Crie sua Senha' placeholderTextColor='lightGray' secureTextEntry={!showPassword}/>
        <TouchableOpacity 
          style={est.eyeIcon} 
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons 
            name={showPassword ? "eye-off" : "eye"}
            size={24} 
            color="gray" 
          />
        </TouchableOpacity>
      </View>
      <View style={est.passwordContainer}>
        <TextInput style={est.passwordInput} placeholder='Confirme sua Nova Senha' placeholderTextColor='lightGray' secureTextEntry={!showPassword}/>
        <TouchableOpacity 
          style={est.eyeIcon} 
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons 
            name={showPassword ? "eye-off" : "eye"}
            size={24} 
            color="gray" 
          />
        </TouchableOpacity>
      </View>

      <View style={est.buttonContainer}>
        <TouchableOpacity style={est.button} onPress={()=>navigation.navigate("Escolha")}>
          <Text style={{alignSelf:'center',fontWeight:'bold',}}>Cadastrar</Text>
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

  eyeIcon: {
    paddingHorizontal: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor:'gray',
    width: '80%',
    margin: 5,
    marginVertical: 10,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 20,
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