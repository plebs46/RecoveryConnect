import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import React, { useState } from 'react';

const data = [
    { label: 'Clínica pública', value: 'clinica-publica' },
    { label: 'Clínica privada', value: 'clinica-privada' },
    { label: 'ONG', value: 'ong' },
    { label: 'Projetos de comunidades e igrejas', value: 'projetos' },
];

export default function OrgCadastro1({ navigation }) {
    const [value, setValue] = useState(null);

    return (
        <SafeAreaView style={est.container}>
            <Image
                source={require('../imagens/RecoveryConnect.png')}
                style={est.logo}
            />

            <Text style={est.title}>
                Crie a sua conta de Organização!
            </Text>
            <Text style={est.textCadlog}>
                Ao realizar o cadastro, verificaremos as suas informações
            </Text>

            <TextInput style={est.textBox} placeholder='Nome de Usuário / Nome da Organização' placeholderTextColor='lightGray' />

            <Dropdown
                style={est.textBox}
                placeholderStyle={est.placeholderStyle}
                selectedTextStyle={est.selectedTextStyle}
                inputSearchStyle={est.inputSearchStyle}
                iconStyle={est.iconStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Selecione o tipo de instituição'}
                value={value}
                onChange={item => {
                    setValue(item.value);
                }}
            />

            <TextInput style={est.textBox} placeholder='CNPJ' placeholderTextColor='lightGray' />
            <TextInput style={est.textBox} placeholder='E-mail da instituição' placeholderTextColor='lightGray' />
            <TextInput style={est.textBox} placeholder='Telefone' placeholderTextColor='lightGray' />

            <View style={est.buttonContainer}>
                <TouchableOpacity style={est.button} onPress={() => navigation.navigate("OrgCadastro2")}>
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold', }}>Etapa 1 de 5</Text>
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
        </SafeAreaView>
    );
}

const est = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',
    },

    logo: {
        height: '25%',
        width: '60%',
        marginTop: 40,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        maxWidth: '80%',
        textAlign: 'center',
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
        alignItems: 'center'
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
        fontSize: 14,
        color: "#aaa",
    },
    selectedTextStyle: {
        fontSize: 16,
        color: "#333",
        paddingLeft: 0,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },

});