import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
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
  const [loading, setLoading] = useState(true);
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
        color: '#92fbffff',
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

  useFocusEffect(
    useCallback(() => {
      async function carregarMetasUsuario() {
        setLoading(true);
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
              duracao_dias,
              categoria
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
            categoria: item.metas.categoria,
          }));

          setDesafios(metasFormatadas);
          setLoading(false);
        } catch (e) {
          console.error('Erro ao carregar metas do usuário:', e);
          setLoading(false);
        }
      }

      carregarMetasUsuario();
    }, [])
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00BFFF" />
        <Text>Carregando suas metas...</Text>
      </View>
    );
  }

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
          <View style={style.desafioCardZero}>
            <Text style={style.subtitle}>
              Não há metas em progresso.
            </Text>
            <Text style={{ textAlign: 'center', marginBottom: 30 }}>
              Escolha uma nova meta.
            </Text>
          </View>
        ) : (
          <View style={{ alignItems: 'center', height: 160 }}>
            <FlatList
              style={{ maxHeight: 140, }}
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
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
                    {item.descricao}
                  </Text>
                  <Text style={{ color: '#777', marginTop: 4 }}>
                    Nível {item.nivel} • {item.categoria}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={{ width: '80%' }} onPress={() => navigation.navigate('DesafiosDetalhes')}>
              <Text style={{ width: '100%', textAlign: 'right', textDecorationLine: 'underline', color: '#3fd4daff', marginBottom: 5, padding: 10 }}>
                Ver tudo
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <Calendar
          style={{ height: '60%', marginBottom: 20 }}
          onDayPress={(day) => {
            console.log('Data selecionada', day.dateString);
          }}
          markingType={'period'}
          markedDates={
            desafioSelecionado?.data_inicio && desafioSelecionado?.data_fim
              ? getMarkedDates(desafioSelecionado.data_inicio, desafioSelecionado.data_fim)
              : {}
          }
          theme={{
            todayTextColor: 'red',
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
  subtitle: {
    fontSize: 18,
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center',
  },

  desafioCard: {
    width: Dimensions.get('window').width * 0.8,
    padding: 20,
    marginTop: 5,
    marginHorizontal: Dimensions.get('window').width * 0.1,
    height: 110,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  desafioCardZero: {
    width: Dimensions.get('window').width * 0.8,
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    marginHorizontal: Dimensions.get('window').width * 0.1,
    height: 110,
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