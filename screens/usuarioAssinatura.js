import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function UsuarioAssinatura({ navigation }) {
  return (
    <View style={style.container}>
      <View style={style.header} />

      <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%', marginTop: 50, marginBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/arrowLeft.png')} style={{ marginRight: 20 }} />
        </TouchableOpacity>
        <Text style={style.title}>Detalhes da assinatura</Text>
      </View>

      <View style={style.card}>
        <Text style={style.preco}>R$ 8,90 / mês</Text>

        <Text style={style.subTitle}>Benefícios incluídos:</Text>

        <View style={style.lista}>
          <Text style={style.item}>• Variedade nos desafios (mais desafiadores!)</Text>
          <Text style={style.item}>• Conteúdos e mídias digitais (acesso completo)</Text>
        </View>

        <TouchableOpacity style={style.botaoAssinar}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Assinar agora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    width: '100%',
  },

  header: {
    width: '100%',
    backgroundColor: '#5CE1E6',
    height: 70,
    elevation: 5,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    maxWidth: '70%',
  },

  card: {
    width: '85%',
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
  },

  preco: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },

  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  lista: {
    marginBottom: 30,
  },

  item: {
    fontSize: 16,
    marginBottom: 8,
  },

  botaoAssinar: {
    backgroundColor: '#5CE1E6',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
});