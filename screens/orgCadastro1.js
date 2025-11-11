import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaskedTextInput } from 'react-native-mask-text';
import { useSignup } from '../context/UserSignupContext';

const data = [
  { label: 'Clínica pública', value: 'Clínica Pública' },
  { label: 'Clínica privada', value: 'Clínica Privada' },
  { label: 'ONG', value: 'ONG' },
  { label: 'Projetos de comunidades e igrejas', value: 'Projetos' },
];

export default function OrgCadastro1({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    nome, setNome,
    tipo, setTipo,
    cnpj, setCnpj,
    email, setEmail,
    telefone, setTelefone,
    rede_social, setRede_social,
    senha, setSenha
  } = useSignup();

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
            placeholderTextColor='lightGray'
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
            style={est.textBox}
            placeholder='CNPJ'
            placeholderTextColor='lightGray'
            value={cnpj}
            onChangeText={(masked) => {
              setCnpj(masked);
            }}
          />
          <TextInput
            style={est.textBox}
            placeholder='Email'
            placeholderTextColor='lightGray'
            value={email}
            onChangeText={setEmail}
          />
          <MaskedTextInput
            mask="(99) 99999-9999"
            onChangeText={(masked) => {
              setTelefone(masked);
            }}
            value={telefone}
            style={est.textBox}
            placeholder="Telefone"
            placeholderTextColor="lightGray"
            keyboardType="numeric"
          />
          <TextInput
            style={est.textBox}
            placeholder='Rede Social (opcional)'
            placeholderTextColor='lightGray'
            value={rede_social}
            onChangeText={setRede_social}
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
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View style={est.passwordContainer}>
            <TextInput style={est.passwordInput} placeholder='Confirme sua Nova Senha' placeholderTextColor='lightGray' secureTextEntry={!showPassword} />
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


          <TouchableOpacity style={est.button} onPress={() => navigation.navigate('OrgCadastro2')}>
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