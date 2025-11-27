import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';

export default function Login({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: senha,
    });

    if (error) {
      alert('Erro ao entrar: ' + error.message);
      setLoading(false);
      return;
    }

    const tipo = data.user?.user_metadata?.tipo_conta;

    if (tipo !== 'paciente') {
      alert('Erro ao entrar');
      setLoading(false);
      return;
    }

    setLoading(false);
    navigation.replace('Main');
  }

  return (
    <SafeAreaView style={est.container}>
      <Image
        source={require('../imagens/RecoveryConnect.png')}
        style={est.logo}
      />

      <Text style={est.title}>
        Entre na sua conta!
      </Text>

      <TextInput
        style={est.textBox}
        placeholder='E-mail'
        placeholderTextColor='#888'
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        keyboardType="email-address"
        importantForAutofill="no"
        autoComplete="off"
        textContentType="none"
      />

      <View style={est.passwordContainer}>
        <TextInput 
          style={est.passwordInput} 
          placeholder='Senha'
          placeholderTextColor='#888'
          secureTextEntry={!showPassword}
          value={senha}
          onChangeText={setSenha}
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
        />
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

      <View style={est.buttonContainer}>
        <TouchableOpacity style={est.button} onPress={handleSignIn}>
          <Text style={{ alignSelf: 'center', fontWeight: 'bold', }}>{loading ? 'Carregando...' : 'Entrar'}</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Text style={est.textCadlog}>
            Ainda não possui uma conta?
          </Text>
          <TouchableOpacity onPress={() => navigation.replace("Cadastro")}>
            <Text style={est.cadlogNav}>
              Cadastre-se
            </Text>
          </TouchableOpacity>
          <Text style={est.textCadlog}>
            agora!
          </Text>
        </View>
        <TouchableOpacity style={{ marginBottom: '25%', padding: 20 }} onPress={() => navigation.replace("TipoUser")}>
          <Text style={est.backButtonText}>Voltar à tela de seleção de perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const est = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
  },

  logo: {
    height: '25%',
    width: '60%',
    marginTop: 40,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  esqueci: {
    fontFamily: 'Arial',
    fontSize: 12,
  },

  button: {
    backgroundColor: '#5ce1e6',
    borderRadius: 100,
    padding: 10,
    width: '100%',
  },

  buttonContainer: {
    width: '80%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  textCadlog: {
    fontFamily: 'Arial',
    fontSize: 12,
    color: '#ababab',
  },
  cadlogNav: {
    fontFamily: 'Arial',
    fontSize: 12,
    color: '#5CE1E6',
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
    borderColor: 'gray',
    width: '80%',
    margin: 5,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 17,
    color: '#141414ff'
  },
  textBox: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 12,
    paddingLeft: 17,
    margin: 5,
    width: '80%',
    marginVertical: 10,
  },
  backButtonText: {
    fontFamily: 'Arial',
    fontSize: 12,
    color: '#ababab',
  },
});
