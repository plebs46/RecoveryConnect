import {View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';

export default function DiarioNovo({navigation}) {
  const [respostaDia, setRespostaDia] = useState('');
  const [respostaProd, setRespostaProd] = useState('');
  const [respostaCtrl, setRespostaCtrl] = useState('');
  const [respostaTemp, setRespostaTemp] = useState('');
  const [respostaCmnt, setRespostaCmnt] = useState('');
  const [respostas, setRespostas] = useState(null);

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

  const salvarRespostas = () => {
    const respostasColetadas = {
      mediaDia: respostaDia,
      produtividade: respostaProd,
      controle: respostaCtrl,
      tempo: respostaTemp,
      comentario: respostaCmnt,
    };
    console.log('Respostas do usuário:', respostasColetadas);

    setRespostas(respostasColetadas);
  };

  return (
    <ScrollView>
      <View style={style.container}>
        <View style={style.header}/>
        <View style={{marginTop: 30, width: '80%', flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
          <TouchableOpacity style={{padding: 10, marginRight: 10}} onPress={()=>navigation.navigate("Diario")}>
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
            multiline = {true}
            numberOfLines = { 5 }
            placeholder="Anote qualquer coisa aqui..."
            value={respostaCmnt}
            onChangeText={setRespostaCmnt}
          />
        </View>

        <TouchableOpacity style={style.button} onPress={salvarRespostas}>
          <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>Atualizar</Text>
        </TouchableOpacity>

        {respostas && (
          <View style={style.card}>
            <Text style={style.mediaDia}>{"O seu dia foi " + respostas.mediaDia}</Text>
            <Text style={style.dados}>{"Produtividade " + respostas.produtividade + ", controle " + respostas.controle + ", " + respostas.tempo + " tempo"}</Text>
            <Text style={style.coment}>{respostas.comentario}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: 'white',
    alignItems:'center',
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
  title:{
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
    backgroundColor: '#DEFFFF',
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
    width: '90%',
  },
  optionButton: {
    alignItems: 'center',
    padding: 10,
  },
  selectedButton: {
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    padding: 15,
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

  button:{
    backgroundColor:'#5ce1e6',
    borderRadius:100,
    padding: 10,
    width:'60%',
    marginBottom: 40,
    marginTop: 20,
  },

  card: {
    backgroundColor: '#F3FFFF',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    marginVertical: 10,
    marginHorizontal: 3,
    width: '80%',
  },
  mediaDia: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dados: {
    fontSize: 16,
    marginTop: 5,
    maxWidth: '80%',
    marginLeft: 10,
  },
  coment: {
    fontSize: 14,
    marginTop: 7,
    maxWidth: '80%',
    marginLeft: 10,
    marginBottom: 5,
  },
});