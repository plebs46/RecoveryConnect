import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaskedTextInput } from 'react-native-mask-text';
import { useSignup } from '../context/UserSignupContext';
import { useState } from 'react';

export default function OrgCadastro2({ navigation }) {
  const [erroCep, setErroCep] = useState('');
  const [cepTocado, setCepTocado] = useState(false);

  const {
    cep, setCep,
    rua, setRua,
    numero, setNumero,
    bairro, setBairro,
    cidade, setCidade,
    estado, setEstado
  } = useSignup();

  const formValido =
    cep.trim().length > 0 &&
    rua.trim().length > 0 &&
    numero.trim().length > 0 &&
    bairro.trim().length > 0 &&
    cidade.trim().length > 0 &&
    estado.trim().length > 0;

  const buscarCep = async (cep) => {
    const cepLimpo = cep.replace(/\D/g, '');
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();
      if (data.erro) return null;
      return data;
    } catch (err) {
      return null;
    }
  };


  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          extraScrollHeight={20}
          contentContainerStyle={est.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 70, marginBottom: 20 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../assets/arrowLeft.png')} style={{ marginRight: 20 }} />
            </TouchableOpacity>
            <Text style={est.title}>
              Estamos na metade!
            </Text>
          </View>
          <Text style={{ fontSize: 16, marginBottom: 20, maxWidth: '80%', textAlign: 'center', fontWeight: 500 }}>
            Insira o endereço da organização
          </Text>

          <MaskedTextInput
            mask="99999-999"
            keyboardType='numeric'
            style={[
              est.textBox,
              cepTocado && erroCep && { borderColor: 'red' }
            ]}
            placeholder='CEP'
            placeholderTextColor='lightGray'
            value={cep}
            onChangeText={(t) => {
              setCep(t);

              if (cepTocado) {
                if (t.length < 9) setErroCep('CEP inválido');
                else setErroCep('');
              }
            }}
            onBlur={async () => {
              setCepTocado(true);

              if (cep.length < 9) {
                setErroCep('CEP inválido');
                return;
              }

              setErroCep('');

              const dados = await buscarCep(cep);
              if (!dados) {
                setErroCep('CEP não encontrado');
                return;
              }

              setRua(dados.logradouro || '');
              setBairro(dados.bairro || '');
              setCidade(dados.localidade || '');
              setEstado(dados.uf || '');
            }}
          />

          {cepTocado && erroCep !== '' && (
            <Text style={{ color: 'red', fontSize: 11, width: '80%', paddingLeft: 10 }}>
              {erroCep}
            </Text>
          )}

          <TextInput
            style={est.textBox}
            placeholder='Rua'
            placeholderTextColor='#888'
            value={rua}
            onChangeText={setRua}
          />
          <TextInput
            style={est.textBox}
            placeholder='Bairro'
            placeholderTextColor='#888'
            value={bairro}
            onChangeText={setBairro}
          />
          <TextInput
            style={est.textBox}
            placeholder='Número'
            placeholderTextColor='#888'
            value={numero}
            onChangeText={setNumero}
            keyboardType='numeric'
          />
          <TextInput
            style={est.textBox}
            placeholder='Cidade'
            placeholderTextColor='#888'
            value={cidade}
            onChangeText={setCidade}
          />
          <TextInput
            style={est.textBox}
            placeholder='Estado'
            placeholderTextColor='#888'
            value={estado}
            onChangeText={setEstado}
          />

          <View style={est.buttonContainer}>
            <TouchableOpacity
              style={[
                est.button,
                !formValido && { backgroundColor: '#cececeff', }
              ]}
              onPress={() => navigation.navigate("OrgCadastro3")}
            >
              <Text style={{ alignSelf: 'center', fontWeight: 'bold', }}>Etapa 2 de 3</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '30%' }}>
              <Text style={est.textCadlog}>
                Já possui uma conta?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("OrgLogin")}>
                <Text style={est.cadlogNav}>
                  Entre
                </Text>
              </TouchableOpacity>
              <Text style={est.textCadlog}>
                agora!
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const est = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
    alignItems: 'center',
    marginTop: 50,
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
    fontSize: 16,
    color: "#aaa",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#333",
  },

});