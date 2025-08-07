import { View, StyleSheet, Text } from 'react-native';

export default function Footer() {
  return (
    <View style={style.container}>
      <View style={style.line}/>

      <Text style={style.title}>
        Este é o fim dos seus registros.
      </Text>
      <Text style={style.text}>
        Escreva diários todos os dias para criar a sua história de superação!
      </Text>
    </View>
  );
}

const style = StyleSheet.create ({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: 'white',
    alignItems:'center',
  },

  line: {
    backgroundColor: '#333333',
    height: 1,
    width: '80%',
    margin: 15,
    marginVertical: 30,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 100,
  },
});