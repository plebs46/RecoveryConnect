import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import { useState } from 'react';

export default function DesafiosNovo({navigation}) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Tudo');

  const desafios = [
    {
      id: 1,
      categoria: 'Restrição',
      titulo: 'Evite o consumo de álcool durante 1 semana',
      descricao: 'Tente ao máximo ficar longe de bebidas alcoólicas durante uma semana!',
      nivel: '⭐️⭐️⭐️'
    },
    {
      id: 2,
      categoria: 'Atividade Física',
      titulo: 'Faça 8 exercícios de cardio/aeróbico durante 1 mês',
      descricao: 'O exercício físico tem sido proposto como auxiliante no tratamento da dependência!',
      nivel: '⭐️⭐️⭐️' 
    },
    {
      id: 3,
      categoria: 'Restrição',
      titulo: 'Reduza Sua Quantidade de Álcool',
      descricao: 'Diminua gradualmente a quantidade de álcool consumido a cada semana. Faça anotações sobre os impactos percebidos.',
      nivel: '⭐️⭐️'
    },
    {
      id: 4,
      categoria: 'Saúde Mental',
      titulo: 'Lembre-se de respirar fundo',
      descricao: 'Inspirar e expirar corretamente acalma e é um ótimo antídoto contra o estresse!',
      nivel: '⭐️'
    },
    {
      id: 5,
      categoria: 'Atividade Física',
      titulo: '30 minutos por dia',
      descricao: 'Pratique ao menos 30 minutos de atividade física todos os dias, seja caminhada, corrida ou exercício de sua escolha.',
      nivel: '⭐️⭐️⭐️' 
    },
    {
      id: 6,
      categoria: 'Saúde Mental',
      titulo: 'Meditação de 5 minutos',
      descricao: 'Dedique 5 minutos do seu dia à meditação. Fique em um lugar calmo e foque na sua respiração para aliviar o estresse.',
      nivel: '⭐️'
    },
  ];

  const categorias = ['Tudo', 'Atividade Física', 'Restrição', 'Saúde Mental'];

  const filtrarDesafios = () => {
    if (categoriaSelecionada === 'Tudo') {
      return desafios;
    }
    return desafios.filter(desafio => desafio.categoria === categoriaSelecionada);
  };
  
  return (
    <View style={style.container}>
      <View style={style.headerContainer}>
        <TouchableOpacity
          style={style.buttonActive}
          onPress={() => navigation.navigate('Desafios')}
        >
          <Text style={style.buttonText}>Meus desafios</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={style.buttonInactive}
          onPress={() => navigation.navigate('DesafiosNovo')}
          disabled={true}
        >
          <Text style={style.buttonText}>Desafios disponíveis</Text>
        </TouchableOpacity>
      </View>

      <View style={style.filtroContainer}>
        {categorias.map(categoria => (
          <TouchableOpacity
            key={categoria}
            onPress={() => setCategoriaSelecionada(categoria)}
            style={[
              style.botaoFiltro,
              categoriaSelecionada === categoria && style.botaoFiltroAtivo
            ]}
          >
            <Text style={[
              style.textoFiltro,
              categoriaSelecionada === categoria && style.textoFiltroAtivo
            ]}>{categoria}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <FlatList
        data={filtrarDesafios()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={[style.card, getCategoriaStyle(item.categoria)]}>
            <Text style={style.cardTitulo}>{item.titulo}</Text>
            <Text style={style.cardDescricao}>{item.descricao}</Text>
            <Text style={style.cardNivel}>Nível {item.nivel}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const getCategoriaStyle = (categoria) => {
  switch (categoria) {
    case 'Restrição': return { borderColor: '#5ce1e6' };
    case 'Atividade Física': return { borderColor: 'orange' };
    case 'Saúde Mental': return { borderColor: 'green' };
    default: return { borderColor: 'gray' };
  }
};

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
    paddingTop: 50,
    width: '100%',
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

  filtroContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
  },
  botaoFiltro: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  botaoFiltroAtivo: {
    backgroundColor: '#5ce1e6',
  },
  textoFiltro: {
    color: '#000',
  },
  textoFiltroAtivo: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
  card: {
    padding: 15,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    width: '90%',
    alignSelf: 'center'
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescricao: {
    fontSize: 14,
    marginBottom: 5,
  },
  cardNivel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
  },
});