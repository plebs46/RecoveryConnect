import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function DiarioNovo({ navigation }) {
  const [respostaDia, setRespostaDia] = useState('');
  const [respostaProd, setRespostaProd] = useState('');
  const [respostaCtrl, setRespostaCtrl] = useState('');
  const [respostaTemp, setRespostaTemp] = useState('');
  const [respostaCmnt, setRespostaCmnt] = useState('');

  async function salvarDiario(respostasColetadas) {
    const agora = new Date();
    const dataLocal = new Date(agora.getTime() - agora.getTimezoneOffset() * 60000);

    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    const user = data.session.user;

    const { data: insertData, error: insertError } = await supabase
      .from('diarios')
      .insert([
        {
          user_id: user.id,
          resposta_1: respostasColetadas.mediaDia,
          resposta_2: respostasColetadas.produtividade,
          resposta_3: respostasColetadas.controle,
          resposta_4: respostasColetadas.tempo,
          resposta_livre: respostasColetadas.comentario,
          data_criacao: dataLocal,
        },
      ]);

    if (insertError) {
      console.error(insertError);
      Alert.alert("Erro ao inserir", insertError.message);
    } else {
      Alert.alert("Sucesso", "Diário salvo com sucesso!");
      console.log("Registro inserido:", insertData);
      navigation.replace("Diario");
    }
  }

  const perguntas = [
    {
      id: 1,
      titulo: 'Como foi o seu dia?',
      estado: respostaDia,
      setEstado: setRespostaDia,
      opcoes: [
        { id: 1, label: 'Muito bom', icon: require('../imagens/mediaDia/MuitoBom.png') },
        { id: 2, label: 'Bom', icon: require('../imagens/mediaDia/Bom.png') },
        { id: 3, label: 'Normal', icon: require('../imagens/mediaDia/Normal.png') },
        { id: 4, label: 'Ruim', icon: require('../imagens/mediaDia/Ruim.png') },
        { id: 5, label: 'Muito ruim', icon: require('../imagens/mediaDia/MuitoRuim.png') },
      ],
    },
    {
      id: 2,
      titulo: 'Como foi sua produtividade hoje?',
      estado: respostaProd,
      setEstado: setRespostaProd,
      opcoes: [
        { id: 1, label: 'Muito bom', icon: require('../imagens/mediaDia/MuitoBom.png') },
        { id: 2, label: 'Bom', icon: require('../imagens/mediaDia/Bom.png') },
        { id: 3, label: 'Normal', icon: require('../imagens/mediaDia/Normal.png') },
        { id: 4, label: 'Ruim', icon: require('../imagens/mediaDia/Ruim.png') },
        { id: 5, label: 'Muito ruim', icon: require('../imagens/mediaDia/MuitoRuim.png') },
      ],
    },
    {
      id: 3,
      titulo: 'Você sente que conseguiu controlar o consumo da(s) substância(s)?',
      estado: respostaCtrl,
      setEstado: setRespostaCtrl,
      opcoes: [
        { id: 1, label: 'Muito bom', icon: require('../imagens/mediaDia/MuitoBom.png') },
        { id: 2, label: 'Bom', icon: require('../imagens/mediaDia/Bom.png') },
        { id: 3, label: 'Normal', icon: require('../imagens/mediaDia/Normal.png') },
        { id: 4, label: 'Ruim', icon: require('../imagens/mediaDia/Ruim.png') },
        { id: 5, label: 'Muito ruim', icon: require('../imagens/mediaDia/MuitoRuim.png') },
      ],
    },
    {
      id: 4,
      titulo: 'Você sente que está tendo mais tempo para coisas que gosta (família, hobbies...)??',
      estado: respostaTemp,
      setEstado: setRespostaTemp,
      opcoes: [
        { id: 1, label: 'Muito bom', icon: require('../imagens/mediaDia/MuitoBom.png') },
        { id: 2, label: 'Bom', icon: require('../imagens/mediaDia/Bom.png') },
        { id: 3, label: 'Normal', icon: require('../imagens/mediaDia/Normal.png') },
        { id: 4, label: 'Ruim', icon: require('../imagens/mediaDia/Ruim.png') },
        { id: 5, label: 'Muito ruim', icon: require('../imagens/mediaDia/MuitoRuim.png') },
      ],
    },
  ];

  const todasRespondidas =
    respostaDia !== '' &&
    respostaProd !== '' &&
    respostaCtrl !== '' &&
    respostaTemp !== '';

  const salvarRespostas = () => {
    const respostasColetadas = {
      mediaDia: respostaDia,
      produtividade: respostaProd,
      controle: respostaCtrl,
      tempo: respostaTemp,
      comentario: respostaCmnt,
    };
    console.log('Respostas do usuário:', respostasColetadas);

    salvarDiario(respostasColetadas);
  };

  return (
    <ScrollView>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={20}
        showsVerticalScrollIndicator={false}
      >
        <View style={style.container}>
          <View style={style.header} />
          <View style={{ marginTop: 30, width: '80%', flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <TouchableOpacity style={{ padding: 10, marginRight: 10 }} onPress={() => navigation.navigate("Diario")}>
              <Icon
                name={'arrow-left'}
                size={30}
              />
            </TouchableOpacity>
            <Text style={style.title}>Registre o seu dia</Text>
          </View>

          {perguntas.map((pergunta) => (
            <View key={pergunta.id} style={style.questionContainer}>
              <Text style={style.questionTitle}>{pergunta.titulo}</Text>
              <View style={style.optionsContainer}>
                {pergunta.opcoes.map((opcao) => (
                  <TouchableOpacity
                    key={opcao.id}
                    style={[
                      style.optionButton,
                      pergunta.estado === opcao.label && style.selectedButton,
                    ]}
                    onPress={() => pergunta.setEstado(opcao.label)}
                  >
                    <Image
                      source={opcao.icon}
                      style={style.icon}
                    />
                    <Text
                      style={[
                        style.label,
                        pergunta.estado === opcao.label && style.selectedLabel,
                      ]}
                    >
                      {opcao.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          <View style={style.questionContainer}>
            <Text style={style.questionTitle}>Anote o seu dia livremente (opcional)</Text>
            <TextInput style={style.comentario}
              multiline={true}
              numberOfLines={5}
              placeholder="Anote qualquer coisa aqui..."
              placeholderTextColor='#888'
              value={respostaCmnt}
              onChangeText={setRespostaCmnt}
            />
          </View>

          <TouchableOpacity
            style={[style.button, !todasRespondidas && { backgroundColor: '#caceceff' }]}
            onPress={salvarRespostas}
            disabled={!todasRespondidas}
          >
            <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>Atualizar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
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
  },

  questionContainer: {
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    backgroundColor: '#ebffffff',
    width: '80%',
    borderRadius: 15,
    padding: 20,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  optionButton: {
    alignItems: 'center',
    padding: 6,
  },
  selectedButton: {
    backgroundColor: '#d3faffff',
    borderRadius: 10,
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  label: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
    maxWidth: 50,
    textAlign: 'center',
  },
  selectedLabel: {
    color: '#00796b',
    fontWeight: 'bold',
  },

  comentario: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    backgroundColor: '#FFF',
    borderWidth: 0.3,
    borderColor: '#E0E0E0',
    padding: 10,
  },

  button: {
    backgroundColor: '#5ce1e6',
    borderRadius: 100,
    padding: 10,
    width: '60%',
    marginBottom: 40,
    marginTop: 20,
  },
});