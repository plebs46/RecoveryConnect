import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function OrgPerfilEdit({ navigation }) {
    return (
        <View style={est.container}>
            <View style={est.header} />

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 50, marginBottom: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/arrowLeft.png')} style={{ marginRight: 20 }} />
                </TouchableOpacity>
                <Text style={est.title}>
                    Editar dados
                </Text>
            </View>

            <View style={est.footer} />
        </View>
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
    esqueci: {
        fontFamily: 'Arial',
        fontSize: 12,
    },
});