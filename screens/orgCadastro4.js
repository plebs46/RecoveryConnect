import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React, { useState } from "react";
import CheckBox from '../components/CheckBox';
import DateTimePicker from "@react-native-community/datetimepicker";

//Teste de contexto
import { useSignup } from '../context/UserSignupContext';
//Fim teste de contexto

const diasSemana = [
    { id: "1", nome: "Segunda-feira" },
    { id: "2", nome: "Terça-feira" },
    { id: "3", nome: "Quarta-feira" },
    { id: "4", nome: "Quinta-feira" },
    { id: "5", nome: "Sexta-feira" },
    { id: "6", nome: "Sábado" },
    { id: "7", nome: "Domingo" },
];

export default function OrgCadastro4({ navigation }) {
    //Teste de contexto
    const {
        nome, tipo, cnpj, email, telefone, rede_social, senha, foto
    } = useSignup();

    const handleLog = () => {
        console.log('🧾 Informações finais:');
        console.log({
            nome, tipo, cnpj, email, telefone, rede_social, senha, foto
        });
    };

    //Fim teste de contexto

    const [dias, setDias] = useState(
        diasSemana.map((d) => ({
            ...d,
            selecionado: false,
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
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 70, marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/arrowLeft.png')} style={{ marginRight: 20 }} />
                    </TouchableOpacity>
                    <Text style={est.title}>
                        Estamos quase lá!
                    </Text>
                </View>
                <Text style={{ fontSize: 16, marginBottom: 20, maxWidth: '80%', textAlign: 'center', fontWeight: 500 }}>
                    Informe os dias e horários de funcionamento da organização
                </Text>
                <Text style={[est.textCadlog, { marginBottom: 20 }]}>
                    (você pode definir horários diferentes para cada dia)
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
                    {/* Teste de contexto */}
                    <TouchableOpacity style={est.button} onPress={handleLog}>
                        <Text style={{ alignSelf: 'center', fontWeight: 'bold', }}>Testar</Text>
                    </TouchableOpacity>
                    {/* Fim Teste de contexto */}

                    <TouchableOpacity style={est.button} onPress={() => navigation.navigate("OrgEspera")}>
                        <Text style={{ alignSelf: 'center', fontWeight: 'bold', }}>Finalizar</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '30%' }}>
                        <Text style={est.textCadlog}>
                            Já possui uma conta?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("OrgLogin")}>
                            <Text style={est.cadlogNav}>
                                Entre
                            </Text>
                        </TouchableOpacity>
                        <Text style={est.textCadlog}>
                            agora!
                        </Text>
                    </View>
                </View>
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

    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    button: {
        backgroundColor: '#5ce1e6',
        borderRadius: 100,
        padding: 10,
        width: '100%',
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