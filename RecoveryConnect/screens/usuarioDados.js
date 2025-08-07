import {View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function UsuarioDados({navigation}) {
  const user = [
    {
      nome: 'José Augusto',
      dataNascimento: '05/09/1965',
      email: 'jose.augusto@gmail.com',
      tel: '11 99451-8648',
      cidade: 'Taboão da Serra',
      cpf: '084.415.811-03',
    },
  ];

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={style.container}>
      <View style={style.header}/>

      <View style={{marginTop: 30, width: '80%', flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity style={{padding: 10, marginRight: 10}} onPress={()=>navigation.navigate("Usuario")}>
          <Icon
            name={'arrow-left'}
            size={30}
          />
        </TouchableOpacity>
        <Text style={style.title}>Seus dados</Text>
      </View>
      
      <View style={{width:'80%'}}>
        <Text style={style.inputLabel}>Nome</Text>
        <TextInput style={style.textBox} value={user[0].nome} editable={false}/>
      </View>
      <View style={{width:'80%'}}>
        <Text style={style.inputLabel}>Data de nascimento</Text>
        <TextInput style={style.textBox} value={user[0].dataNascimento} editable={false}/>
      </View>
      <View style={{width:'80%'}}>
        <Text style={style.inputLabel}>Email</Text>
        <TextInput style={style.textBox} value={user[0].email} editable={false}/>
      </View>
      <View style={{width:'80%'}}>
        <Text style={style.inputLabel}>Telefone</Text>
        <TextInput style={style.textBox} value={user[0].tel} editable={false}/>
      </View>
      <View style={{width:'80%'}}>
        <Text style={style.inputLabel}>Cidade</Text>
        <TextInput style={style.textBox} value={user[0].cidade} editable={false}/>
      </View>
      <View style={{width:'80%'}}>
        <Text style={style.inputLabel}>CPF</Text>
        <TextInput style={style.textBox} value={user[0].cpf} editable={false}/>
      </View>

      <View style={style.line}/>

      <View style={{width:'80%'}}>
        <Text style={style.inputLabel}>Alterar senha</Text>
        <View style={style.passwordContainer}>
          <TextInput style={style.passwordInput} placeholder='Senha atual' placeholderTextColor='lightGray' secureTextEntry={!showPassword}/>
          <TouchableOpacity 
            style={style.eyeIcon} 
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons 
              name={showPassword ? "eye-off" : "eye"}
              size={24} 
              color="gray" 
            />
          </TouchableOpacity>
        </View>
        <View style={style.passwordContainer}>
          <TextInput style={style.passwordInput} placeholder='Sua Nova Senha' placeholderTextColor='lightGray' secureTextEntry={!showPassword}/>
          <TouchableOpacity 
            style={style.eyeIcon} 
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons 
              name={showPassword ? "eye-off" : "eye"}
              size={24} 
              color="gray" 
            />
          </TouchableOpacity>
        </View>
        <View style={style.passwordContainer}>
          <TextInput style={style.passwordInput} placeholder='Confirme sua Nova Senha' placeholderTextColor='lightGray' secureTextEntry={!showPassword}/>
          <TouchableOpacity 
            style={style.eyeIcon} 
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons 
              name={showPassword ? "eye-off" : "eye"}
              size={24} 
              color="gray" 
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={style.button}>
        <Text style={{alignSelf:'center',fontWeight:'bold',}}>Alterar</Text>
      </TouchableOpacity>
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
  },

  inputLabel: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 24,
    marginHorizontal: 15,
    marginTop: 5,
  },
  textBox:{
    borderRadius: 10,
    borderWidth: 1,
    borderColor:'gray',
    padding:5,
    paddingLeft:17,
    marginHorizontal:5,
    width:'100%',
    color: '#333333'
  },

  line: {
    backgroundColor: '#333333',
    height: 1,
    width: '80%',
    margin: 15,
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
    width: '100%',
    margin: 5,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 17,
  },

  button:{
    backgroundColor:'#5ce1e6',
    borderRadius:100,
    padding: 10,
    width:'60%',
    marginTop: 30,
  },
});