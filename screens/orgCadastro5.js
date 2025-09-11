import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function OrgCadastro5({ navigation }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <SafeAreaView style={est.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 70, marginBottom: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/arrowLeft.png')} style={{ marginRight: 20 }} />
                </TouchableOpacity>
                <Text style={est.title}>
                    Etapa final!
                </Text>
            </View>
            <Text style={{ fontSize: 16, marginBottom: 20, maxWidth: '80%', textAlign: 'center', fontWeight: 500 }}>
                Crie uma senha para acessar o sistema
            </Text>

            <View style={est.passwordContainer}>
                <TextInput style={est.passwordInput} placeholder='Crie sua Senha' placeholderTextColor='lightGray' secureTextEntry={!showPassword} />
                <TouchableOpacity
                    style={est.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        size={24}
                        color="gray"
                    />
                </TouchableOpacity>
            </View>
            <View style={est.passwordContainer}>
                <TextInput style={est.passwordInput} placeholder='Confirme sua Nova Senha' placeholderTextColor='lightGray' secureTextEntry={!showPassword} />
                <TouchableOpacity
                    style={est.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Ionicons
                        name={showPassword ? "eye-off" : "eye"}
                        size={24}
                        color="gray"
                    />
                </TouchableOpacity>
            </View>

            <View style={{ width:'60%', marginTop: 20, marginBottom: 30 }}>
                <Text style={est.senhaReq}>*Atenção! A senha deve conter:</Text>
                <Text style={est.senhaReq}> - Ao mínimo 8 caracteres;</Text>
                <Text style={est.senhaReq}> - Uma letra maiúscula;</Text>
                <Text style={est.senhaReq}> - Uma letra minúscula;</Text>
                <Text style={est.senhaReq}> - Um número;</Text>
                <Text style={est.senhaReq}> - Um caractere especial (@, #, $ etc).</Text>
            </View>

            <Text style={{ fontSize: 16, marginBottom: 20, maxWidth: '80%', textAlign: 'center', fontWeight: 500 }}>
                Após finalizar o cadastro, sua conta será analisada e você receberá um e-mail de confirmação.
            </Text>

            <View style={est.buttonContainer}>
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
    eyeIcon: {
        paddingHorizontal: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        width: '80%',
        margin: 5,
        marginVertical: 10,
    },
    passwordInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 20,
    },
    senhaReq: {
        fontSize: 12,
        color: 'gray',
        textAlign: 'left',
        marginBottom: 2,
    }
});