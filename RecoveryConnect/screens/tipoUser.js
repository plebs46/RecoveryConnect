import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from "react";

export default function TipoUser({ navigation }) {
    const [selectedProfile, setSelectedProfile] = useState(null);

    const handleProceed = () => {
        if (selectedProfile === 'paciente') {
            navigation.navigate("Login");
            console.log('navegar');
        } else if (selectedProfile === 'organizacao') {
            navigation.navigate("OrgLogin");
            console.log('navegar');
        }
    };

    return (
        <View style={style.container}>
            <Text style={style.title}>Qual das opções descreve melhor o seu perfil?</Text>

            <TouchableOpacity
                style={[style.card, selectedProfile === 'paciente' && style.selectedCard]}
                onPress={() => setSelectedProfile('paciente')}
            >
                <Text style={style.text}>Sou <Text style={{ fontWeight: 'bold' }}>paciente</Text>.</Text>
                <Text style={style.cardDescription}>
                    Sou paciente e desejo utilizar o aplicativo como apoio no meu processo de recuperação da dependência química.
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[style.card, selectedProfile === 'organizacao' && style.selectedCard]}
                onPress={() => setSelectedProfile('organizacao')}
            >
                <Text style={style.text}>Sou <Text style={{ fontWeight: 'bold' }}>organização</Text>.</Text>
                <Text style={style.cardDescription}>
                    Represento uma organização (clínica, hospital, ONG etc.) e desejo cadastrar minha instituição no aplicativo para oferecer apoio a quem precisa.
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[style.button, !selectedProfile && { backgroundColor: '#A0DDE0' }]}
                onPress={handleProceed}
                disabled={!selectedProfile}
            >
                <Text style={{ alignSelf: 'center', fontWeight: 'bold', }}>Prosseguir</Text>
            </TouchableOpacity>
        </View>
    );
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
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        borderWidth: 3,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        width: '80%',
    },
    selectedCard: {
        borderColor: '#5CE1E6',
    },
    cardTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    cardDescription: {
        fontSize: 14,
        textAlign: 'center',
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
});