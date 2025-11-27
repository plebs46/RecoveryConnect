import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaskedTextInput } from 'react-native-mask-text';
import { useSignup } from '../context/UserSignupContext';
import CheckBox from '../components/CheckBox';

const data = [
  { label: 'Clínica pública', value: 'Clínica Pública' },
  { label: 'Clínica privada', value: 'Clínica Privada' },
  { label: 'ONG', value: 'ONG' },
  { label: 'Projetos de comunidades e igrejas', value: 'Projetos' },
];

export default function OrgCadastro1({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [aceitou, setAceitou] = useState(false);

  const [erroEmail, setErroEmail] = useState('');
  const [emailTocado, setEmailTocado] = useState(false);

  const [erroCnpj, setErroCnpj] = useState('');
  const [cnpjTocado, setCnpjTocado] = useState(false);

  const [erroTelefone, setErroTelefone] = useState('');
  const [telefoneTocado, setTelefoneTocado] = useState(false);

  const [erroSenha, setErroSenha] = useState('');
  const [senhaTocada, setSenhaTocada] = useState(false);

  const [erroConfirm, setErroConfirm] = useState('');
  const [confirmTocada, setConfirmTocada] = useState(false);

  const [confirmSenha, setConfirmSenha] = useState('');

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  function handleCheck() {
    setAceitou((prev) => !prev);
  }

  const {
    nome, setNome,
    tipo, setTipo,
    cnpj, setCnpj,
    email, setEmail,
    telefone, setTelefone,
    rede_social, setRede_social,
    senha, setSenha
  } = useSignup();

  const formValido =
    nome.trim().length > 0 &&
    email.trim().length > 0 &&
    cnpj.trim().length > 0 &&
    tipo.trim().length > 0 &&
    telefone.trim().length > 0 &&
    senha.trim().length > 0 &&
    confirmSenha.trim().length > 0 &&
    senha === confirmSenha &&
    validarEmail(email) &&
    aceitou &&
    !erroEmail &&
    !erroSenha &&
    !erroConfirm;

  const [mask, setMask] = useState("(99) 99999-9999");

  function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14) return false;

    // Rejeita CNPJs inválidos conhecidos
    if (/^(\d)\1{13}$/.test(cnpj)) return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;

    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;

    return true;
  }

  async function verificarExistenciaCNPJ(cnpj) {
    const somenteNumeros = cnpj.replace(/[^\d]+/g, '');

    try {
      const response = await fetch(`https://www.receitaws.com.br/v1/cnpj/${somenteNumeros}`);
      const data = await response.json();

      if (data.status === "ERROR") {
        return false;
      }

      return true;
    } catch (e) {
      return false;
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          extraScrollHeight={20}
          contentContainerStyle={est.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={require('../imagens/RecoveryConnect.png')}
            style={est.logo}
          />

          <Text style={est.title}>
            Crie a sua conta de Organização!
          </Text>
          <Text style={est.textCadlog}>
            Ao realizar o cadastro, verificaremos as suas informações
          </Text>

          <TextInput
            style={est.textBox}
            placeholder='Nome de Usuário / Nome da Organização'
            placeholderTextColor='#888'
            value={nome}
            onChangeText={setNome}
          />

          <Dropdown
            style={est.textBox}
            placeholderStyle={est.placeholderStyle}
            selectedTextStyle={est.selectedTextStyle}
            inputSearchStyle={est.inputSearchStyle}
            iconStyle={est.iconStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'Selecione o tipo de instituição'}
            value={tipo}
            onChange={item => {
              setTipo(item.value);
            }}
          />

          <MaskedTextInput
            mask="99.999.999/9999-99"
            keyboardType='numeric'
            style={[
              est.textBox,
              erroCnpj && cnpjTocado ? { borderColor: 'red' } : {}
            ]}
            placeholder='CNPJ'
            placeholderTextColor='#888'
            value={cnpj}
            onFocus={() => setCnpjTocado(true)}
            onChangeText={async (masked, unmasked) => {
              setCnpj(masked);

              if (cnpjTocado) {
                // 1 — valida CNPJ matematicamente
                if (!validarCNPJ(masked)) {
                  setErroCnpj('CNPJ inválido');
                  return;
                }

                // 2 — valida existência com API
                const existe = await verificarExistenciaCNPJ(masked);

                if (!existe) {
                  setErroCnpj('CNPJ não encontrado na Receita Federal');
                } else {
                  setErroCnpj('');
                }
              }
            }}
            onBlur={async () => {
              setCnpjTocado(true);

              if (!validarCNPJ(cnpj)) {
                setErroCnpj('CNPJ inválido');
                return;
              }

              const existe = await verificarExistenciaCNPJ(cnpj);

              if (!existe) {
                setErroCnpj('CNPJ não encontrado na Receita Federal');
              } else {
                setErroCnpj('');
              }
            }}
          />

          {erroCnpj && cnpjTocado && (
            <Text style={{ color: 'red', fontSize: 11, width: '80%', paddingLeft: 10 }}>
              {erroCnpj}
            </Text>
          )}

          <TextInput
            style={[
              est.textBox,
              emailTocado && erroEmail && { borderColor: 'red' }
            ]}
            placeholder='Email'
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
              if (emailTocado) {
                if (!validarEmail(t)) setErroEmail('E-mail inválido');
                else setErroEmail('');
              }
            }}
            onBlur={() => {
              setEmailTocado(true);
              if (!validarEmail(email)) setErroEmail('E-mail inválido');
            }}
          />
          {emailTocado && erroEmail !== '' && (
            <Text style={{ color: 'red', fontSize: 11, width: '80%', paddingLeft: 10 }}>
              {erroEmail}
            </Text>
          )}

          <MaskedTextInput
            mask={mask}
            keyboardType="numeric"
            value={telefone}
            style={[
              est.textBox,
              erroTelefone && telefoneTocado ? { borderColor: 'red' } : {}
            ]}
            placeholder="Telefone"
            placeholderTextColor='#888'

            onFocus={() => setTelefoneTocado(true)}

            onChangeText={(masked, unmasked) => {
              if (unmasked.length > 10) {
                setMask("(99) 99999-9999");
              } else {
                setMask("(99) 9999-99999");
              }
              setTelefone(masked);

              if (telefoneTocado) {
                if (unmasked.length < 10) {
                  setErroTelefone("Telefone inválido");
                } else {
                  setErroTelefone("");
                }
              }
            }}
          />
          {erroTelefone && telefoneTocado && (
            <Text style={{ color: 'red', fontSize: 11, width: "80%", paddingLeft: 10 }}>
              {erroTelefone}
            </Text>
          )}

          <TextInput
            style={est.textBox}
            placeholder='Rede Social (opcional)'
            placeholderTextColor='#888'
            value={rede_social}
            onChangeText={setRede_social}
          />
          <View style={[
            est.passwordContainer,
            senhaTocada && erroSenha && { borderColor: 'red' }
          ]}>
            <TextInput
              style={est.passwordInput}
              placeholder='Crie sua Senha'
              placeholderTextColor='#888'
              secureTextEntry={!showPassword}
              value={senha}
              onChangeText={(t) => {
                setSenha(t);
                if (senhaTocada) {
                  if (t.length < 6) setErroSenha('A senha deve ter pelo menos 6 caracteres');
                  else setErroSenha('');
                }
              }}
              onBlur={() => {
                setSenhaTocada(true);
                if (senha.length < 6) setErroSenha('A senha deve ter pelo menos 6 caracteres');
              }}
            />

            <TouchableOpacity
              style={est.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
            </TouchableOpacity>
          </View>

          {senhaTocada && erroSenha !== '' && (
            <Text style={{ color: 'red', fontSize: 11, width: '80%', paddingLeft: 10 }}>
              {erroSenha}
            </Text>
          )}

          <View style={[
            est.passwordContainer,
            confirmTocada && erroConfirm && { borderColor: 'red' }
          ]}>
            <TextInput
              style={est.passwordInput}
              placeholder='Confirme sua Senha'
              placeholderTextColor='#888'
              secureTextEntry={!showPassword}
              value={confirmSenha}
              onChangeText={(t) => {
                setConfirmSenha(t);
                if (confirmTocada) {
                  if (t !== senha) setErroConfirm('As senhas não coincidem');
                  else setErroConfirm('');
                }
              }}
              onBlur={() => {
                setConfirmTocada(true);
                if (confirmSenha !== senha) setErroConfirm('As senhas não coincidem');
              }}
            />

            <TouchableOpacity
              style={est.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
            </TouchableOpacity>
          </View>

          {confirmTocada && erroConfirm !== '' && (
            <Text style={{ color: 'red', fontSize: 11, width: '80%', paddingLeft: 10 }}>
              {erroConfirm}
            </Text>
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
                  color: "#5ce1e6",       // azul claro
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
            onPress={() => navigation.navigate('OrgCadastro2')}
          >
            <Text style={{ alignSelf: 'center', fontWeight: 'bold', }}>Etapa 1 de 3</Text>
          </TouchableOpacity>

          <View style={est.loginRow}>
            <Text style={est.textCadlog}>Já possui uma conta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('OrgLogin')}>
              <Text style={est.cadlogNav}>Entre</Text>
            </TouchableOpacity>
            <Text style={est.textCadlog}>agora!</Text>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const est = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 160,
    paddingTop: 20,
    backgroundColor: 'white',
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
    maxWidth: '80%',
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#5ce1e6',
    borderRadius: 100,
    padding: 10,
    width: '80%',
    marginTop: 20,
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
  placeholderStyle: {
    fontSize: 14,
    color: "#aaa",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#333",
    paddingLeft: 0,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
    marginVertical: 10,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 20,
    color: '#141414ff'
  },
  senhaReq: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'left',
    marginBottom: 2,
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 140,
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