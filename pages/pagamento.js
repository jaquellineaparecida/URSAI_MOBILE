import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, TextInput, Modal, TouchableOpacity } from 'react-native';
import { useFonts, Kanit_400Regular, Kanit_500Medium, Kanit_700Bold } from '@expo-google-fonts/kanit';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

function Pagamento() {
  let [fontsLoaded] = useFonts({
    Kanit_400Regular, Kanit_500Medium, Kanit_700Bold
  });

  const route = useRoute();
  const { selectedPlan, planPrice } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [nomeCartao, setNomeCartao] = useState('');
  const [nrmCartao, setNrmCartao] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [cvv, setCvv] = useState('');

  const handleFinalizar = async () => {
    try {
      const response = await axios.post('http://localhost:3030/finalizarPagamento', {
        idEmpresa: 1, // Substitua pelo ID da empresa do usuário
        idPlano: 1, // Substitua pelo ID do plano escolhido
        nomeCartao,
        nrmCartao,
        dataValidade,
        cvv,
        total: planPrice,
      });

      if (response.status === 201) {
        // Se o pagamento for bem-sucedido, exiba o modal
        setModalVisible(true);
      } else {
        // Se houver algum erro no pagamento, exiba uma mensagem de erro
        alert('Erro ao finalizar pagamento. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao finalizar pagamento:', error);
      alert('Erro ao finalizar pagamento. Por favor, tente novamente.');
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
          <Text style={styles.label}>CNPJ</Text>
          <TextInput
            style={styles.inputBox}
            value={cnpj}
            onChangeText={setCnpj}
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
          <Text style={styles.planPrice}>{planPrice}</Text>
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleFinalizar}>
          <Text style={styles.buttonText}>Finalizar</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Compra finalizada com sucesso!</Text>
              <TouchableOpacity
                style={{ ...styles.button, backgroundColor: '#2196F3' }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.buttonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
});

export default Pagamento;
