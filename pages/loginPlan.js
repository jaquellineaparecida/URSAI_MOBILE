import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { useFonts, Kanit_500Medium } from '@expo-google-fonts/kanit';
import { Nunito_700Bold } from '@expo-google-fonts/nunito';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

function LoginPlan() {
  let [fontsLoaded] = useFonts({
    Kanit_500Medium,
    Nunito_700Bold
  });

  const route = useRoute();
  const selectedPlan = route.params?.selectedPlan;

  const [modalVisible, setModalVisible] = useState(false);
  const [cancelMessage, setCancelMessage] = useState('');

  const planDetails = {
    'Plano Básico': {
      name: 'Plano Básico',
      details: [
        '• Recomendações personalizadas com base no histórico de compras do cliente',
        '• Suporte por email',
        '• Até 1000 recomendações por mês'
      ],
      price: 'R$ 49.99/mês'
    },
    'Plano Padrão': {
      name: 'Plano Padrão',
      details: [
        '• Recomendações personalizadas com base no histórico de compras do cliente',
        '• Suporte por telefone e email',
        '• Até 5000 recomendações por mês'
      ],
      price: 'R$ 99.99/mês'
    },
    'Plano Premium': {
      name: 'Plano Premium',
      details: [
        '• Recomendações altamente personalizadas com base no histórico de compras, comportamento de navegação, favoritos e análise preditiva',
        '• Suporte por email, chat e telefone',
        '• Até 20000 recomendações por mês',
        '• Acesso a análises avançadas e relatórios personalizados',
        '• Customização avançada e consultoria estratégica'
      ],
      price: 'R$ 299.00/mês'
    }
  };

  const selectedPlanDetails = planDetails[selectedPlan]


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Bem-vindo de volta!</Text>
        </View>
        <Text style={styles.planTitle}>Seu plano atual</Text>
        <View style={styles.planContainer}>
          <Text style={styles.planName}>{selectedPlanDetails.name}</Text>
          <View>
            {selectedPlanDetails.details.map((detail, index) => (
              <Text key={index} style={styles.planDetails}>{detail}</Text>
            ))}
          </View>
          <Text style={styles.planPrice}>{selectedPlanDetails.price}</Text>
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
  // Estilos do modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Kanit_500Medium',
  }

});

export default LoginPlan;