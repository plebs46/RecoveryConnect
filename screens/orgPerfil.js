import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker';

export default function OrgPerfil({ navigation }) {
    const [clinicaData, setClinicaData] = useState({
        nome: 'REDE CLÍNICA - MASTER HEALTH LIFE',
        logo: require('../imagens/logoEx.png'),
        tipo: 'Clínica',
        cnpj: '12.345.678/0001-90',
        informacoes: [
            { id: '1', label: 'E-mail da instituição', valor: 'master.health@lifecare.com' },
            { id: '2', label: 'Telefone', valor: '(11) 91234-5678' },
            { id: '3', label: 'Rede social', valor: '@masterhealthlife' },
        ],
        endereco: [
            { id: '1', label: 'CEP', valor: '06763-190' },
            { id: '2', label: 'Rua', valor: 'R. Elizabetta Lips' },
            { id: '3', label: 'Número', valor: '184' },
            { id: '4', label: 'Bairro', valor: 'Jardim Bom Tempo' },
            { id: '5', label: 'Cidade', valor: 'Taboão da Serra' },
            { id: '6', label: 'Estado', valor: 'São Paulo' },
        ],
    });

    {/* Editar Imagem */}
    const [isEditingImage, setIsEditingImage] = useState(false);
    const [tempImage, setTempImage] = useState(null);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1
        })

        if (!result.canceled) {
            setTempImage({ uri: result.assets[0].uri });
        }
    }

    const handleSaveImage = () => {
        if (tempImage) {
            setClinicaData((prev) => ({
                ...prev,
                logo: tempImage, 
            }));
        }
        setTempImage(null);
        setIsEditingImage(false);
    };

    const handleCancelImage = () => {
        setTempImage(null); 
        setIsEditingImage(false);
    };

    {/* Editar Dados */}
    const { nome, logo, tipo, cnpj } = clinicaData;

    const [isEditing, setIsEditing] = useState(null);
    const [editSection, setEditSection] = useState(null);
    const [tempValue, setTempValue] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleEdit = (item, section) => {
        setIsEditing(item.id);
        setTempValue(item.valor);
        setEditSection(section);
        setShowModal(true);
    };

    const handleSave = () => {
        setClinicaData((prev) => ({
            ...prev,
            [editSection]: prev[editSection].map((info) =>
                info.id === isEditing ? { ...info, valor: tempValue } : info
            ),
        }));
        setShowModal(false);
        setIsEditing(null);
        setTempValue("");
        setEditSection(null);
    };

    const handleCancel = () => {
        setShowModal(false);
        setIsEditing(null);
        setTempValue("");
        setEditSection(null);
    };

    const Section = ({ data, sectionKey }) => (
        <View style={{ width: '80%' }}>
            {data.map((item) => (
                <View key={item.id} style={{ width: '100%', marginBottom: 10 }}>
                    <Text style={est.label}>{item.label}</Text>
                    <View style={est.textBox}>
                        <Text style={{ flex: 1 }}>{item.valor}</Text>
                        <TouchableOpacity
                            onPress={() => handleEdit(item, sectionKey)}
                            style={{ marginLeft: 8, alignItems: 'flex-end' }}
                        >
                            <MaterialIcons name="edit" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    );

    return (
        <ScrollView>
            <View style={est.container}>
                <View style={est.header} />
                <View style={est.logoContainer}>
                    <Text style={est.title}>{nome}</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                        <Image source={logo} style={est.logo} />
                        <TouchableOpacity onPress={() => setIsEditingImage(true)} style={est.imgbutton}>
                            <Text style={{ color: '#2e2e2e', fontWeight: 500 }}>Editar imagem</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ width: '80%', marginBottom: 10 }}>
                    <Text style={est.label}>Tipo</Text>
                    <View style={est.textBox}>
                        <Text>{tipo}</Text>
                    </View>
                </View>
                <View style={{ width: '80%', marginBottom: 10 }}>
                    <Text style={est.label}>CNPJ</Text>
                    <View style={est.textBox}>
                        <Text>{cnpj}</Text>
                    </View>
                </View>

                <Section
                    data={clinicaData.informacoes}
                    sectionKey="informacoes"
                />

                <View style={{ width: '80%', marginBottom: 10 }}>
                    <Text style={est.label}>Período de funcionamento</Text>
                    <TouchableOpacity style={[est.textBox, est.buttonContainer]} onPress={() => navigation.navigate('OrgPerfilDias')}>
                        <Text>Verificar</Text>
                        <Ionicons name="chevron-forward" size={20} color="#555" />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '80%', marginBottom: 20 }}>
                    <Text style={est.label}>Senha</Text>
                    <TouchableOpacity style={[est.textBox, est.buttonContainer]} onPress={() => navigation.navigate('OrgPerfilSenhaEdit')}>
                        <Text>Alterar senha</Text>
                        <Ionicons name="chevron-forward" size={20} color="#555" />
                    </TouchableOpacity>
                </View>

                <Text style={est.subtitle}>Endereço</Text>
                <Section
                    data={clinicaData.endereco}
                    sectionKey="endereco"
                />

                <Modal visible={showModal} transparent animationType="fade">
                    <View style={est.modalOverlay}>
                        <View style={est.modalBox}>
                            <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                                Editar {editSection === "informacoes" ? "Informação" : "Endereço"}
                            </Text>
                            <TextInput
                                value={tempValue}
                                onChangeText={setTempValue}
                                style={est.textBox}
                            />
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                    marginTop: 15,
                                }}
                            >
                                <TouchableOpacity onPress={handleCancel} style={est.cancelBtn}>
                                    <Text style={{ paddingHorizontal: 5 }}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleSave} style={est.saveBtn}>
                                    <Text style={{ paddingHorizontal: 5 }}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    visible={isEditingImage}
                    transparent
                    animationType="fade"
                    onRequestClose={handleCancelImage}
                >
                    <View style={est.modalOverlay}>
                        <View style={[est.modalBox, { alignItems: "center" }]}>
                            <Text style={{ marginVertical: 15, fontSize: 16, fontWeight: "bold" }}>
                                Alterar Logo
                            </Text>
                            <Image
                                source={tempImage || clinicaData.logo}
                                style={est.logo}
                            />
                            <TouchableOpacity
                                onPress={pickImage}
                                style={est.imgbutton}
                            >
                                <Text style={{ color: '#2e2e2e', fontWeight: 500, textAlign: 'center' }}>Escolher imagem</Text>
                            </TouchableOpacity>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                    marginTop: 25,
                                }}
                            >
                                <TouchableOpacity onPress={handleCancelImage} style={est.cancelBtn}>
                                    <Text style={{ paddingHorizontal: 5 }}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleSaveImage} style={est.saveBtn}>
                                    <Text style={{ paddingHorizontal: 5 }}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

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
        marginBottom: 40,
    },
    footer: {
        width: '100%',
        backgroundColor: '#5CE1E6',
        height: 60,
        elevation: 5,
        marginTop: 40,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 100,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        maxWidth: '80%',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 60,
        maxWidth: '80%',
        textAlign: 'center',
    },
    label: {
        fontWeight: 'bold',
        color: '#333',
    },
    textBox: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 12,
        margin: 5,
        width: '95%',
        marginVertical: 10,
        flexDirection: 'row'
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalBox: {
        width: "80%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    cancelBtn: {
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#5ce1e6",
        padding: 10,
        borderRadius: 15,
        marginRight: 10,
    },
    saveBtn: {
        backgroundColor: "#5ce1e6",
        padding: 10,
        borderRadius: 15,
    },
    imgbutton: {
        backgroundColor: '#5ce1e6',
        borderRadius: 100,
        padding: 10,
        width: 180,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
});