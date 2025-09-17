import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';

export default function OrgCadastro3({ navigation }) {
    const [image, setImage] = useState(require('../assets/imgBase.png'));
    const [fileName, setFileName] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setFileName(result.assets[0].name);
        } else if (result.name) {
            setFileName(result.name);
        }
    };

    return (
        <SafeAreaView style={est.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 70, marginBottom: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/arrowLeft.png')} style={{ marginRight: 20 }} />
                </TouchableOpacity>
                <Text style={est.title}>
                    Continue o cadastro!
                </Text>
            </View>
            <Text style={{ fontSize: 16, marginBottom: 20, maxWidth: '80%', textAlign: 'center', fontWeight: 500 }}>
                Adicione uma imagem que represente a organização!
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 20, maxWidth: '80%', textAlign: 'center' }}>
                Ex.: Logo, foto da fachada, etc.
            </Text>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                <Image source={typeof image === 'string' ? { uri: image } : image} style={est.image} />
                <TouchableOpacity onPress={pickImage} style={est.imgbutton}>
                    <Text style={{ color: '#2e2e2e', fontWeight: 500 }}>Editar imagem</Text>
                </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 16, marginTop: 15, maxWidth: '80%', textAlign: 'center', fontWeight: 500 }}>
                Adicione uma Rede Social
            </Text>
            <TextInput style={est.textBox} placeholder='@exemplo' placeholderTextColor='lightGray' />

            <Text style={{ fontSize: 16, marginTop: 15, maxWidth: '80%', textAlign: 'center', fontWeight: 500 }}>
                Anexe o estatuto social (opcional)
            </Text>
            <View style={est.attachContainer}>
                <Text style={est.attachText} numberOfLines={1} ellipsizeMode="tail">
                    {fileName ? fileName : 'Nenhum arquivo anexado'}
                </Text>
                <TouchableOpacity style={est.attachButton} onPress={pickDocument}>
                    <Ionicons name="add" size={28} color="white" />
                </TouchableOpacity>
            </View>

            <View style={est.buttonContainer}>
                <TouchableOpacity style={est.button} onPress={() => navigation.navigate("OrgCadastro4")}>
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold', }}>Etapa 3 de 4</Text>
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
        margin: 10,
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
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
        margin: 5
    },
    imgbutton: {
        backgroundColor: '#5ce1e6',
        borderRadius: 100,
        padding: 10,
        width: 120,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    attachContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        width: '80%',
        marginVertical: 10,
        paddingLeft: 17,
        backgroundColor: 'white',
    },
    attachText: {
        flex: 1,
        color: '#ababab',
        fontSize: 16,
    },
    attachButton: {
        backgroundColor: '#5ce1e6',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});