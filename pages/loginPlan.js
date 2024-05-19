import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFonts, Kanit_500Medium } from '@expo-google-fonts/kanit';
import { Nunito_700Bold } from '@expo-google-fonts/nunito';

function LoginPlan() {
  
  let [fontsLoaded] = useFonts({
    Kanit_500Medium,
    Nunito_700Bold
 });

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Bem-vindo de volta, Fulano!</Text>
        </View>
        <Text style={styles.planTitle}>Seu plano atual</Text>
        <View style={styles.planContainer}>
          <Text style={styles.planName}>Plano Básico</Text>
          <View>
            <Text style={styles.planDetails}>• Recomendações personalizadas com base no histórico de compras do cliente</Text>
            <Text style={styles.planDetails}>• Suporte por email</Text>
            <Text style={styles.planDetails}>• Até 1000 recomendações por mês</Text>
          </View>
          <Text style={styles.planPrice}>R$ 49.99/mês</Text>
        </View>
        <View style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginBottom: 16,
  },
  header: {
    width: '100%',
    height: 100,
    backgroundColor: '#3F37CA',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Kanit_500Medium',
  },
  planTitle: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Kanit_500Medium',
    marginTop: 35,
    marginLeft: 10,
  },
  cancelButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#4895EF',
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  cancelText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
  },
  planContainer: {
    width: '100%',
    backgroundColor: '#E1DFF7',
    borderWidth: 2,
    borderColor: '#3F37CA',
    borderRadius: 15,
    marginTop: 24,
    padding: 16,
  },
  planName: {
    color: '#4895EF',
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
  },
  planDetails: {
    color: '#000000',
    fontSize: 15,
    fontFamily: 'Nunito_700Bold',
    marginTop: 8,
  },
  planPrice: {
    color: '#4895EF',
    fontSize: 15,
    fontFamily: 'Nunito_700Bold',
    marginTop: 16,
    textAlign: 'right',
  },
});

export default LoginPlan;
