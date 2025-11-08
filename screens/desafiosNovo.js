import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function DesafiosNovo({ navigation }) {
  // Exibir desafios disponíveis para o usuário selecionar
  const [desafios, setDesafios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarDesafios = async () => {
      setCarregando(true);

      try {
        const { data: usuarioData } = await supabase.auth.getUser();
        const usuario = usuarioData?.user;
        if (!usuario) throw new Error('Usuário não encontrado.');

        // Buscar substâncias
        const { data: conta } = await supabase
          .from('conta_usuario')
          .select('substancia')
          .eq('id_usuario', usuario.id)
          .single();

        const substancias = conta?.substancia || [];

        let { data: metas, error } = await supabase
          .from('metas')
          .select('*');

        if (error) throw error;

        // Se tiver substâncias exibe apenas as necessárias
        if (substancias.length > 0) {
          metas = metas.filter(
            (m) =>
              !m.substancia_relacionada ||
              substancias.includes(m.substancia_relacionada.toLowerCase())
          );
        }

        const { data: metasUsuario } = await supabase
          .from('metas_usuario')
          .select('id_meta')
          .eq('id_usuario', usuario.id);

        const metasDisponiveis = metas.filter(
          (m) => !metasUsuario?.some(mu => mu.id_meta === m.id_meta)
        );
        setDesafios(metasDisponiveis);
      } catch (err) {
        console.error('Erro ao carregar desafios:', err);
      } finally {
        setCarregando(false);
      }
    };

    carregarDesafios();
  }, []);


  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Tudo');
  const categorias = ['Tudo', 'Atividades físicas', 'Restrição', 'Saúde mental'];

  const filtrarDesafios = () => {
    let filtrados = desafios;

    if (categoriaSelecionada !== 'Tudo') {
      filtrados = desafios.filter(d => d.categoria === categoriaSelecionada);
    }

    return filtrados.sort((a, b) => ordemNivel[a.nivel] - ordemNivel[b.nivel]);
  };

  const ordemNivel = {
    Fácil: 1,
    Médio: 2,
    Difícil: 3,
  };

  const [modalVisivel, setModalVisivel] = useState(false);
  const [desafioSelecionado, setDesafioSelecionado] = useState(null);

  // Metas do usuário
  async function registrarMetaUsuario(desafioSelecionado) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Usuário não autenticado');
        return;
      }

      const dataInicio = new Date();
      const dataFim = new Date();
      dataFim.setDate(dataInicio.getDate() + (desafioSelecionado.duracao_dias - 1));

      const { error } = await supabase
        .from('metas_usuario')
        .insert([
          {
            id_usuario: user.id,
            id_meta: desafioSelecionado.id_meta,
            data_inicio: dataInicio.toISOString().split('T')[0],
            data_fim: dataFim.toISOString().split('T')[0],
          },
        ]);

      if (error) {
        console.error(error);
        alert('Erro ao registrar meta.');
      } else {
        setDesafios(prev => prev.filter(d => d.id_meta !== desafioSelecionado.id_meta));
        alert('Meta adicionada com sucesso!');
      }
    } catch (e) {
      console.error(e);
      alert('Erro inesperado ao salvar a meta.');
    }
  }

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

      {carregando ? (
        <Text>Carregando desafios...</Text>
      ) : (
        <FlatList
          style={{ width: '90%', height: '70%' }}
          showsVerticalScrollIndicator={false}
          data={filtrarDesafios()}
          keyExtractor={(item) => item.id_meta.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[style.card, getCategoriaStyle(item.categoria)]}
              onPress={() => {
                setDesafioSelecionado(item);
                setModalVisivel(true);
              }}>
              <Text style={style.cardTitulo}>{item.descricao}</Text>
              <Text style={style.cardDescricao}>{item.descricao_longa}</Text>
              <Text style={style.cardNivel}>Nível: {item.nivel}</Text>
              <Text style={style.cardNivel}>Duração: {item.duracao_dias} dias</Text>
            </TouchableOpacity>
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
              Deseja selecionar esta meta?
            </Text>

            {desafioSelecionado && (
              <>
                < Text style={{ textAlign: 'center', marginBottom: 17, fontSize: 16 }}>
                  {desafioSelecionado.descricao}
                </Text>
                <Text style={{ textAlign: 'center', marginBottom: 25, fontSize: 14 }}>
                  Nível: {desafioSelecionado.nivel}  |  Duração: {desafioSelecionado.duracao_dias} dias
                </Text>
              </>
            )}

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity
                onPress={() => setModalVisivel(false)}
                style={style.modalCancel}
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  registrarMetaUsuario(desafioSelecionado);
                  setModalVisivel(false);
                  console.log('Meta selecionada:', desafioSelecionado.descricao);
                }}
                style={style.modalConfirm}
              >
                <Text style={{ color: 'white' }}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal >
    </View >
  );
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
  modalFundo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalCard: {
    backgroundColor: '#fff',
    padding: 15,
    paddingVertical: 30,
    borderRadius: 15,
    width: '75%',
    alignItems: 'center'
  },
  modalCancel: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    width: 100,
    alignItems: 'center'
  },
  modalConfirm: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    width: 100,
    alignItems: 'center'
  }
});