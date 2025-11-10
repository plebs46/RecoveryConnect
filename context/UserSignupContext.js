import React, { createContext, useContext, useState } from 'react';

const UserSignupContext = createContext();

export const UserSignupProvider = ({ children }) => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [rede_social, setRede_social] = useState('');
  const [senha, setSenha] = useState('');
  const [foto, setFoto] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  return (
    <UserSignupContext.Provider
      value={{
        nome, setNome,
        tipo, setTipo,
        cnpj, setCnpj,
        email, setEmail,
        telefone, setTelefone,
        rede_social, setRede_social,
        senha, setSenha,
        foto, setFoto,
        cep, setCep,
        rua, setRua,
        numero, setNumero,
        bairro, setBairro,
        cidade, setCidade,
        estado, setEstado
      }}
    >
      {children}
    </UserSignupContext.Provider>
  );
};

export const useSignup = () => useContext(UserSignupContext);
