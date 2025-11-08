import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function UsuarioDados({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={est.container}>
      <View style={est.header} />

      <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%', marginTop: 50, marginBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/arrowLeft.png')} style={{ marginRight: 20 }} />
        </TouchableOpacity>
        <Text style={est.title}>
          Alterar senha
        </Text>
      </View>

      <View style={{ width: '100%', marginBottom: 30, alignItems: 'center' }}>
        <Text style={est.label}>Senha atual</Text>
        <View style={est.passwordContainer}>
          <TextInput style={est.passwordInput} placeholder='Digite sua senha atual' placeholderTextColor='lightGray' secureTextEntry={!showPassword} />
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

        <View style={{ width: '80%', flexDirection: 'row-reverse', }}>
          <TouchableOpacity style={est.esqueci}>
            <Text style={{ color: '#ababab' }}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ width: '100%', marginBottom: 10, alignItems: 'center' }}>
        <Text style={est.label}>Nova senha</Text>
        <View style={est.passwordContainer}>
          <TextInput style={est.passwordInput} placeholder='Digite a nova senha' placeholderTextColor='lightGray' secureTextEntry={!showPassword} />
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
          <TextInput style={est.passwordInput} placeholder='Confirme a nova senha' placeholderTextColor='lightGray' secureTextEntry={!showPassword} />
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
      </View>

      <View style={{ width: '60%', marginTop: 20, marginBottom: 30 }}>
        <Text style={est.senhaReq}>*Atenção! A senha deve conter:</Text>
        <Text style={est.senhaReq}> - Ao mínimo 6 caracteres;</Text>
        <Text style={est.senhaReq}> - Uma letra maiúscula;</Text>
        <Text style={est.senhaReq}> - Uma letra minúscula;</Text>
        <Text style={est.senhaReq}> - Um número;</Text>
      </View>

      <View style={est.buttonContainer}>
        <TouchableOpacity style={est.button} onPress={salvarDados}>
          <Text style={{ alignSelf: 'center', fontWeight: 'bold', }}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function salvarDados() {
  alert("Senha atualizada!");
}

const est = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: '#5CE1E6',
    height: 70,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    width: '80%',
    margin: 5,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 17,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    width: '80%',
  },
  senhaReq: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'left',
    marginBottom: 2,
  },
  button: {
    backgroundColor: '#5ce1e6',
    borderRadius: 100,
    padding: 10,
    width: '100%',
    marginTop: 30,
    marginBottom: 120,
  },

  buttonContainer: {
    width: '80%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});