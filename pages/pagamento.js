import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useFonts, Kanit_400Regular, Kanit_500Medium, Kanit_700Bold } from '@expo-google-fonts/kanit';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

function Pagamento() {
  let [fontsLoaded] = useFonts({
    Kanit_400Regular, Kanit_500Medium, Kanit_700Bold
  });

  const navigation = useNavigation();
  const route = useRoute();
  const { selectedPlan, selectedPreco, selectedPlanId } = route.params;

  const [nomeCartao, setNomeCartao] = useState('');
  const [nrmCartao, setNrmCartao] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [cvv, setCvv] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handlePayment = async () => {
    try {
      const response = await axios.put('http://localhost:3030/pagamento', {
        email: userEmail,
        idPlano: selectedPlanId,
        nomeCartao,
        nrmCartao,
        dataValidade,
        cvv,
        total: selectedPreco
      });
      if (response.status === 201) {
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Erro ao realizar pagamento', error);
      alert('Erro ao realizar pagamento. Tente novamente.');
    }
  };

  return (
    <ScrollView>
      <View style={styles.pageContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Plano escolhido:</Text>
          <Text style={styles.planText}>{selectedPlan}</Text>
        </View>
        <Text style={styles.description}>
          Preencha o seguinte formulário para realizar o pagamento e finalizar a compra
        </Text>
        <View style={styles.inputField}>
          <Text style={styles.label}>Nome no cartão</Text>
          <TextInput
            style={styles.inputBox}
            value={nomeCartao}
            onChangeText={setNomeCartao}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.label}>Número do cartão</Text>
          <TextInput
            style={styles.inputBox}
            value={nrmCartao}
            onChangeText={setNrmCartao}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.inputBox}
            value={userEmail}
            onChangeText={setUserEmail}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.inputHalf}>
            <Text style={styles.label}>Data de validade</Text>
            <TextInput
              style={styles.inputBox}
              value={dataValidade}
              onChangeText={setDataValidade}
            />
          </View>
          <View style={styles.inputHalf}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.inputBox}
              value={cvv}
              onChangeText={setCvv}
            />
          </View>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.planPrice}>{selectedPreco}</Text>
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={handlePayment}>
          <Text style={styles.buttonText}>Finalizar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Pagamento realizado com sucesso!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('LoginPlano', { selectedPlan });
              }}
            >
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    fontFamily: 'Kanit_400Regular',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default Pagamento;
