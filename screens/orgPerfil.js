import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../lib/supabase';

export default function OrgPerfil({ navigation }) {
  async function deslogarConta() {
    try {
      await supabase.auth.signOut();
      navigation.replace("TipoUser");
    } catch (error) {
      console.log("Erro ao sair:", error);
    }
  }

  async function deleteAccount() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.warn('[deleteAccount] user não encontrado. Valor:', user);
        return;
      }

      console.log("Usuário logado:", user.id);

      const { data: orgData, error: orgError } = await supabase
        .from("organizacao")
        .select("imagem_perfil")
        .eq("codigo", user.id)
        .single();

      if (orgError) console.log("Erro ao buscar imagem:", orgError);

      if (orgData?.imagem_perfil) {
        const filePath = user.id;

        if (filePath) {
          const { error: storageError } = await supabase
            .storage
            .from("user_images")
            .remove([`${filePath}/`]);

          if (storageError) console.log("Erro ao apagar imagem:", storageError);
        }
      }

      const { error: deleteError } = await supabase.rpc("apagar_conta_organizacao", {
        usuario_uuid: user.id
      });

      if (deleteError) {
        console.log(deleteError);
        alert("Erro ao excluir a conta.");
        return;
      }

      await supabase.auth.signOut();
      alert("Conta excluída permanentemente.");
      navigation.replace("TipoUser");

    } catch (err) {
      console.error(err);
      alert("Erro inesperado");
    }
  }

  const [clinicaData, setClinicaData] = useState(null);
  useEffect(() => {
    const fetchClinicaData = async () => {
      try {
        const user = (await supabase.auth.getUser()).data.user;
        if (!user) return;

        const { data, error } = await supabase
          .from("organizacao")
          .select("*")
          .eq("codigo", user.id)
          .single();

        if (error) throw error;

        const { data: end, error: endError } = await supabase
          .from("endereco")
          .select("*")
          .eq("codigo_org", user.id)
          .single();

        if (endError) {
          console.log("Erro ao buscar endereço:", endError);
          return;
        }

        const formatted = {
          nome: data.nome || "",
          logo: data.imagem_perfil || null,
          tipo: data.tipo || "",
          cnpj: data.cnpj || "",
          informacoes: [
            { id: "1", label: "E-mail da instituição", valor: data.email || "" },
            { id: "2", label: "Telefone", valor: data.telefone || "" },
            { id: "3", label: "Rede social", valor: data.rede_social || "" },
          ],
          endereco: [
            { id: "1", label: "CEP", valor: end.cep },
            { id: "2", label: "Rua", valor: end.rua },
            { id: "3", label: "Número", valor: end.numero },
            { id: "4", label: "Bairro", valor: end.bairro },
            { id: "5", label: "Cidade", valor: end.cidade },
            { id: "6", label: "Estado", valor: end.estado },
          ],
        };

        setClinicaData(formatted);

      } catch (err) {
        console.log("Erro ao buscar dados da organização:", err);
      }
    };

    fetchClinicaData();
  }, []);

  const [isEditingImage, setIsEditingImage] = useState(false);
  const [tempImage, setTempImage] = useState(null);

  const [isEditing, setIsEditing] = useState(null);
  const [editSection, setEditSection] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    async function syncEmail() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: dados, error } = await supabase
        .from("organizacao")
        .select("email")
        .eq("codigo", user.id)
        .single();

      if (!error && dados.email !== user.email) {
        await supabase
          .from("organizacao")
          .update({ email: user.email })
          .eq("codigo", user.id);
      }
    }

    syncEmail();
  }, []);

  if (!clinicaData) {
    return (
      <View style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
        <Text>Carregando dados...</Text>
      </View>
    );
  }

  {/* Editar Imagem */ }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    })

    if (!result.canceled) {
      setTempImage(result.assets[0].uri);
    }
  }

  const handleSaveImage = async () => {
    try {
      if (!tempImage) return;

      const { data, error: userError } = await supabase.auth.getUser();
      if (userError || !data?.user) {
        console.log("Usuário não encontrado");
        return;
      }
      const userId = data.user.id;

      const response = await fetch(tempImage);
      const arrayBuffer = await response.arrayBuffer();
      const file = new Uint8Array(arrayBuffer);
      const filePath = `${userId}/perfil.jpg`;

      const { error: uploadError } = await supabase.storage
        .from("org_imagens")
        .upload(filePath, file, {
          contentType: "image/jpeg",
          upsert: true
        });

      if (uploadError) {
        console.log("Erro ao enviar imagem:", uploadError);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("org_imagens")
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;


      await supabase
        .from("organizacao")
        .update({ imagem_perfil: publicUrl })
        .eq("codigo", userId);

      // Atualiza estado da UI
      setClinicaData((prev) => ({
        ...prev,
        logo: `${publicUrl}?t=${Date.now()}`,
      }));

    } catch (err) {
      console.log("Erro ao salvar imagem:", err);
    }

    setTempImage(null);
    setIsEditingImage(false);
  };

  const handleCancelImage = () => {
    setTempImage(null);
    setIsEditingImage(false);
  };


  const { nome, tipo, cnpj } = clinicaData;
  {/* Editar Dados */ }
  const handleEdit = (item, section) => {
    setIsEditing(item.id);
    setTempValue(item.valor);
    setEditSection(section);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) {
        console.log("Nenhum usuário autenticado.");
        return;
      }

      const userId = userData.user.id;

      if (editSection === "informacoes") {
        const fieldToUpdate = {
          1: "email",
          2: "telefone",
          3: "rede_social"
        }[isEditing];

        if (!fieldToUpdate) return;

        if (fieldToUpdate === "email") {
          const { error: authError } = await supabase.auth.updateUser({
            email: tempValue
          });

          if (authError) {
            console.log("Erro Supabase Auth:", authError);
            alert("Erro ao solicitar mudança de e-mail.");
            return;
          }

          alert(
            "Um link de confirmação foi enviado para o novo e-mail. Confirme para concluir a alteração."
          );

          return;
        }

        const { error } = await supabase
          .from("organizacao")
          .update({ [fieldToUpdate]: tempValue })
          .eq("codigo", userId);

        if (error) console.log("Erro ao atualizar organização:", error);
        if (!error) {
          setClinicaData(prev => ({
            ...prev,
            informacoes: prev.informacoes.map(info =>
              info.id === isEditing ? { ...info, valor: tempValue } : info
            ),
          }));
        }
      }

      if (editSection === "endereco") {
        const fieldToUpdate = {
          1: "cep",
          2: "rua",
          3: "numero",
          4: "bairro",
          5: "cidade",
          6: "estado"
        }[isEditing];

        if (!fieldToUpdate) return;

        const { error } = await supabase
          .from("endereco")
          .update({ [fieldToUpdate]: tempValue })
          .eq("codigo_org", userId);

        if (error) console.log("Erro ao atualizar endereço:", error);
        if (!error) {
          setClinicaData(prev => ({
            ...prev,
            endereco: prev.endereco.map(info =>
              info.id === isEditing ? { ...info, valor: tempValue } : info
            ),
          }));
        }
      }

    } catch (err) {
      console.log("Erro ao salvar dados:", err);
    }

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
            <Text style={{ flex: 1 }}>{item.valor || "Nenhum"}</Text>
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
            <Image
              source={
                clinicaData.logo
                  ? { uri: `${clinicaData.logo}?t=${Date.now()}` }
                  : require('../assets/orgBase.jpg')
              }
              style={est.logo}
            />
            <TouchableOpacity onPress={() => setIsEditingImage(true)} style={est.imgbutton}>
              <Text style={{ color: '#2e2e2e', fontWeight: 500 }}>Editar imagem</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ width: '80%', marginBottom: 10 }}>
          <Text style={est.label}>Nome</Text>
          <View style={est.textBox}>
            <Text>{nome}</Text>
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

        <Text style={est.subtitle}>Sua conta</Text>
        <View style={{ width: '80%', marginBottom: 20 }}>
          <Text style={[est.label, { color: '#c40101ff' }]}>Sair da conta</Text>
          <TouchableOpacity style={[est.logoutBox, est.buttonContainer]} onPress={() => setLogoutConfirm(true)}>
            <Text style={{ color: '#c40101ff' }}>Sair</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '80%', marginBottom: 20 }}>
          <Text style={[est.label, { color: '#c40101ff' }]}>Excluir conta</Text>
          <TouchableOpacity style={[est.logoutBox, est.buttonContainer]} onPress={() => setDeleteConfirm(true)}>
            <Text style={{ color: '#c40101ff' }}>Deletar conta de organização</Text>
          </TouchableOpacity>
        </View>

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
                source={
                  tempImage
                    ? { uri: tempImage }
                    : clinicaData.logo
                      ? { uri: `${clinicaData.logo}?t=${Date.now()}` }
                      : require("../imagens/logoEx.png")
                }

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

        <Modal visible={logoutConfirm} transparent animationType="fade">
          <View style={est.overlay}>
            <View style={est.popup}>
              <Text style={est.popupTitulo}>Deseja realmente sair da sua conta?</Text>
              <Text style={est.mensagem}>Você precisará efetuar o login novamente para acessar sua conta.</Text>

              <View style={est.popupBotoes}>
                <TouchableOpacity onPress={() => setLogoutConfirm(false)} style={est.cancelar}>
                  <Text>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={est.confirmar} onPress={deslogarConta}>
                  <Text style={{ color: 'white' }}>Sair</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal visible={deleteConfirm} transparent animationType="fade">
          <View style={est.overlay}>
            <View style={est.popup}>
              <Text style={est.popupTitulo}>Tem certeza que quer excluir sua conta?</Text>
              <Text style={est.mensagem}>Essa ação não pode ser desfeita.</Text>

              <View style={est.popupBotoes}>
                <TouchableOpacity onPress={() => setDeleteConfirm(false)} style={est.cancelar}>
                  <Text>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={est.confirmar} onPress={deleteAccount}>
                  <Text style={{ color: 'white' }}>Deletar</Text>
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
  logoutBox: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c40101ff',
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  popup: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    paddingVertical: 25,
    width: '80%'
  },
  popupTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  mensagem: {
    marginBottom: 20,
    fontSize: 15
  },
  popupBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cancelar: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8
  },
  confirmar: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    borderRadius: 8
  },
});