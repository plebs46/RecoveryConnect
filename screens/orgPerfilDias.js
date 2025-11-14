import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useState, useEffect } from "react";
import CheckBox from '../components/CheckBox';
import DateTimePicker from "@react-native-community/datetimepicker";
import { supabase } from '../lib/supabase';

const diasSemana = [
  { id: "1", nome: "Segunda-feira" },
  { id: "2", nome: "Terça-feira" },
  { id: "3", nome: "Quarta-feira" },
  { id: "4", nome: "Quinta-feira" },
  { id: "5", nome: "Sexta-feira" },
  { id: "6", nome: "Sábado" },
  { id: "7", nome: "Domingo" },
];

export default function OrgPerfilDias({ navigation }) {
  const [dias, setDias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [alterado, setAlterado] = useState(false);

  useEffect(() => {
    buscarHorarios();
  }, []);

  async function buscarHorarios() {
    setCarregando(true);

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData.session) {
      Alert.alert("Erro", "Nenhuma sessão encontrada.");
      return;
    }
    const user = sessionData.session.user;
    const orgId = user.id;

    const { data, error } = await supabase
      .from("organizacao_horarios")
      .select("*")
      .eq("org_id", orgId);

    if (error) console.log(error);

    const diasProntos = diasSemana.map((dia) => {

      const encontrado = data?.find((d) => d.dia_semana == dia.nome);

      if (encontrado) {
        const [hIni, mIni] = encontrado.hora_inicio.split(":");
        const [hFim, mFim] = encontrado.hora_fim.split(":");

        return {
          ...dia,
          selecionado: true,
          inicio: new Date(2023, 0, 1, hIni, mIni),
          fim: new Date(2023, 0, 1, hFim, mFim),
          showInicio: false,
          showFim: false,
        };
      }

      return {
        ...dia,
        selecionado: false,
        inicio: new Date(2023, 0, 1, 7, 0),
        fim: new Date(2023, 0, 1, 18, 0),
        showInicio: false,
        showFim: false,
      };
    });

    setDias(diasProntos);
    setCarregando(false);
  }

  function marcarAlterado() {
    setAlterado(true);
  }

  const toggleDia = (id) => {
    setDias((prev) =>
      prev.map((d) => d.id === id ? { ...d, selecionado: !d.selecionado } : d)
    );
    marcarAlterado();
  };

  const setHorario = (id, tipo, event, selectedDate) => {
    if (event.type === "dismissed") return;

    setDias((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, [tipo]: selectedDate, showInicio: false, showFim: false }
          : d
      )
    );
    marcarAlterado();
  };

  const abrirPicker = (id, tipo) => {
    setDias((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, [tipo === "inicio" ? "showInicio" : "showFim"]: true }
          : d
      )
    );
  };

  async function salvarDados() {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData.session) {
      Alert.alert("Erro", "Nenhuma sessão encontrada.");
      return;
    }
    const user = sessionData.session.user;
    const orgId = user.id;
    
    if (!orgId) {
      Alert.alert("Erro", "ID da organização não encontrado.");
      return;
    }

    const selecionados = dias.filter((d) => d.selecionado);

    const payload = selecionados.map((d) => ({
      org_id: orgId,
      dia_semana: d.nome,
      hora_inicio: d.inicio.toTimeString().slice(0, 5),
      hora_fim: d.fim.toTimeString().slice(0, 5),
    }));

    try {
      await supabase
        .from("organizacao_horarios")
        .delete()
        .eq("org_id", orgId);

      const { error } = await supabase
        .from("organizacao_horarios")
        .insert(payload);

      if (error) {
        console.log(error);
        Alert.alert("Erro", "Não foi possível salvar os horários.");
        return;
      }

      alert("Horários atualizados!");
      setAlterado(false);

    } catch (e) {
      console.log("Erro ao salvar:", e);
    }
  }


  if (carregando) {
    return <Text>Carregando...</Text>;
  }

  return (
    <ScrollView>
      <View style={est.container}>
        <View style={est.header} />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50, marginBottom: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../assets/arrowLeft.png')} style={{ marginRight: 20 }} />
          </TouchableOpacity>
          <Text style={est.title}>
            Dias e horários
          </Text>
        </View>
        <Text style={{ fontSize: 16, marginBottom: 20, maxWidth: '80%', textAlign: 'center', fontWeight: 500 }}>
          Veja aqui os dias e horários de funcionamento do seu estabelecimento.
        </Text>
        <Text style={[est.textCadlog, { marginBottom: 20 }]}>
          (você pode editar os dias e horários caso necessário)
        </Text>

        {dias.map((item) => (
          <View key={item.id} style={est.card}>

            <View
              style={[
                est.cardHeader,
                { backgroundColor: item.selecionado ? "#5ce1e6" : "#e0e0e0" },
              ]}
            >
              <CheckBox
                value={item.selecionado}
                onChange={() => toggleDia(item.id)}
              />
              <Text style={est.diaTexto}>{item.nome}</Text>
            </View>

            {item.selecionado && (
              <View style={est.cardBody}>
                <View style={est.col}>
                  <Text style={est.label}>Início</Text>
                  <TouchableOpacity
                    style={est.horaBox}
                    onPress={() => abrirPicker(item.id, "inicio")}
                  >
                    <Text style={est.horaTexto}>
                      {item.inicio.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={est.col}>
                  <Text style={est.label}>Fim</Text>
                  <TouchableOpacity
                    style={est.horaBox}
                    onPress={() => abrirPicker(item.id, "fim")}
                  >
                    <Text style={est.horaTexto}>
                      {item.fim.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {item.showInicio && (
              <DateTimePicker
                value={item.inicio}
                mode="time"
                is24Hour={true}
                onChange={(e, d) => setHorario(item.id, "inicio", e, d)}
              />
            )}

            {item.showFim && (
              <DateTimePicker
                value={item.fim}
                mode="time"
                is24Hour={true}
                onChange={(e, d) => setHorario(item.id, "fim", e, d)}
              />
            )}
          </View>
        ))}

        <View style={est.buttonContainer}>
          <TouchableOpacity
            style={[
              est.button,
              { opacity: alterado ? 1 : 0.4 } // 🔵 botão desabilitado
            ]}
            onPress={alterado ? salvarDados : null}
          >
            <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
              Salvar
            </Text>
          </TouchableOpacity>
        </View>
        <View style={est.footer} />
      </View>
    </ScrollView>
  );
}

const est = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    backgroundColor: '#5CE1E6',
    height: 70,
    elevation: 5,
  },
  footer: {
    width: '100%',
    backgroundColor: '#5CE1E6',
    height: 60,
    elevation: 5,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: '#5ce1e6',
    borderRadius: 100,
    padding: 10,
    width: '100%',
    marginTop: 30,
    marginBottom: 100,
  },

  buttonContainer: {
    width: '80%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textCadlog: {
    fontFamily: 'Arial',
    fontSize: 12,
    color: '#ababab',
  },
  cadlogNav: {
    fontFamily: 'Arial',
    fontSize: 12,
    color: '#5CE1E6',
    paddingHorizontal: 4,
    paddingVertical: 5,
  },
  textBox: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 12,
    paddingLeft: 17,
    margin: 5,
    width: '80%',
    marginVertical: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#aaa",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#333",
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '80%',
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4dd0e1", // azul mais forte
    padding: 12,
  },
  diaTexto: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  cardBody: {
    backgroundColor: "#e0f7fa", // azul claro
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
  },
  col: {
    alignItems: "center"
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "500"
  },
  horaBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  horaTexto: {
    fontSize: 16,
    fontWeight: "bold"
  },
});