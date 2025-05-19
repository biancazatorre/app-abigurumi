import { StyleSheet, Dimensions } from 'react-native';


const styles = StyleSheet.create({
 
   galeria: {
    marginBottom: 20,
  },
  galeriaContent: {
    paddingHorizontal: 10,
  },
  produtoImagem: {
  width: 150,
  height: 150,
  borderRadius: 10,
  marginRight: 10,
},
bannerImagem: {
  width: Dimensions.get('window').width * 0.9,
  height: 180,
  borderRadius: 12,
  marginRight: 10,
},

 });

export default styles;