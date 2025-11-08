import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Ionicons } from '@expo/vector-icons';

export default function DesafiosDetalhes({ navigation }) {
  const [metas, setMetas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [metaSelecionada, setMetaSelecionada] = useState(null);

  async function carregarMetasUsuario() {
    try {
      setCarregando(true);
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
            categoria
          )
        `)
        .eq('id_usuario', user.id);

      if (error) throw error;

      setMetas(data || []);
    } catch (e) {
      console.error('Erro ao carregar metas:', e);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarMetasUsuario();
  }, []);

  async function excluirMeta(metaId) {
    try {
      const { error } = await supabase
        .from('metas_usuario')
        .delete()
        .eq('id_meta_usuario', metaId);

      if (error) throw error;

      setModalVisivel(false);

      setTimeout(() => {
        carregarMetasUsuario();
      }, 300);
    } catch (err) {
      console.error('Erro ao excluir meta:', err);
    }
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
      <View style={style.voltarContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={style.botaoVoltar}>
          <Ionicons name="arrow-back" size={24} color="#5f5f5fff" />
          <Text style={{ marginLeft: 5, fontSize: 17, color: '#5f5f5fff' }}>Voltar</Text>
        </TouchableOpacity>
      </View>
      {carregando ? (
        <Text>Carregando metas...</Text>
      ) : metas.length === 0 ? (
        <Text style={{ marginTop: 30, textAlign: 'center' }}>
          Nenhuma meta selecionada. Vá até "Desafios disponíveis" e escolha uma meta!
        </Text>
      ) : (
        <FlatList
          style={{ width: '90%', height: '70%', marginTop: 10 }}
          showsVerticalScrollIndicator={false}
          data={metas}
          keyExtractor={(item) => item.id_meta_usuario.toString()}
          renderItem={({ item }) => (
            <View style={[style.card, getCategoriaStyle(item.metas.categoria)]}>
              <Text style={style.cardTitulo}>{item.metas.descricao}</Text>
              <Text style={style.cardDescricao}>{item.metas.descricao_longa}</Text>
              <Text style={style.cardNivel}>Nível: {item.metas.nivel}</Text>
              <Text style={style.cardNivel}>Categoria: {item.metas.categoria}</Text>
              <Text style={style.cardNivel}>
                Início: {formatarData(item.data_inicio)}  |  Fim: {formatarData(item.data_fim)}
              </Text>

              <TouchableOpacity
                style={style.botaoExcluir}
                onPress={() => {
                  setMetaSelecionada(item);
                  setModalVisivel(true);
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Desistir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      <Modal
        visible={modalVisivel}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={style.modalFundo}>
          <View style={style.modalCard}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
              Deseja realmente desistir desta meta?
            </Text>

            {metaSelecionada && (
              <Text style={{ textAlign: 'center', marginBottom: 25, fontSize: 20 }}>
                {metaSelecionada.metas.descricao}
              </Text>
            )}

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity
                onPress={() => setModalVisivel(false)}
                style={style.modalCancel}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => excluirMeta(metaSelecionada.id_meta_usuario)}
                style={style.modalConfirm}
              >
                <Text style={{ color: 'white' }}>Desistir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function formatarData(dataISO) {
  const data = new Date(dataISO);
  return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

const getCategoriaStyle = (categoria) => {
  switch (categoria) {
    case 'Restrição': return { borderColor: '#E57373' };
    case 'Atividades físicas': return { borderColor: '#81C784' };
    case 'Saúde mental': return { borderColor: '#7CB8FF' };
    default: return { borderColor: 'gray' };
  }
};

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

  card: {
    padding: 15,
    paddingHorizontal: 20,
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
    marginBottom: 10,
  },
  cardNivel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 3,
  },
  botaoExcluir: {
    backgroundColor: '#E57373',
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  modalFundo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalCard: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    width: '75%',
    alignItems: 'center',
  },
  modalCancel: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
  },
  modalConfirm: {
    backgroundColor: '#E57373',
    padding: 10,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
  },
  voltarContainer: {
    width: '100%',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  botaoVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});