import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Alert, ActivityIndicator, Modal } from 'react-native';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import { Feather } from '@expo/vector-icons';

export default function Diario({ navigation }) {
  const [diarios, setDiarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [diarioSelecionado, setDiarioSelecionado] = useState(null);

  useEffect(() => {
    async function syncEmail() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: dados, error } = await supabase
        .from("conta_usuario")
        .select("email")
        .eq("id_usuario", user.id)
        .single();

      if (!error && dados.email !== user.email) {
        await supabase
          .from("conta_usuario")
          .update({ email: user.email })
          .eq("id_usuario", user.id);
      }
    }

    syncEmail();
  }, []);


  useEffect(() => {
    async function carregarDiarios() {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        setLoading(false);
        return;
      }

      const user = data.session.user;

      const { data: diariosData, error: diariosError } = await supabase
        .from('diarios')
        .select('*')
        .eq('user_id', user.id)
        .order('data_criacao', { ascending: false });

      if (diariosError) {
        console.error(diariosError);
        Alert.alert('Erro', 'Não foi possível carregar os registros.');
      } else {
        setDiarios(diariosData || []);
      }

      setLoading(false);
    }

    carregarDiarios();
  }, []);

  const hoje = new Date().toLocaleDateString("pt-BR");

  const diariosSemHoje = diarios.filter(d => {
    const dataItem = new Date(d.data_criacao).toLocaleDateString("pt-BR");
    return dataItem !== hoje;
  });


  const renderItem = ({ item }) => (
    <View style={style.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={style.data}>{new Date(item.data_criacao).toLocaleDateString()}</Text>
        <TouchableOpacity onPress={() => openModal(item)}>
          <Feather name="trash" size={22} color="#ff6b6b" />
        </TouchableOpacity>
      </View>
      <Text style={style.mediaDia}>{"O seu dia foi " + item.resposta_1}</Text>
      <Text style={style.dados}>{"Produtividade " + item.resposta_2}</Text>
      <Text style={style.dados}>{"Controle " + item.resposta_3}</Text>
      <Text style={style.dados}>{"Tempo " + item.resposta_4}</Text>
      {item.resposta_livre?.trim() ? (
        <Text style={style.coment}>{item.resposta_livre}</Text>
      ) : null}
    </View>
  );

  const openModal = (item) => {
    setDiarioSelecionado(item.id);
    setModalVisible(true);
  };

  async function excluirDiario() {
    const { error } = await supabase
      .from('diarios')
      .delete()
      .eq('id', diarioSelecionado);

    setDiarios(prev => prev.filter(d => d.id !== diarioSelecionado));
    setModalVisible(false);

    if (error) {
      Alert.alert('Erro', 'Não foi possível excluir o diário.');
      console.error(error);
    } else {
      Alert.alert('Sucesso', 'Diário excluído com sucesso!');
    }
  }

  const diarioDeHoje = diarios.find(d => {
    const data = new Date(d.data_criacao);
    const hoje = new Date();

    return (
      data.getDate() === hoje.getDate() &&
      data.getMonth() === hoje.getMonth() &&
      data.getFullYear() === hoje.getFullYear()
    );
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00BFFF" />
        <Text>Carregando diários...</Text>
      </View>
    );
  }

  return (
    <View style={style.container}>
      <View style={style.header} />
      <Text style={style.title}>Seus registros</Text>

      {
        !diarioDeHoje ? (
          <View style={style.novoCont}>
            <Text style={style.subtitle}>Registre o seu dia de hoje!</Text>

            <View style={style.buttonCont}>
              <Text style={style.text}>
                Faça seu diário clicando no botão ao lado.
              </Text>

              <TouchableOpacity
                style={style.button}
                onPress={() => navigation.navigate("DiarioNovo")}
              >
                <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>Escrever</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={[style.card, { width: '86%' }]}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Text style={style.subtitleHoje}>Seu diário de hoje</Text>
              <TouchableOpacity onPress={() => openModal(diarioDeHoje)}>
                <Feather name="trash" size={22} color="#ff6b6b" />
              </TouchableOpacity>
            </View>
            <Text style={style.mediaDia}>{"O seu dia foi " + diarioDeHoje.resposta_1}</Text>
            <Text style={style.dados}>{"Produtividade " + diarioDeHoje.resposta_2}</Text>
            <Text style={style.dados}>{"Controle " + diarioDeHoje.resposta_3}</Text>
            <Text style={style.dados}>{"Tempo " + diarioDeHoje.resposta_4}</Text>

            {diarioDeHoje.resposta_livre?.trim() ? (
              <Text style={style.coment}>{diarioDeHoje.resposta_livre}</Text>
            ) : null}
          </View>
        )
      }

      < FlatList
        style={{ width: '90%', padding: 5 }}
        data={diariosSemHoje}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <Footer />
        }
      />

      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={style.modalOverlay}>
          <View style={style.modalContainer}>
            <Text style={style.modalTitulo}>Confirmar exclusão</Text>
            <Text style={style.modalTexto}>
              Tem certeza que deseja excluir este diário?
            </Text>

            <View style={style.modalBotoes}>
              <TouchableOpacity
                style={[style.modalBotao, { backgroundColor: '#ccc' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={style.modalBotaoTexto}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[style.modalBotao, { backgroundColor: '#ff6b6b' }]}
                onPress={excluirDiario}
                disabled={loading}
              >
                <Text style={style.modalBotaoTexto}>
                  {loading ? 'Excluindo...' : 'Excluir'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  header: {
    backgroundColor: '#5ce1e6',
    height: 50,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    width: '80%',
    marginBottom: 20,
    marginTop: 30,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  subtitleHoje: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    marginHorizontal: 11,
    flex: 5,
  },

  button: {
    backgroundColor: '#5ce1e6',
    borderRadius: 100,
    padding: 10,
    flex: 3,
  },
  buttonCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  novoCont: {
    backgroundColor: '#DEFFFF',
    padding: 10,
    width: '85%',
    borderRadius: 20,
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 18,
    paddingLeft: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginVertical: 8,
    marginHorizontal: 4,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E2F4F4',
  },

  icon: {
    width: 28,
    height: 28,
    marginRight: 12,
    tintColor: '#2C7A7B',
  },

  data: {
    fontWeight: '600',
    fontSize: 17,
    color: '#1A202C',
    marginBottom: 6,
  },

  mediaDia: {
    fontSize: 15,
    color: '#2C7A7B',
    fontWeight: '500',
    marginBottom: 4,
  },

  dados: {
    fontSize: 14,
    color: '#4A5568',
    marginTop: 4,
    lineHeight: 20,
    maxWidth: '90%',
    marginLeft: 8,
  },

  coment: {
    fontSize: 14,
    color: '#2D3748',
    marginTop: 10,
    lineHeight: 20,
    maxWidth: '92%',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalTexto: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalBotao: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalBotaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});