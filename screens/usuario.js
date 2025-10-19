import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Modal, ScrollView } from 'react-native';
import { useState } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function Usuario({ navigation }) {
  const [userData, setUserData] = useState(
    {
      nome: 'Usuário',
      foto: require('../imagens/usericon.png'),
      dataNascimento: '01/01/1999',
      email: 'user@mail',
      tel: '(11) 99999-9999',
      cidade: 'Taboão da Serra',
    },
  );

  const { nome, dataNascimento, email, tel, cidade, foto } = userData;

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
      setUserData((prev) => ({
        ...prev,
        foto: tempImage,
      }));
    }
    setTempImage(null);
    setIsEditingImage(false);
  };

  const handleCancelImage = () => {
    setTempImage(null);
    setIsEditingImage(false);
  };

  const [showModal, setShowModal] = useState(false);
  const [fieldEditing, setFieldEditing] = useState(null);
  const [tempValue, setTempValue] = useState("");

  function handleEdit(field) {
    setFieldEditing(field);
    setTempValue(userData[field]);
    setShowModal(true);
  }

  function handleCancel() {
    setShowModal(false);
    setTempValue("");
    setFieldEditing(null);
  }

  function handleSave() {
    if (fieldEditing) {
      setUserData({
        ...userData,
        [fieldEditing]: tempValue,
      });
    }
    setShowModal(false);
    setTempValue("");
    setFieldEditing(null);
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={style.container}>
        <View style={style.header} />
        <View style={style.logoContainer}>
          <Text style={style.title}>Olá, {nome}</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
            <Image source={foto} style={style.logo} />
            <TouchableOpacity onPress={() => setIsEditingImage(true)} style={style.imgbutton}>
              <Text style={{ color: '#2e2e2e', fontWeight: 500 }}>Editar imagem</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          visible={isEditingImage}
          transparent
          animationType="fade"
          onRequestClose={handleCancelImage}
        >
          <View style={style.modalOverlay}>
            <View style={[style.modalBox, { alignItems: "center" }]}>
              <Text style={{ marginVertical: 15, fontSize: 16, fontWeight: "bold" }}>
                Alterar foto de perfil
              </Text>
              <Image
                source={tempImage || userData.foto}
                style={style.logo}
              />
              <TouchableOpacity
                onPress={pickImage}
                style={style.imgbutton}
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
                <TouchableOpacity onPress={handleCancelImage} style={style.cancelBtn}>
                  <Text style={{ paddingHorizontal: 5 }}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSaveImage} style={style.saveBtn}>
                  <Text style={{ paddingHorizontal: 5 }}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={{ width: '80%', marginBottom: 10 }}>
          <Text style={style.label}>Data de nascimento</Text>
          <View style={style.textBox}>
            <Text>{dataNascimento}</Text>
          </View>
        </View>
        <View style={{ width: '80%', marginBottom: 10 }}>
          <Text style={style.label}>Email</Text>
          <View style={style.textBox}>
            <Text>{email}</Text>
            <TouchableOpacity
              onPress={() => handleEdit("email")}
              style={{ marginLeft: 8, alignItems: 'flex-end' }}
            >
              <MaterialIcons name="edit" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: '80%', marginBottom: 10 }}>
          <Text style={style.label}>Telefone</Text>
          <View style={style.textBox}>
            <Text>{tel}</Text>
            <TouchableOpacity
              onPress={() => handleEdit("tel")}
              style={{ marginLeft: 8, alignItems: 'flex-end' }}
            >
              <MaterialIcons name="edit" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: '80%', marginBottom: 10 }}>
          <Text style={style.label}>Cidade</Text>
          <View style={style.textBox}>
            <Text>{cidade}</Text>
            <TouchableOpacity
              onPress={() => handleEdit("cidade")}
              style={{ marginLeft: 8, alignItems: 'flex-end' }}
            >
              <MaterialIcons name="edit" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <Modal visible={showModal} transparent animationType="fade">
          <View style={style.modalOverlay}>
            <View style={style.modalBox}>
              <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                Editar
              </Text>
              <TextInput
                value={tempValue}
                onChangeText={setTempValue}
                style={style.textBox}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 15,
                }}
              >
                <TouchableOpacity onPress={handleCancel} style={style.cancelBtn}>
                  <Text style={{ paddingHorizontal: 5 }}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave} style={style.saveBtn}>
                  <Text style={{ paddingHorizontal: 5 }}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={{ width: '80%', marginBottom: 10 }}>
          <Text style={style.label}>Senha</Text>
          <TouchableOpacity style={[style.textBox, style.buttonContainer]} onPress={() => navigation.navigate('UsuarioDados')}>
            <Text>Alterar senha</Text>
            <Ionicons name="chevron-forward" size={20} color="#555" />
          </TouchableOpacity>
        </View>
        <View style={{ width: '80%', marginBottom: 60 }}>
          <Text style={[style.label, {color: '#dd0505'}]}>Sair</Text>
          <TouchableOpacity style={[style.textBox, style.buttonContainer, {borderColor: '#dd0505'}]} onPress={() => navigation.navigate('TipoUser')}>
            <Text style={{color: '#dd0505'}}>Sair da conta</Text>
            <Ionicons name="log-out-outline" size={20} color="#dd0505ff" />
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#5ce1e6',
    height: 50,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 50,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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