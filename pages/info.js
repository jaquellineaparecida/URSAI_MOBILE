import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useFonts, Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold } from  '@expo-google-fonts/nunito';
import { useNavigation } from '@react-navigation/native';

const Info = () => {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Nunito_400Regular, 
    Nunito_500Medium, 
    Nunito_600SemiBold, 
    Nunito_700Bold,
 });

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/Vector.png')} style={styles.backgroundImage}>
        <View style={styles.textContainer}>
          <Text style={styles.text1}>
            A URSAI é o melhor algoritmo de recomendação especializada em ecommerce para a sua empresa!
          </Text>
          <Text style={styles.text2}>
            Descubra nossos planos e impulsione seus lucros e sua base de clientes agora mesmo!
          </Text>
        </View>
        <TouchableOpacity style={styles.buttonContainer} 
        onPress={() => navigation.navigate('Conheca')} >
          <Text style={styles.buttonText}>Conhecer os planos</Text>
          <Image source={require('../assets/arrow01.png')} style={styles.icon}/>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    width: 310,
    height: 550,
  },
  textContainer: {
    alignItems: 'center',
  },
  text1: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 20,
    textAlign: 'left',
    width: '90%',
    marginTop: 110
  },
  text2: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Nunito_700Bold',
    textAlign: 'left',
    width: '90%',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#4895EF',
    borderRadius: 10,
    padding: 10,
    marginTop: 200, 
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Nunito_600SemiBold'
  },
  icon: {
    marginLeft: 10,
    width: 30,
    height: 30,
  },
});

export default Info;
