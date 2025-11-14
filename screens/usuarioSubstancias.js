import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import CheckBox from '../components/CheckBox';
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function UsuarioSubstancias({ navigation }) {
  const [checkOptions, setCheckOptions] = useState({
    alcool: false,
    cigarro: false,
    cigarroEletronico: false,
    drogasIlicitas: false,
  });
  const [originalOptions, setOriginalOptions] = useState(null);
  const [alterado, setAlterado] = useState(false);

  useEffect(() => {
    buscarSubstanciasDoUsuario();
  }, []);

  async function buscarSubstanciasDoUsuario() {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      alert("Erro ao identificar usuário.");
      return;
    }

    const { data, error: erroBuscar } = await supabase
      .from("conta_usuario")
      .select("substancia")
      .eq("id_usuario", user.id)
      .single();

    if (erroBuscar) {
      console.error(erroBuscar);
      return;
    }

    if (data?.substancia) {
      const substancias = data.substancia;

      const inicial = {
        alcool: substancias.includes("alcool"),
        cigarro: substancias.includes("cigarro"),
        cigarroEletronico: substancias.includes("cigarro eletronico"),
        drogasIlicitas: substancias.includes("drogas ilicitas"),
      };

      setCheckOptions(inicial);
      setOriginalOptions(inicial);
    }
    setAlterado(false);
  }

  function handleCheck(key) {
    setCheckOptions(prev => {
      const novo = { ...prev, [key]: !prev[key] };

      if (originalOptions) {
        const mudou = JSON.stringify(novo) !== JSON.stringify(originalOptions);
        setAlterado(mudou);
      }

      return novo;
    });
  }

  function detectarAlteracao(novoEstado) {
    const originais = getSelectedSubstances(checkOptions);
    const novos = getSelectedSubstances(novoEstado);
    const iguais =
      originais.length === novos.length &&
      originais.every((v) => novos.includes(v));

    setAlterado(!iguais);
  }

  function getSelectedSubstances() {
    return Object.entries(checkOptions)
      .filter(([_, value]) => value)
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
        }
      });
  }

  async function salvarSubstancias() {
    const selecionadas = getSelectedSubstances();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      alert("Não foi possível identificar o usuário.");
      return;
    }

    const { error: erroUpdate } = await supabase
      .from("conta_usuario")
      .update({ substancia: selecionadas })
      .eq("id_usuario", user.id);

    if (erroUpdate) {
      console.error(erroUpdate);
      alert("Erro ao salvar.");
    } else {
      navigation.navigate("Usuario");
    }
  }

  return (
    <View style={style.container}>
      <View style={style.header} />
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%', marginTop: 50, marginBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/arrowLeft.png')} style={{ marginRight: 20 }} />
        </TouchableOpacity>
        <Text style={style.title}>Substâncias utilizadas</Text>
      </View>

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

      <View style={style.buttonContainer}>
        <TouchableOpacity
          style={[
            style.button,
            !alterado && { backgroundColor: '#cececeff', },
          ]}

          onPress={salvarSubstancias}
          disabled={!alterado}
        >
          <Text style={{ alignSelf: 'center', fontWeight: 'bold', }}>Salvar alterações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    backgroundColor: '#5CE1E6',
    height: 70,
    elevation: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    maxWidth: '70%',
  },
  button: {
    backgroundColor: '#5ce1e6',
    borderRadius: 100,
    padding: 10,
    width: '60%',
    marginTop: 30,
  },
  checkContainer: {
    width: '60%',
    marginTop: 15,
  },
  buttonContainer: {
    width: '80%',
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
});