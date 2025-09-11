import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useState } from "react";
import CheckBox from '../components/CheckBox';
import DateTimePicker from "@react-native-community/datetimepicker";

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
    const [dias, setDias] = useState(
        diasSemana.map((d) => ({
            ...d,
            selecionado: true,
            inicio: new Date(2023, 0, 1, 7, 0), // hora inicial padrão
            fim: new Date(2023, 0, 1, 18, 0),   // hora final padrão
            showInicio: false,
            showFim: false,
        }))
    );

    const toggleDia = (id) => {
        setDias((prev) =>
            prev.map((d) =>
                d.id === id ? { ...d, selecionado: !d.selecionado } : d
            )
        );
    };

    const setHorario = (id, tipo, event, selectedDate) => {
        if (event.type === "dismissed") return; // cancelado
        setDias((prev) =>
            prev.map((d) =>
                d.id === id ? { ...d, [tipo]: selectedDate, showInicio: false, showFim: false } : d
            )
        );
    };

    const abrirPicker = (id, tipo) => {
        setDias((prev) =>
            prev.map((d) =>
                d.id === id ? { ...d, [tipo === "inicio" ? "showInicio" : "showFim"]: true } : d
            )
        );
    };

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
                        {/* Cabeçalho */}
                        <View style={[
                            est.cardHeader,
                            { backgroundColor: item.selecionado ? "#5ce1e6" : "#e0e0e0" },
                        ]}>
                            <CheckBox
                                value={item.selecionado}
                                onChange={() => toggleDia(item.id)}
                            />
                            <Text style={est.diaTexto}>{item.nome}</Text>
                        </View>

                        {/* Corpo */}
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

                        {/* DatePickers */}
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
                    <TouchableOpacity style={est.button} onPress={salvarDados}>
                        <Text style={{ alignSelf: 'center', fontWeight: 'bold', }}>Salvar</Text>
                    </TouchableOpacity>
                </View>
                <View style={est.footer} />
            </View>
        </ScrollView>
    );
}

function salvarDados() {
    alert("Dados atualizados com sucesso!");
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