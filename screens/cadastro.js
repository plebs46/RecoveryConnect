import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Alert, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaskedTextInput } from 'react-native-mask-text';
import { supabase } from '../lib/supabase';

export default function Cadastro({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: senha,
      options: {
        data: {
          tipo_conta: 'paciente',
          nome_usuario: nome,
          cidade: cidade,
          telefone: telefone,
          senha: senha,
        }
      }
    })

    if (!error) {
      await supabase.from('clientes').insert({
        user_id: data.user.id,
        nome_usuario: nome,
        cidade: cidade,
        telefone: telefone,
        senha: senha,
      });

      setLoading(false);
      navigation.replace('Escolha');
    }
    else {
      Alert.alert('Erro ao cadastrar', error.message);
      setLoading(false);
      return;
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <ScrollView
          contentContainerStyle={est.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={require('../imagens/RecoveryConnect.png')}
            style={est.logo}
          />

          <Text style={est.title}>Crie a sua conta!</Text>

          <TextInput style={est.textBox} placeholder='Nome de Usuário' placeholderTextColor='lightGray' value={nome} onChangeText={setNome} />
          <TextInput style={est.textBox} placeholder='E-mail' placeholderTextColor='lightGray' value={email} onChangeText={setEmail} />
          <TextInput style={est.textBox} placeholder='Cidade' placeholderTextColor='lightGray' value={cidade} onChangeText={setCidade} />
          <MaskedTextInput
            mask="(99) 99999-9999"
            onChangeText={(masked, unmasked) => {
              setTelefone(masked);
            }}
            value={telefone}
            style={est.textBox}
            placeholder="Telefone"
            placeholderTextColor="lightGray"
            keyboardType="numeric"
          />

          <View style={est.passwordContainer}>
            <TextInput
              style={est.passwordInput}
              placeholder='Crie sua Senha'
              placeholderTextColor='lightGray'
              secureTextEntry={!showPassword}
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity
              style={est.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color='gray' />
            </TouchableOpacity>
          </View>

          <View style={est.passwordContainer}>
            <TextInput
              style={est.passwordInput}
              placeholder='Confirme sua Nova Senha'
              placeholderTextColor='lightGray'
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={est.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color='gray' />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={est.button} onPress={handleSignUp}>
            <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>{loading ? 'Carregando...' : 'Cadastrar'}</Text>
          </TouchableOpacity>

          <View style={est.loginRow}>
            <Text style={est.textCadlog}>Já possui uma conta?</Text>
            <TouchableOpacity onPress={() => navigation.replace('Login')}>
              <Text style={est.cadlogNav}>Entre</Text>
            </TouchableOpacity>
            <Text style={est.textCadlog}>agora!</Text>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView >
    </SafeAreaView>
  );
}

const est = StyleSheet.create({
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 60,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  logo: {
    height: 200,
    width: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textBox: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 12,
    paddingLeft: 17,
    marginVertical: 10,
    width: '80%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    width: '80%',
    marginVertical: 10,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 20,
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#5ce1e6',
    borderRadius: 100,
    padding: 10,
    width: '80%',
    marginTop: 20,
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  textCadlog: {
    fontSize: 12,
    color: '#ababab',
  },
  cadlogNav: {
    fontSize: 12,
    color: '#5CE1E6',
    paddingHorizontal: 4,
    paddingVertical: 5,
  },
});