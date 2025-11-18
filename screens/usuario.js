import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Modal, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/supabase';

export default function Usuario({ navigation }) {
  const [logoutModalVisivel, setLogoutModalVisivel] = useState(false);
  const [deleteModalVisivel, setDeleteModalVisivel] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function carregarUsuario() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('conta_usuario')
        .select('nome_usuario, email, cidade, imagem_url')
        .eq('id_usuario', user.id)
        .single();

      if (!error && data) {
        setUserData({
          nome_usuario: data.nome_usuario,
          email: data.email,
          cidade: data.cidade,
          foto: data.imagem_url ? { uri: data.imagem_url } : require('../imagens/usericon.png'),
        });
      }
      setLoading(false);
    }
    carregarUsuario();
  }, []);

  const [userData, setUserData] = useState({
    nome_usuario: '',
    email: '',
    cidade: '',
    foto: require('../imagens/usericon.png')
  });
  const { nome_usuario, email, cidade, foto } = userData;

  const [isEditingImage, setIsEditingImage] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    });

    if (!result.canceled) {
      setTempImage({ uri: result.assets[0].uri });
    }
  };

  const uploadImage = async (uri) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const response = await fetch(uri);
      const arrayBuffer = await response.arrayBuffer();
      const file = new Uint8Array(arrayBuffer);

      const fileName = `foto_perfil_${Date.now()}.jpg`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("user_images")
        .upload(filePath, file, { contentType: "image/jpeg" });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("user_images")
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (err) {
      console.error("Erro ao enviar imagem:", err);
      return null;
    }
  };

  const handleSaveImage = async () => {
    if (!tempImage) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const imageUrl = await uploadImage(tempImage.uri);
    if (!imageUrl) return;

    const { error } = await supabase
      .from("conta_usuario")
      .update({ imagem_url: imageUrl })
      .eq("id_usuario", user.id);

    if (error) {
      console.log("Erro ao salvar URL no banco:", error);
      return;
    }

    setUserData((prev) => ({ ...prev, foto: { uri: imageUrl } }));
    setTempImage(null);
    setIsEditingImage(false);
  };

  const handleCancelImage = () => {
    setTempImage(null);
    setIsEditingImage(false);
  };

  function extractStoragePath(imageUrl) {
    const parts = imageUrl.split('/storage/v1/object/public/');
    if (parts.length < 2) return null;
    return parts[1].replace(/^[^/]+\//, '');
  }

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

  async function handleSave() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !fieldEditing) return;

      const novoValor = tempValue;

      if (fieldEditing === "email") {
        const { error } = await supabase.auth.updateUser({ email: novoValor });

        if (error) {
          console.log(error);
          alert("Erro ao atualizar email.");
          return;
        }

        alert(
          "Enviamos um link de confirmação para o novo email.\n" +
          "O endereço só será atualizado após a confirmação."
        );

        return finalize();
      }

      if (fieldEditing === "senha") {
        const { error } = await supabase.auth.updateUser({ password: novoValor });

        if (error) {
          console.log(error);
          alert("Erro ao atualizar senha.");
          return;
        }

        alert("Senha atualizada com sucesso!");
        return finalize();
      }

      const { error: dbError } = await supabase
        .from("conta_usuario")
        .update({ [fieldEditing]: novoValor })
        .eq("id_usuario", user.id);

      if (dbError) {
        console.log(dbError);
        alert("Erro ao atualizar informações.");
        return;
      }

      setUserData(prev => ({ ...prev, [fieldEditing]: novoValor }));
      finalize();

    } finally {}

    function finalize() {
      setShowModal(false);
      setTempValue("");
      setFieldEditing(null);
    }
  }


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <Text style={{ fontSize: 18, color: '#555' }}>Carregando dados do usuário...</Text>
      </View>
    );
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      // se quiser, manda pra tela de login
      navigation.replace("TipoUser");
    } else {
      console.log("Erro ao deslogar:", error);
    }
  }

  async function deletarConta() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error: buscaError } = await supabase
        .from('conta_usuario')
        .select('imagem_url')
        .eq('id_usuario', user.id)
        .single();

      if (buscaError) console.log("Erro ao buscar imagem:", buscaError);

      if (data?.imagem_url) {
        const filePath = extractStoragePath(data.imagem_url);

        const { error: storageError } = await supabase
          .storage
          .from('user_images')
          .remove([filePath]);

        if (storageError) console.log("Erro ao apagar imagem:", storageError);
        else console.log("📌 Imagem removida com sucesso", filePath);
      }

      const { error } = await supabase.rpc('apagar_conta', { usuario_uuid: user.id });

      if (error) {
        console.log(error);
        alert("Erro ao excluir a conta.");
        return;
      }

      await supabase.auth.signOut();
      alert("Conta excluída permanentemente.");
      navigation.replace('TipoUser'); // ou tela inicial

    } catch (err) {
      console.error(err);
      alert("Erro inesperado");
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={style.container}>
        <View style={style.header} />
        <View style={style.logoContainer}>
          <Text style={style.title}>Olá, {nome_usuario}</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
            <Image source={foto} style={style.logo} />
            <TouchableOpacity onPress={() => setIsEditingImage(true)} style={style.imgbutton}>
              <Text style={{ color: '#2e2e2e', fontWeight: 500 }}>Editar imagem</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal: editar imagem */}
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
          <Text style={style.label}>Nome de usuário</Text>
          <View style={style.textBox}>
            <Text>{nome_usuario}</Text>
            <TouchableOpacity
              onPress={() => handleEdit("nome_usuario")}
              style={{ marginLeft: 8, alignItems: 'flex-end' }}
            >
              <MaterialIcons name="edit" size={20} />
            </TouchableOpacity>
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

        {/* Modal: editar dados */}
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
          <Text style={style.label}>Substâncias</Text>
          <TouchableOpacity style={[style.textBox, style.buttonContainer]} onPress={() => navigation.navigate('UsuarioSubstancias')}>
            <Text>Ver substâncias</Text>
            <Ionicons name="chevron-forward" size={20} color="#555" />
          </TouchableOpacity>
        </View>
        <View style={{ width: '80%', marginBottom: 10 }}>
          <Text style={style.label}>Assinatura</Text>
          <TouchableOpacity style={[style.textBox, style.buttonContainer]} onPress={() => navigation.navigate('UsuarioAssinatura')}>
            <Text>Ver detalhes</Text>
            <Ionicons name="chevron-forward" size={20} color="#555" />
          </TouchableOpacity>
        </View>
        <View style={{ width: '80%', marginBottom: 10 }}>
          <Text style={style.label}>Senha</Text>
          <TouchableOpacity style={[style.textBox, style.buttonContainer]} onPress={() => navigation.navigate('UsuarioDados')}>
            <Text>Alterar senha</Text>
            <Ionicons name="chevron-forward" size={20} color="#555" />
          </TouchableOpacity>
        </View>
        <View style={{ width: '80%', marginBottom: 10 }}>
          <Text style={[style.label, { color: '#dd0505' }]}>Sair</Text>
          <TouchableOpacity style={[style.textBox, style.buttonContainer, { borderColor: '#dd0505' }]} onPress={() => setLogoutModalVisivel(true)}>
            <Text style={{ color: '#dd0505' }}>Sair da conta</Text>
            <Ionicons name="log-out-outline" size={20} color="#dd0505ff" />
          </TouchableOpacity>
        </View>
        <View style={{ width: '80%', marginBottom: 60 }}>
          <Text style={[style.label, { color: '#dd0505' }]}>Excluir conta</Text>
          <TouchableOpacity style={[style.textBox, style.buttonContainer, { borderColor: '#dd0505' }]} onPress={() => setDeleteModalVisivel(true)}>
            <Text style={{ color: '#dd0505' }}>Deletar</Text>
            <Ionicons name="trash-outline" size={20} color="#dd0505ff" />
          </TouchableOpacity>
        </View>

        {/* Modal: logout */}
        <Modal
          transparent
          animationType="fade"
          visible={logoutModalVisivel}
          onRequestClose={() => setLogoutModalVisivel(false)}
        >
          <View style={style.modalOverlay}>
            <View style={style.modalBox}>
              <Text style={{ fontWeight: "bold", marginBottom: 10, fontSize: 16 }}>Sair da conta?</Text>
              <Text style={{ marginBottom: 20 }}>Você sairá da sua conta, e precisará entrar novamente para acessar.</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                {/* Cancelar */}
                <TouchableOpacity onPress={() => setLogoutModalVisivel(false)} style={style.cancelBtn}>
                  <Text style={{ fontWeight: 'bold' }}>Cancelar</Text>
                </TouchableOpacity>

                {/* Confirmar */}
                <TouchableOpacity onPress={handleLogout} style={style.accountDataButton}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Sair</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal: deletar conta */}
        <Modal transparent visible={deleteModalVisivel} animationType="fade">
          <View style={style.modalOverlay}>
            <View style={style.modalBox}>
              <Text style={{ fontWeight: "bold", marginBottom: 10, fontSize: 16 }}>
                Tem certeza?
              </Text>
              <Text style={{ marginBottom: 20 }}>
                Isso vai apagar sua conta para sempre. Não poderá desfazer.
              </Text>
              <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                <TouchableOpacity onPress={() => setDeleteModalVisivel(false)} style={style.cancelBtn}>
                  <Text>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={deletarConta}
                  style={style.accountDataButton}>
                  <Text style={{ color: "#fff" }}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  accountDataButton: {
    backgroundColor: "#df5151ff",
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