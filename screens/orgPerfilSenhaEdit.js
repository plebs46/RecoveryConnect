import { TextInput, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';

export default function OrgPerfilSenhaEdit({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  const [erroAtual, setErroAtual] = useState("");
  const [erroNova, setErroNova] = useState("");
  const [erroConfirma, setErroConfirma] = useState("");

  const [tocadoAtual, setTocadoAtual] = useState(false);
  const [tocadoNova, setTocadoNova] = useState(false);
  const [tocadoConfirma, setTocadoConfirma] = useState(false);

  async function salvarDados() {
    if (erroAtual || erroNova || erroConfirma || !senhaAtual || !novaSenha || !confirmaSenha) {
      alert("Corrija os erros antes de salvar.");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: senhaAtual
    });

    if (signInError) {
      setErroAtual("Senha atual incorreta");
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: novaSenha
    });

    if (updateError) {
      alert("Erro ao atualizar senha.");
      return;
    }

    alert("Senha atualizada com sucesso!");
    setSenhaAtual("");
    setNovaSenha("");
    setConfirmaSenha("");
    setTocadoAtual(false);
    setTocadoNova(false);
    setTocadoConfirma(false);
  }

  return (
    <View style={est.container}>
      <View style={est.header} />

      <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%', marginTop: 50, marginBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/arrowLeft.png')} style={{ marginRight: 20 }} />
        </TouchableOpacity>
        <Text style={est.title}>
          Alterar senha
        </Text>
      </View>

      <View style={{ width: '100%', marginBottom: 30, alignItems: 'center' }}>
        <Text style={est.label}>Senha atual</Text>
        <View style={est.passwordContainer}>
          <TextInput
            style={[
              est.passwordInput,
              tocadoAtual && erroAtual ? { borderColor: "red" } : {}
            ]}
            placeholder="Digite sua senha atual"
            placeholderTextColor='#888'
            secureTextEntry={!showPassword}
            value={senhaAtual}
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            onFocus={() => setTocadoAtual(true)}
            onChangeText={(t) => {
              setSenhaAtual(t);
              if (tocadoAtual) setErroAtual(t.length === 0 ? "Informe sua senha atual" : "");
            }}
          />

          <TouchableOpacity style={est.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        {tocadoAtual && erroAtual !== "" && (
          <Text style={{ color: "red", fontSize: 11, width: "80%", paddingLeft: 10 }}>
            {erroAtual}
          </Text>
        )}

        <View style={{ width: '80%', flexDirection: 'row-reverse', }}>
          <TouchableOpacity style={est.esqueci}>
            <Text style={{ color: '#ababab' }}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ width: '100%', marginBottom: 10, alignItems: 'center' }}>
        <Text style={est.label}>Nova senha</Text>
        <View style={est.passwordContainer}>
          <TextInput
            style={[
              est.passwordInput,
              tocadoNova && erroNova ? { borderColor: "red" } : {}
            ]}
            placeholder="Digite a nova senha"
            placeholderTextColor='#888'
            secureTextEntry={!showPassword}
            value={novaSenha}
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            onFocus={() => setTocadoNova(true)}
            onChangeText={(t) => {
              setNovaSenha(t);
              if (tocadoNova) {
                if (t.length < 6) setErroNova("A senha deve ter pelo menos 6 caracteres");
                else setErroNova("");
              }
            }}
          />

          <TouchableOpacity style={est.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        {tocadoNova && erroNova !== "" && (
          <Text style={{ color: "red", fontSize: 11, width: "80%", paddingLeft: 10 }}>
            {erroNova}
          </Text>
        )}

        <View style={est.passwordContainer}>
          <TextInput
            style={[
              est.passwordInput,
              tocadoConfirma && erroConfirma ? { borderColor: "red" } : {}
            ]}
            placeholder="Confirme a nova senha"
            placeholderTextColor='#888'
            secureTextEntry={!showPassword}
            value={confirmaSenha}
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            onFocus={() => setTocadoConfirma(true)}
            onChangeText={(t) => {
              setConfirmaSenha(t);
              if (tocadoConfirma) {
                if (t !== novaSenha) setErroConfirma("As senhas não coincidem");
                else setErroConfirma("");
              }
            }}
          />

          <TouchableOpacity style={est.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        {tocadoConfirma && erroConfirma !== "" && (
          <Text style={{ color: "red", fontSize: 11, width: "80%", paddingLeft: 10 }}>
            {erroConfirma}
          </Text>
        )}
      </View>

      <View style={{ width: '60%', marginTop: 20, marginBottom: 30 }}>
        <Text style={est.senhaReq}>*Atenção! A senha deve conter ao menos 6 dígitos</Text>
      </View>

      <View style={est.buttonContainer}>
        <TouchableOpacity style={est.button} onPress={salvarDados}>
          <Text style={{ alignSelf: 'center', fontWeight: 'bold', }}>Salvar</Text>
        </TouchableOpacity>
      </View>
      <View style={est.footer} />
    </View>
  );
}

function salvarDados() {
  alert("Senha atualizada!");
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
    position: 'absolute',
    bottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 17,
    color: '#141414ff'
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    width: '80%',
  },
  senhaReq: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'left',
    marginBottom: 2,
  },
  button: {
    backgroundColor: '#5ce1e6',
    borderRadius: 100,
    padding: 10,
    width: '100%',
    marginTop: 30,
    marginBottom: 120,
  },

  buttonContainer: {
    width: '80%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});