import { StyleSheet } from 'react-native';
import { Cores } from '../../styles/color';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fundo: {
  width: '90%',
  height: 300,
  backgroundColor: Cores.primaria,
  marginTop: 70,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  
},

imagemMenino: {
  width: 320,
  height: 400,
  position: 'absolute',
  left: -60,
  bottom: -85,
},

imagemMenina: {
  width: 320,
  height: 320,
  position: 'absolute',
  right: -80,
  bottom: -55,
},

titulo: {
  fontSize: 40,
  fontFamily: 'Baloo2_700Bold',
  color: Cores.preto,
  marginBottom: 70,
},

titulo2:{
  fontSize: 22,
  fontFamily: 'Baloo2_700Bold',
  color: Cores.cinza,
  top: -65,
},

titulo3:{
 fontSize: 22,
  fontFamily: 'Baloo2_700Bold',
  color: Cores.cinza,
  top: -58,
},

botao: {
    width: 120,
    height: 45,
    backgroundColor: Cores.branco,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Cores.preto,
    top: -40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seta: {
    fontSize: 30,
    color: Cores.preto,
    fontWeight: 'bold',
  },

  nome:{
    width: 200,
   height: 200,
   top: -250,
  },

  titulo4:{
  fontSize: 22,
  fontFamily: 'Baloo2_700Bold',
  color: Cores.preto,
  top: -30,
  },
   sol:{
    width: 90,
   height: 90,
   left: 170,
   top: -12,
  },
   nuvem:{
    width: 100,
   height: 90,
   right: 200,
   top: -110,
  },

});