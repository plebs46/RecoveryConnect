import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CheckBox from '../components/CheckBox';
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Escolha({ navigation }) {
  const [checkOptions, setCheckOptions] = useState({
    alcool: false,
    cigarro: false,
    cigarroEletronico: false,
    drogasIlicitas: false,
  });

  function handleCheck(key) {
    setCheckOptions(prevOptions => ({
      ...prevOptions,
      [key]: !prevOptions[key],
    }));
  }

  return (
    <View style={style.container}>
      <Text style={style.title}>Para melhorar a sua experiência...</Text>
      <View style={style.card}>
        <Text style={style.text}>Quais substâncias a seguir você costuma utilizar?</Text>

        <View style={style.checkContainer}>
          <CheckBox
            label="Álcool"
            value={checkOptions.alcool}
            onChange={() => handleCheck('alcool')}
          />
          <CheckBox
            label="Cigarro"
            value={checkOptions.cigarro}
            onChange={() => handleCheck('cigarro')}
          />
          <CheckBox
            label="Cigarro Eletrônico"
            value={checkOptions.cigarroEletronico}
            onChange={() => handleCheck('cigarroEletronico')}
          />
          <CheckBox
            label="Drogas Ilícitas"
            value={checkOptions.drogasIlicitas}
            onChange={() => handleCheck('drogasIlicitas')}
          />
        </View>

        <TouchableOpacity style={style.button} onPress={salvarSubstancias}>
          <Text style={{ alignSelf: 'center', fontWeight: 'bold', }}>Prosseguir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  function getSelectedSubstances() {
    const selecionadas = Object.entries(checkOptions)
      .filter(([key, value]) => value)
      .map(([key]) => {
        switch (key) {
          case "alcool":
            return "alcool";
          case "cigarro":
            return "cigarro";
          case "cigarroEletronico":
            return "cigarro eletronico";
          case "drogasIlicitas":
            return "drogas ilicitas";
          default:
            return key;
        }
      });

    return selecionadas;
  }

  async function salvarSubstancias() {
    const substanciasSelecionadas = getSelectedSubstances();
    console.log("Substâncias selecionadas:", substanciasSelecionadas);

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("Erro ao obter usuário:", userError);
      alert("Não foi possível identificar o usuário.");
      return;
    }

    console.log("Usuário atual:", user.id);

    const { error } = await supabase
      .from("conta_usuario")
      .update({ substancia: substanciasSelecionadas })
      .eq("id_usuario", user.id);
  
    if (error) {
      console.error(error);
      alert("Erro ao salvar substâncias.");
    } else {
      alert("Substâncias salvas com sucesso!");
    }
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#DEFFFF',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginTop: '30%',
    marginBottom: 40,
    maxWidth: '70%',
  },
  card: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    width: '70%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#5ce1e6',
    borderRadius: 100,
    padding: 10,
    width: '70%',
    marginTop: 30,
  },

  checkContainer: {
    width: '75%'
  },
});