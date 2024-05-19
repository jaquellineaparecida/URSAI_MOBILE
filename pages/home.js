import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useFonts, JosefinSans_700Bold } from '@expo-google-fonts/josefin-sans';
import { Kanit_400Regular, Kanit_500Medium, Kanit_700Bold } from '@expo-google-fonts/kanit';
import { useNavigation } from '@react-navigation/native';



function HomeScreen () {
  const navigation = useNavigation();
  
  let [fontsLoaded] = useFonts({
    JosefinSans_700Bold,
    Kanit_400Regular,
    Kanit_500Medium, 
    Kanit_700Bold
 });
  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.contentContainer}>
        <Text style={styles.logoText}>URSAI</Text>
        <Image
          style={styles.logoImage}
          source={require('../assets/brain.png')}
        />
      </View>
      <Text style={styles.descriptionText}>
        Descobrindo a sua próxima compra
      </Text>
      <View style={styles.btnCont}>
        <View style={styles.button}>
          <Button style={styles.buttonText} title="Conheça a URSAI" color="#4895EF"  
          onPress={() => navigation.navigate('Info')}/>
        </View>
        <View style={styles.button}>
          <Button style={styles.buttonText} title="Login" color="#4895EF"  
          onPress={() => navigation.navigate('Login')}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 430,
    height: 932,
    backgroundColor: '#3F37CA',
  },
  logoText: {
    color: 'white',
    fontSize: 36,
    fontFamily: 'JosefinSans_700Bold',
    marginRight: 10,
    marginTop: 10
  },
  logoImage: {
    width: 60,
    height: 60,
  },
  descriptionText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Kanit_400Regular',
    marginBottom: 100,
  },
  button: {
    width: 230,
    height: 35,
    backgroundColor: '#4895EF',
    borderRadius: 15,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Raleway',
    fontWeight: 'bold',
  },
  btnCont: {
   marginTop: 100
  },
});

export default HomeScreen;

