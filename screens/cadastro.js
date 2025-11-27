import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { supabase } from '../lib/supabase';
import CheckBox from "./../components/CheckBox";

export default function Cadastro({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [aceitou, setAceitou] = useState(false);

  const [erroEmail, setErroEmail] = useState('');
  const [erroSenha, setErroSenha] = useState('');
  const [erroConfirm, setErroConfirm] = useState('');
  const [senhaTocada, setSenhaTocada] = useState(false);
  const [senhaConfTocada, setSenhaConfTocada] = useState(false);

  const formValido =
    nome.trim().length > 0 &&
    email.trim().length > 0 &&
    cidade.trim().length > 0 &&
    senha.trim().length > 0 &&
    confirmSenha.trim().length > 0 &&
    senha === confirmSenha &&
    validarEmail(email) &&
    aceitou &&
    !erroEmail &&
    !erroSenha &&
    !erroConfirm;

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };


  function handleCheck() {
    setAceitou((prev) => !prev);
  }

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
          senha: senha,
        }
      }
    })

    if (!error) {
      await supabase.from('clientes').insert({
        user_id: data.user.id,
        nome_usuario: nome,
        cidade: cidade,
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

          <TextInput style={est.textBox} placeholder='Nome de Usuário' placeholderTextColor='#888' value={nome} onChangeText={setNome} />
          <TextInput
            style={[
              est.textBox,
              erroEmail && { borderColor: 'red' }
            ]}
            placeholder='E-mail'
            placeholderTextColor='#888'
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            keyboardType="email-address"
            importantForAutofill="no"
            autoComplete="off"
            textContentType="none"
            value={email}
            onChangeText={(t) => {
              setEmail(t);
              if (!validarEmail(t)) setErroEmail('E-mail inválido');
              else setErroEmail('');
            }}
          />
          {erroEmail.length > 0 && (
            <Text style={{ color: 'red', fontSize: 11, width: '80%', paddingLeft: 10 }}>{erroEmail}</Text>
          )}
          <TextInput style={est.textBox} placeholder='Cidade' placeholderTextColor='#888' value={cidade} onChangeText={setCidade} />

          <View
            style={[
              est.passwordContainer,
              !erroSenha && senhaTocada && { borderColor: 'red' }
            ]}>
            <TextInput
              style={est.passwordInput}
              placeholder='Crie sua Senha'
              placeholderTextColor='#888'
              secureTextEntry={!showPassword}
              value={senha}
              onFocus={() => setSenhaTocada(true)}
              onChangeText={(t) => {
                setSenha(t);
                if (t.length < 6) setErroSenha('A senha deve ter pelo menos 6 caracteres');
                else setErroSenha('');
              }}
            />
            <TouchableOpacity
              style={est.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color='gray' />
            </TouchableOpacity>
          </View>
          {erroSenha.length > 0 && (
            <Text style={{ color: 'red', fontSize: 11, width: '80%', paddingLeft: 10 }}>{erroSenha}</Text>
          )}

          <View
            style={[
              est.passwordContainer,
              !confirmSenha && senhaConfTocada && { borderColor: 'red' }  // <— borda no container!
            ]}>
            <TextInput
              style={est.passwordInput}
              placeholder='Confirme sua Nova Senha'
              placeholderTextColor='#888'
              secureTextEntry={!showPassword}
              value={confirmSenha}
              onFocus={() => setSenhaConfTocada(true)}
              onChangeText={(t) => {
                setConfirmSenha(t);
                if (t !== senha) setErroConfirm('As senhas não coincidem');
                else setErroConfirm('');
              }}
            />
            <TouchableOpacity
              style={est.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color='gray' />
            </TouchableOpacity>
          </View>
          {erroConfirm.length > 0 && (
            <Text style={{ color: 'red', fontSize: 11, width: '80%', paddingLeft: 10 }}>{erroConfirm}</Text>
          )}

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '70%' }}>
            <CheckBox
              label=""
              value={aceitou}
              onChange={handleCheck}
            />
            <Text style={{ fontSize: 12 }}>Li e concordo com os
              <Text
                style={{
                  color: "#5ce1e6",
                  textDecorationLine: "underline",
                  fontWeight: "500",
                }}
                onPress={() =>
                  Linking.openURL(
                    "https://gntknwmgxgvgxffxdwin.supabase.co/storage/v1/object/public/Documentos/politica-de-seguranca-RecoveryConnect.pdf"
                  )
                }
              >
                Termos de Uso e Política de Privacidade
              </Text>
            </Text>
          </View>

          <TouchableOpacity
            style={[
              est.button,
              !formValido && { backgroundColor: '#cececeff', }
            ]}
            disabled={!formValido}
            onPress={handleSignUp}
          >
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
    color: '#141414ff'
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