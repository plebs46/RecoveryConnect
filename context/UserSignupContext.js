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
  const [foto, setFoto] = useState(''); // URL da imagem

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
        foto, setFoto
      }}
    >
      {children}
    </UserSignupContext.Provider>
  );
};

export const useSignup = () => useContext(UserSignupContext);
