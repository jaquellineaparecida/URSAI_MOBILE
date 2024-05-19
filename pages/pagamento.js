import React from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput } from 'react-native';
import { useFonts, Kanit_400Regular, Kanit_500Medium, Kanit_700Bold } from '@expo-google-fonts/kanit';

function Pagamento() {
  let [fontsLoaded] = useFonts({
    Kanit_400Regular, Kanit_500Medium, Kanit_700Bold
  });

  return (
    <ScrollView>
      <View style={styles.pageContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Plano escolhido:</Text>
          <Text style={styles.planText}>Plano Premium</Text>
        </View>
        <Text style={styles.description}>
          Preencha o seguinte formulário para realizar o pagamento e finalizar a compra
        </Text>
        <View style={styles.inputField}>
          <Text style={styles.label}>Nome no cartão</Text>
          <TextInput style={styles.inputBox} />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.label}>Número do cartão</Text>
          <TextInput style={styles.inputBox} />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.label}>CNPJ</Text>
          <TextInput style={styles.inputBox} />
        </View>
        <View style={styles.row}>
          <View style={styles.inputHalf}>
            <Text style={styles.label}>Data de validade</Text>
            <TextInput style={styles.inputBox} />
          </View>
          <View style={styles.inputHalf}>
            <Text style={styles.label}>CVV</Text>
            <TextInput style={styles.inputBox} />
          </View>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.planPrice}>R$299.00</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Finalizar</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 500
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4895EF',
    padding: 15,
    width: '100%',
  },
  headerText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Kanit_500Medium',
  },
  planText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Kanit_500Medium',
    marginLeft: 10,
  },
  description: {
    color: '#000000',
    fontSize: 15,
    fontFamily: 'Kanit_500Medium',
    margin: 20,
    textAlign: 'start',
  },
  inputField: {
    width: '90%',
    marginVertical: 10,
  },
  label: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Kanit_400Regular',
    marginBottom: 5,
  },
  inputBox: {
    height: 48,
    borderWidth: 1,
    borderColor: '#3F37CA',
    borderRadius: 5,
    padding: 8,
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  inputHalf: {
    width: '48%',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#3F37CA',
    padding: 10,
  },
  totalLabel: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Kanit_400Regular',
  },
  planPrice: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Kanit_400Regular',
  },
  buttonContainer: {
    width: '90%',
    backgroundColor: '#4895EF',
    borderRadius: 23,
    alignItems: 'center',
    padding: 10,
    marginVertical: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Kanit_400Regular',
  },
});

export default Pagamento;
