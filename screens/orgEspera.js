import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrgEspera({ navigation }) {
    return (
        <SafeAreaView style={est.container}>
            <Image
                source={require('../imagens/RecoveryConnect.png')}
                style={est.logo}
            />

            <Text style={est.title}>
                Cadastro enviado com sucesso!
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 30, maxWidth: '80%', textAlign: 'center', fontWeight: 500 }}>
                Sua conta será analisada por nossa equipe
                e você receberá uma mensagem no e-mail cadastrado assim que estiver tudo pronto!
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 30, maxWidth: '80%', textAlign: 'center', fontWeight: 500 }}>
                ⏳ A verificação pode levar até 2 dias úteis.
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 20, maxWidth: '80%', textAlign: 'center', fontWeight: 500 }}>
                Retorne e realize o login após receber o e-mail para entrar na sua conta!
            </Text>

            <View style={est.buttonContainer}>
                <TouchableOpacity style={est.button} onPress={() => navigation.navigate("OrgLogin")}>
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold', }}>Voltar à tela de Login</Text>
                </TouchableOpacity>
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
        borderRadius: 1000,
        marginBottom: 50,
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
        alignItems: 'center',
        marginBottom: '30%' 
    },
});