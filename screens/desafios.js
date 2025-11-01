import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { supabase } from '../lib/supabase';

// Configuração do calendário
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
  const [desafioSelecionado, setDesafioSelecionado] = useState(null);

  useEffect(() => {
    if (desafios.length > 0 && !desafioSelecionado) {
      setDesafioSelecionado(desafios[0]);
    }
  }, [desafios]);

  // Calendário
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

    if (dates[inicio]) {
      dates[inicio].startingDay = true;
    }
    if (dates[fim]) {
      dates[fim].endingDay = true;
    }

    const hoje = getHojeBrasilia();
    dates[hoje] = {
      ...dates[hoje],
      marked: true,
      dotColor: 'red',
    };

    return dates;
  };

  // Exibir metas selecionadas
  const [desafios, setDesafios] = useState([]);

  useEffect(() => {
    async function carregarMetasUsuario() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('metas_usuario')
          .select(`
            id_meta_usuario,
            data_inicio,
            data_fim,
            metas (
              id_meta,
              descricao,
              descricao_longa,
              nivel,
              duracao_dias
            )
          `)
          .eq('id_usuario', user.id);

        if (error) throw error;

        const metasFormatadas = data.map(item => ({
          id: item.metas.id_meta,
          descricao: item.metas.descricao,
          descricao_longa: item.metas.descricao_longa,
          nivel: item.metas.nivel,
          data_inicio: item.data_inicio,
          data_fim: item.data_fim,
          duracao: item.metas.duracao_dias,
        }));

        setDesafios(metasFormatadas);
      } catch (e) {
        console.error('Erro ao carregar metas do usuário:', e);
      }
    }

    carregarMetasUsuario();
  }, []);

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
        {desafios.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '80%', alignSelf: 'center' }}>
            <Text style={style.subtitle}>
              Não há metas em progresso no momento.
            </Text>
            <Text style={{ textAlign: 'center', marginBottom: 20 }}>
              Vá para a tela de metas e escolha uma nova meta.
            </Text>
            <TouchableOpacity
              style={style.button}
              onPress={() => navigation.navigate('DesafiosNovo')}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Selecionar Meta</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={desafios}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  style.desafioCard,
                  desafioSelecionado?.id === item.id && style.desafioCardSelecionado,
                ]}
                onPress={() => setDesafioSelecionado(item)}
              >
                <Text style={style.desafioTitulo}>{item.descricao}</Text>
                <Text style={style.desafioDescricao}>{item.descricao_longa}</Text>
                <Text style={style.desafioNivel}>Nível {item.nivel}</Text>
                <Text style={style.desafioNivel}>Duração: {item.duracao} dias</Text>
              </TouchableOpacity>
            )}
          />
        )}

        {desafioSelecionado?.data_inicio && desafioSelecionado?.data_fim ? (
          <Calendar
            style={{ height: '60%', marginBottom: 20 }}
            onDayPress={(day) => {
              console.log('Data selecionada', day.dateString);
            }}
            markingType={'period'}
            markedDates={getMarkedDates(desafioSelecionado.data_inicio, desafioSelecionado.data_fim)}
            theme={{
              selectedDayBackgroundColor: '#00adf5',
              todayTextColor: 'red',
              arrowColor: 'blue',
            }}
          />
        ) : (
          <Calendar
            style={{ height: '60%', marginBottom: 20 }}
            onDayPress={(day) => {
              console.log('Data selecionada', day.dateString);
            }}
            markingType={'period'}
            theme={{
              selectedDayBackgroundColor: '#00adf5',
              todayTextColor: 'red',
              arrowColor: 'blue',
            }}
          />
        )}
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
  button: {
    backgroundColor: '#5ce1e6',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginTop: 10,
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
  subtitle: {
    fontSize: 22,
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center',
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
    marginBottom: 10,
  },
  desafioDescricao: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
    lineHeight: 18,
  },
  desafioNivel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
  },
});