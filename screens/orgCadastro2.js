import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaskedTextInput } from 'react-native-mask-text';
import { useSignup } from '../context/UserSignupContext';

export default function OrgCadastro2({ navigation }) {
  const {
    cep, setCep,
    rua, setRua,
    numero, setNumero,
    bairro, setBairro,
    cidade, setCidade,
    estado, setEstado
  } = useSignup();

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
              Continue o cadastro!
            </Text>
          </View>
          <Text style={{ fontSize: 16, marginBottom: 20, maxWidth: '80%', textAlign: 'center', fontWeight: 500 }}>
            Insira o endereço da organização
          </Text>

          <MaskedTextInput
            mask="99999-999" 
            style={est.textBox} 
            placeholder='CEP' 
            placeholderTextColor='lightGray'
            value={cep}
            onChangeText={(masked) => {
              setCep(masked);
            }}
          />
          <TextInput 
            style={est.textBox} 
            placeholder='Rua' 
            placeholderTextColor='lightGray'
            value={rua}
            onChangeText={setRua}
          />
          <TextInput 
            style={est.textBox} 
            placeholder='Bairro' 
            placeholderTextColor='lightGray'
            value={bairro}
            onChangeText={setBairro}
          />
          <TextInput 
            style={est.textBox} 
            placeholder='Número' 
            placeholderTextColor='lightGray'
            value={numero}
            onChangeText={setNumero}
          />
          <TextInput
            style={est.textBox}
            placeholder='Cidade' 
            placeholderTextColor='lightGray'
            value={cidade}
            onChangeText={setCidade} 
          />
          <TextInput 
            style={est.textBox} 
            placeholder='Estado' 
            placeholderTextColor='lightGray'
            value={estado}
            onChangeText={setEstado} 
          />

          <View style={est.buttonContainer}>
            <TouchableOpacity style={est.button} onPress={() => navigation.navigate("OrgCadastro3")}>
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