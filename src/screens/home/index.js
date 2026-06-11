import React from 'react'; // É uma boa prática manter o React importado
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>

      <Image
        source={require('../../assets/imagem/sol.icon.png')}
        style={styles.sol}
      />

      <Image
        source={require('../../assets/imagem/nuvem.icon.png')}
        style={styles.nuvem}
      />

      <Image
        source={require('../../assets/imagem/nome.icon.png')}
        style={styles.nome}
      />

      <View style={styles.fundo}>

        <Text style={styles.titulo}> Vamos Começar? </Text>

        <Text style={styles.titulo2}>Bem Vindo! Entre ou Crie sua conta!</Text>
        <Text style={styles.titulo3}>Monte Sua Própria Rotina!</Text>

        <TouchableOpacity 
          style={styles.botao} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.seta}>→</Text>
        </TouchableOpacity>

        <Text style={styles.titulo4}>Seguinte</Text>

        <Image
          source={require('../../assets/imagem/menino.icon.png')}
          style={styles.imagemMenino}
        />
        <Image
          source={require('../../assets/imagem/menina_icon.png')}
          style={styles.imagemMenina}
        />

      </View>

    </View>
  );
}