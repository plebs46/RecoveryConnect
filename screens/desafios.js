import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['pt'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  today: 'Hoje'
};

LocaleConfig.defaultLocale = 'pt';

export default function Desafios({ navigation }) {
  const desafios = [
    {
      id: '1',
      titulo: 'Manter-se longe de cigarros por 7 dias',
      descricao: 'Ao longo da semana, conquiste a independência adotando o autocontrole na sua rotina.',
      nivel: '⭐️⭐️',
      inicio: '2025-09-10',
      fim: '2025-09-16',
    },
    {
      id: '2',
      titulo: 'Correr 5km na semana',
      descricao: 'Melhore sua resistência e fortaleça seu corpo correndo um total de 5km nesta semana.',
      nivel: '⭐️⭐️⭐️',
      inicio: '2025-09-06',
      fim: '2025-09-12',
    },
    {
      id: '3',
      titulo: 'Ler um livro por 15 minutos ao dia',
      descricao: 'Aumente seu conhecimento e relaxe a mente com a leitura diária.',
      nivel: '⭐️',
      inicio: '2025-09-05',
      fim: '2025-09-11',
    },
  ];

  const [desafioSelecionado, setDesafioSelecionado] = useState(desafios[0]);

  const getHojeBrasilia = () => {
    const hoje = new Date();
    const brasiliaDate = hoje.toLocaleDateString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const [dia, mes, ano] = brasiliaDate.split('/');
    return `${ano}-${mes}-${dia}`;
  };


  const getMarkedDates = (inicio, fim) => {
    let dates = {};
    let current = new Date(inicio);
    let last = new Date(fim);

    while (current <= last) {
      const dateStr = current.toISOString().split('T')[0];

      dates[dateStr] = {
        color: '#5ce1e6',
        textColor: 'white',
      };

      current.setDate(current.getDate() + 1);
    }

    // marcar início e fim corretamente
    if (dates[inicio]) {
      dates[inicio].startingDay = true;
    }
    if (dates[fim]) {
      dates[fim].endingDay = true;
    }

    const hoje = getHojeBrasilia();
    dates[hoje] = {
      ...dates[hoje], // preserva se já estiver marcado
      marked: true,
      dotColor: 'red',
    };

    return dates;
  };

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

      <View style={{ flex: 1, width: '100%' }}>
        <FlatList
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

        <Calendar
          style={{ height: '60%', marginBottom: 20 }}
          onDayPress={(day) => {
            console.log('Data selecionada', day.dateString);
          }}
          markingType={'period'}
          markedDates={getMarkedDates(desafioSelecionado.inicio, desafioSelecionado.fim)}
          theme={{
            selectedDayBackgroundColor: '#00adf5',
            todayTextColor: 'red',
            arrowColor: 'blue',
          }}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
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

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
  },

  desafioCard: {
    width: Dimensions.get('window').width * 0.8,
    padding: 20,
    marginTop: 5,
    marginHorizontal: Dimensions.get('window').width * 0.1,
    height: 180,
    backgroundColor: '#fff',
    borderRadius: 5,
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