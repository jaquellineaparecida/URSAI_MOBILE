import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useFonts, Kanit_400Regular, Kanit_500Medium } from '@expo-google-fonts/kanit';
import { Nunito_700Bold } from  '@expo-google-fonts/nunito';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import axios from 'axios';


function Cadastro() {
  const navigation = useNavigation();
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [tipoEmpresa, setTipoEmpresa] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');

  let [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_500Medium,
    Nunito_700Bold
  });

  const handleCadastro = async () => {
    try {
      const response = await axios.post('http://localhost:3030/cadastroUsuario', 
      {
        nomeEmpresa,
        tipoEmpresa,
        cnpj,
        email,
        telefone,
        senha
      });
      console.log(response.data);
      navigation.navigate('PlanCh');
    } catch (error) {
      console.error('Erro ao cadastrar usuário', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Faça o seu cadastro e comece a melhorar a jornada do seu cliente!
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome da empresa</Text>
          <TextInput style={styles.input} 
            value={nomeEmpresa}
            onChangeText={setNomeEmpresa}/>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tipo da empresa(segmento)</Text>
          <TextInput style={styles.input} 
          value={tipoEmpresa}
          onChangeText={setTipoEmpresa} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>CNPJ</Text>
          <TextInput style={styles.input} 
            value={cnpj}
            onChangeText={setCnpj} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} 
          value={email}
          onChangeText={setEmail} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Telefone</Text>
          <TextInput style={styles.input} 
          value={telefone}
          onChangeText={setTelefone} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha</Text>
          <TextInput style={styles.input} secureTextEntry={true} 
          value={senha}
          onChangeText={setSenha} />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    maxWidth: 480,
    width: "100%",
    alignItems: "center",
    height: 500
  },
  header: {
    borderRadius: "2px 2px 7px 7px",
    backgroundColor: "#3F37CA",
    alignSelf: "stretch",
    width: "100%",
    alignItems: "start",
    padding: "44px 15px 13px",
    marginBottom: 25
  },
  headerText: {
    fontFamily: "Kanit_500Medium",
    color: "#FFF",
    fontSize: 16
  },
  inputContainer: {
    marginBottom: 20,
    width: "80%",
  },
  label: {
    marginBottom: 5,
    fontFamily: "Kanit_400Regular",
  },
  input: {
    borderWidth: 1,
    borderColor: "#3F37CA",
    borderRadius: 5,
    padding: 10,
    fontFamily: "Kanit_400Regular",
  },
  button: {
    borderRadius: 10,
    backgroundColor: "#4895EF",
    width: "80%",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
  },
});

export default Cadastro;


