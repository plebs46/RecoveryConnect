import {View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions} from 'react-native';
import { useState } from 'react';

export default function Desafios({navigation}) {
  const desafios = [
    {
      id: '1',
      titulo: 'Manter-se longe de cigarros por 7 dias',
      descricao: 'Ao longo da semana, conquiste a independência adotando o autocontrole na sua rotina.',
      nivel: '⭐️⭐️'
    },
    {
      id: '2',
      titulo: 'Correr 5km na semana',
      descricao: 'Melhore sua resistência e fortaleça seu corpo correndo um total de 5km nesta semana.',
      nivel: '⭐️⭐️⭐️'
    },
    { 
      id: '3',
      titulo: 'Ler um livro por 15 minutos ao dia',
      descricao: 'Aumente seu conhecimento e relaxe a mente com a leitura diária.',
      nivel: '⭐️'
    },
  ];

  const [desafioSelecionado, setDesafioSelecionado] = useState(desafios[0]);

  return (
    <View style={style.container}>
      <View style={style.headerContainer}>
        <TouchableOpacity
          style={style.buttonInactive}
          onPress={() => navigation.navigate('Desafios')}
          disabled={true}
        >
          <Text style={style.buttonText}>Meus desafios</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={style.buttonActive}
          onPress={() => navigation.navigate('DesafiosNovo')}
        >
          <Text style={style.buttonText}>Desafios disponíveis</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={style.title}>Suas metas em progresso</Text>

      <View>
        <FlatList
          style={{flex: 1}}
          data={desafios}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                style.desafioCard,
                desafioSelecionado.id === item.id && style.desafioCardSelecionado,
              ]}
              onPress={() => setDesafioSelecionado(item)}
            >
              <Text style={style.desafioTitulo}>{item.titulo}</Text>
              <Text style={style.desafioDescricao}>{item.descricao}</Text>
              <Text style={style.desafioNivel}>Nível {item.nivel}</Text>
            </TouchableOpacity>
          )}
        />

        
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: 'white',
    alignItems:'center',
  },

  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#5ce1e6',
    borderRadius: 15,
    paddingTop: 50,
  },
  buttonInactive: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 15,
    alignItems: 'center',
    marginRight: 5,
  },
  buttonActive: {
    flex: 1,
    backgroundColor: '#5ce1e6',
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },

  title:{
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
  },

  desafioCard: {
    width: Dimensions.get('window').width * 0.8,
    padding: 20,
    marginHorizontal: Dimensions.get('window').width * 0.1,
    height: 180,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  desafioCardSelecionado: {
    borderColor: '#5ce1e6',
    borderWidth: 2,
  },
  desafioTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  desafioDescricao: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  desafioNivel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
  },
});