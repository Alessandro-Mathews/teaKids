import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import styles from './styles';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemCadastro, setMensagemCadastro] = useState('');

  const cadastrar = async () => {
    if (!email || !senha) {
      setMensagemCadastro('Preencha todos os campos.');
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, senha);

      setMensagemCadastro('Conta criada com sucesso!');
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setMensagemCadastro('Este email já possui cadastro. Vá para Login.');
        Alert.alert(
          'Conta já existente',
          'Este email já está cadastrado. Faça login para continuar.'
        );
      } else {
        setMensagemCadastro(error.message);
        Alert.alert('Erro', error.message);
      }
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.cadastroArea}>
        <View style={styles.cardCadastro}>
          <Text style={styles.textoCadastro}>
            Entre ou crie uma nova conta
          </Text>
          <Text style={styles.textoCadastro}>
            Já possui cadastro? Vá para Login abaixo.
          </Text>
        </View>

        <Pressable
          style={styles.botaoCadastro}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.textoBotaoCadastro}>
            Já possui uma conta? Faça Login!
          </Text>
        </Pressable>
      </View>

      <View style={styles.loginArea}>
        <Text style={styles.Formtitle}>
          Crie Sua Conta:
        </Text>

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
          onPress={cadastrar}
        >
          <Text style={styles.Texto}>
            Cadastre-se
          </Text>
        </Pressable>

        {mensagemCadastro ? (
          <Text style={styles.textoCadastro}>
            {mensagemCadastro}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
