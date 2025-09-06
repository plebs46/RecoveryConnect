import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function OrgCadastro5({ navigation }) {
    return (
        <SafeAreaView style={est.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 100, marginBottom: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/arrowLeft.png')} style={{ marginRight: 20 }} />
                </TouchableOpacity>
                <Text style={est.title}>
                    Continue o cadastro!
                </Text>
            </View>
            <Text style={{ fontSize: 16, marginBottom: 20, maxWidth: '80%', textAlign: 'center', fontWeight: 500 }}>
                Insira o endereço da organização
            </Text>

            <TextInput style={est.textBox} placeholder='CEP' placeholderTextColor='lightGray' />
            <TextInput style={est.textBox} placeholderTextColor='lightGray' placeholder="Rua" keyboardType="numeric" maxLength={10} />
            <TextInput style={est.textBox} placeholder='Bairro' placeholderTextColor='lightGray' />
            <TextInput style={est.textBox} placeholder='Número' placeholderTextColor='lightGray' />
            <TextInput style={est.textBox} placeholder='Cidade' placeholderTextColor='lightGray' />
            <TextInput style={est.textBox} placeholder='Estado' placeholderTextColor='lightGray' />

            <View style={est.buttonContainer}>
                <TouchableOpacity style={est.button} onPress={() => navigation.navigate("OrgCadastro3")}>
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold', }}>Etapa 2 de 5</Text>
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

});