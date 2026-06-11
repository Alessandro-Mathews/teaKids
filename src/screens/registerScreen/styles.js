import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    Container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
       

    },
    Formtitle: {
        flexDirection: "column",
        fontSize: 18,
        margin: 10,
        textAlign: 'center',
        color:'#040101'
    },
    FormInput: {
        borderColor: '#708090',
        borderWidth: 1,
        borderRadius: 10,
        fontSize:22,
        padding: 5,
        margin: 10,
        color:'#000000'
    },
    Pressable:{
        borderColor: '#708090',
        borderWidth: 2,
        borderRadius: 15,
        margin: 10,
    },
   PressableDois: {
    borderColor: '#708090',
    borderWidth: 1,
    borderRadius: 25, 
    margin: 10,
    paddingVertical: 10,   
    paddingHorizontal: 40, 
    alignItems: 'center',  
    justifyContent: 'center'
},
    Texto:{
        color: '#000000'
    },
    Container: {
    flex: 1,
    flexDirection: 'row', // deixa lado a lado
    backgroundColor: '#ffffff',
},

loginArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},

cadastroArea: {
    flex: 1,
    backgroundColor: '#B7E8F5',
    justifyContent: 'center',
    alignItems: 'center',
     borderWidth: 2,
      borderRadius: 9,
},

cardCadastro: {
    width: '80%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 25,
    padding: 25,
    marginBottom: 40,
},

textoCadastro: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
},

botaoCadastro: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
},

textoBotaoCadastro: {
    fontSize: 20,
    color: '#000',
},
    
});

export default styles;