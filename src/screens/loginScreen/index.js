import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';
import styles from './styles';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState(''); 

  const fazerLogin = async () => {
    if (!email || !senha) {
      setMensagem('Preencha todos os campos.');
      setTipoMensagem('erro');
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);

      setMensagem('Login realizado com sucesso!');
      setTipoMensagem('sucesso');
      Alert.alert('Sucesso', 'Login realizado!');
      navigation.navigate('SelApp'); 
      
    } catch (error) {
      setMensagem('Email ou senha inválidos.');
      setTipoMensagem('erro');
      Alert.alert('Erro', 'Email ou senha inválidos.');
    }
  };

  const recuperarSenha = async () => {
    if (!email) {
      setMensagem('Digite seu email para recuperar a senha.');
      setTipoMensagem('erro');
      Alert.alert('Erro', 'Digite seu email para recuperar a senha.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMensagem('Email de recuperação enviado! Verifique sua caixa de entrada.');
      setTipoMensagem('sucesso');
      Alert.alert('Recuperação enviada', 'Verifique seu email para redefinir sua senha.');
    } catch (error) {
      setMensagem(error.message);
      setTipoMensagem('erro');
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.loginArea}>
        <Text style={styles.Formtitle}>Login!</Text>

        <TextInput
          style={styles.FormInput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.FormInput}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <Pressable
          style={styles.PressableDois}
          onPress={fazerLogin} 
        >
          <Text style={styles.Texto}>Login</Text>
        </Pressable>

        <Pressable onPress={recuperarSenha}>
          <Text style={styles.Texto}>
            Esqueci a senha
          </Text>
        </Pressable>

        {mensagem ? (
          <Text
            style={[
              styles.textoCadastro,
              { color: tipoMensagem === 'sucesso' ? 'green' : 'red' }
            ]}
          >
            {mensagem}
          </Text>
        ) : null}
      </View>

      <View style={styles.cadastroArea}>
        <View style={styles.cardCadastro}>
          <Text style={styles.textoCadastro}>
            Entre ou crie uma nova conta
          </Text>
        </View>

        <Pressable
          style={styles.botaoCadastro}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.textoBotaoCadastro}>
            Criar Nova Conta
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
