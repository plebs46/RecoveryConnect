import {View, Text, TouchableOpacity, Image, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';

export default function Usuario({navigation}) {
  const user = [
    {
      nome: 'José Augusto',
      dataNascimento: '05/09/1965',
      email: 'jose.augusto@gmail.com',
    },
  ];

  return (
    <View style={style.container}>
      <View style={style.header}/>
      <View style={{marginTop: 30, width: '80%'}}><Text style={style.title}>{"Olá, " + user[0].nome}</Text></View>
      <Image style={style.userfoto} source={require('../imagens/usericon.png')}/>
      <TouchableOpacity style={{padding: 10}}>
        <Text style={style.changeImg}>Mudar imagem</Text>
      </TouchableOpacity>

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

      <View style={style.line}/>

      <View style={style.menuContainer}>
        <TouchableOpacity style={style.menuButton} onPress={()=>navigation.navigate("UsuarioDados")}>
          <Icon
            name={'account-outline'}
            size={25}
          />
          <Text style={style.menuText}>Seus dados</Text>
          <Icon
            name={'arrow-right'}
            size={20}
            style={{marginLeft: '55%'}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={style.menuButton} onPress={()=>navigation.navigate("Notificacao")}>
          <Icon
            name={'bell-outline'}
            size={25}
          />
          <Text style={style.menuText}>Notificação</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.menuButton}>
          <Icon
            name={'email-outline'}
            size={25}
          />
          <Text style={style.menuText}>Contato</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.menuButton}>
          <Icon
            name={'comment-outline'}
            size={25}
          />
          <Text style={style.menuText}>Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.menuButton}>
          <Icon
            name={'logout'}
            size={25}
            color={'red'}
          />
          <Text style={[style.menuText,{color: 'red'}]}>Sair</Text>
        </TouchableOpacity>
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

  userfoto: {
    height: 150,
    width: 150,
    marginTop: 10,
  },
  changeImg: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },

  inputLabel: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 24,
    marginHorizontal: 15,
  },
  textBox:{
    borderRadius: 10,
    borderWidth: 1,
    borderColor:'gray',
    padding:5,
    paddingLeft:17,
    margin:5,
    width:'100%',
    color: '#333333'
  },

  line: {
    backgroundColor: '#333333',
    height: 1,
    width: '80%',
    margin: 15,
  },

  menuContainer: {
    width: '80%',
    height: 250,
    borderWidth: 3,
    borderColor: '#e5e5e5',
    borderRadius: 20,
    padding: 10,
  },
  menuButton: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    paddingHorizontal: 5,
  },
});