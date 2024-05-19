import { View, StyleSheet, Image, Text, TextInput, Button } from "react-native";
import { useFonts, JosefinSans_700Bold } from '@expo-google-fonts/josefin-sans';
import { Kanit_400Regular, Kanit_500Medium, Kanit_700Bold } from '@expo-google-fonts/kanit';
import { useNavigation } from '@react-navigation/native';


function Login() {
  const navigation = useNavigation();
  
  let [fontsLoaded] = useFonts({
    JosefinSans_700Bold,
    Kanit_400Regular,
    Kanit_500Medium, 
    Kanit_700Bold
 });
 
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoWrapper}>
          <Text style={styles.logoText}>URSAI</Text>
          <Image
            source={require('../assets/brain.png')}
            style={styles.logoImage}
          />
        </View>
        <Text style={styles.welcomeText}>
          Que bom tê-lo de volta! Bem-vindo ao seu espaço
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>CNPJ ou Email</Text>
          <View style={styles.inputField}>
            <TextInput style={styles.input}/>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Senha</Text>
          <View style={styles.inputField}>
            <TextInput style={styles.input}/>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} title="Login"  onPress={() => navigation.navigate('loginPlano')}/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3F37CA",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    borderRadius: 7,
    alignItems: "center",
    paddingVertical: 80,
    paddingHorizontal: 41,
  },
  logoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    color: "#FFF",
    fontSize: 36,
    fontFamily: "JosefinSans_700Bold",
    marginRight: 6,
    marginTop: 10
  },
  logoImage: {
    width: 60,
    height: 60,
    marginLeft: 10,
  },
  welcomeText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Kanit_500Medium",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
  },
  inputLabel: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Kanit_400Regular",
    marginBottom: 5,
  },
  inputField: {
    backgroundColor: "#FFF",
    borderRadius: 5,
  },
  input: {
    height: 40,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    width: 270,
    height: 35,
    borderRadius: 15,
    marginTop: 20,
    color: "#fff"
  },
  button: {
    fontFamily: "Kanit_500Medium",
    fontWeight: 'bold',
    backgroundColor: "#fff"
  }
});

export default Login;
