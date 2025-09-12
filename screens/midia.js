import {View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Linking, Dimensions} from 'react-native';

export default function Midia({navigation}) {
  const midia = [
    {
      id: 1,
      imagem: require('../imagens/midia/md1.jpg'),
      titulo: 'Problemas escolares e o consumo de álcool e outras drogas entre adolescentes',
      data: 'Maio 2014',
      link: 'https://www.scielo.br/j/pee/a/Q9vFZrYKyXL9kq7FkHP7fhy/',
    },
    {
      id: 2,
      imagem: require('../imagens/midia/md2.jpg'),
      titulo: 'Mulheres dependentes químicas: quais as causas do aumento do consumo abusivo de álcool e drogas?',
      data: 'Julho 2024',
      link: 'https://hospitalsantamonica.com.br/mulheres-dependentes-quimicas-quais-as-causas-do-aumento-do-consumo-abusivo-de-alcool-e-drogas/',
    },
    {
      id: 3,
      imagem: require('../imagens/midia/md3.jpg'),
      titulo: 'Filhos de usuárias de drogas desenvolvem dependência química',
      data: 'Abril 2015',
      link: 'https://hospitalsantamonica.com.br/filhos-de-usuarias-de-drogas-desenvolvem-dependencia-quimica/',
    },
  ];

  const nossasObras = [
    {
      id: 1,
      imagem: require('../imagens/midia/nmd1.png'),
      titulo: 'Health Tech Info - Vape, cigarro, maconha e cocaína: o impacto na saúde',
      data: 'Setembro 2024',
      link: 'https://www.canva.com/design/DAGIfJdIpLQ/G9C1vq1x19FiNtJ1tzLIiQ/view?utm_content=DAGIfJdIpLQ&utm_campaign=designshare&utm_medium=link&utm_source=editor',
    },
    {
      id: 2,
      imagem: require('../imagens/midia/nmd2.png'),
      titulo: 'A Cocaína e seus efeitos ao corpo humano',
      data: 'Junho 2024',
      link: 'https://www.canva.com/design/DAGImaFhcnA/napj1fMyvXm2SaQ7t42P0Q/view?utm_content=DAGImaFhcnA&utm_campaign=designshare&utm_medium=link&utm_source=editor',
    },
    {
      id: 3,
      imagem: require('../imagens/midia/nmd3.png'),
      titulo: 'O que são metais pesados? Os principais metais encontrados no cigarro eletrônico',
      data: 'Junho 2024',
      link: 'https://etecspgov.sharepoint.com/sites/DependnciaQumica2B-divA/Shared%20Documents/metais-pesados_64366582.png?web=1',
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={style.card} onPress={() => Linking.openURL(item.link)}>
      <Image style={style.imagem} source={item.imagem}/>
      <Text style={style.tituloMidia}>{item.titulo}</Text>
      <Text style={style.data}>{item.data}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={style.container}>
      <View style={style.header}/>

      <Text style={style.title}>Obras recomendadas</Text>
      <FlatList
        style={{width: '90%', padding: 5}}
        data={midia}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={style.title}>Produzidas pela equipe</Text>
      <FlatList
        style={{width: '90%', padding: 5}}
        data={nossasObras}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
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
    marginTop: 30,
    width: '80%',
  },

  card: {
    backgroundColor: '#F3FFFF',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    marginVertical: 10,
    marginHorizontal: 10,
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').height * 0.35,
  },
  tituloMidia: {
    fontSize: 18,
    marginVertical: 10,
    width: '90%',
    height: '35%',
  },
  imagem: {
    width: '100%',
    height: '50%',
  },
  data: {
    fontSize: 14,
    color: '#c0c0c0',
    height: '10%',
  }
});