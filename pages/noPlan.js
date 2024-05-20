import {  View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { useFonts, Kanit_500Medium } from '@expo-google-fonts/kanit';
import { Nunito_700Bold } from  '@expo-google-fonts/nunito';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

function Knowing() {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    Kanit_500Medium,
    Nunito_700Bold
 });

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPreco, setSelectPreco] = useState(null);

  const handleSelectPlan = (plano, preco) => {
    setSelectedPlan(plano);
    setSelectPreco(preco);
    navigation.navigate('Pagamento', { selectedPlan: plano, planPrice: preco });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Bem-vindo de volta, Fulano! </Text>
        </View>
        <View style={styles.container2}>
          <Text style={styles.contText}>
            {" "}
            Escolha um dos planos abaixo e venda uma nova experiência para os seus clientes!{" "}
          </Text>
        </View>
        <TouchableOpacity onPress={() => handleSelectPlan("Plano Básico", "R$ 49.99/mês")}>
          <View
            style={[styles.planContainer, selectedPlan === "Plano Básico" && styles.selectedPlan]}
          >
            <View>
              <Text style={styles.planTitleText}>Plano Básico</Text>
            </View>
            <View>
              <Text style={styles.planDescription}>
                • Recomendações personalizadas com base no histórico de compras do cliente
              </Text>
              <Text style={styles.planDescription}>• Suporte por email</Text>
              <Text style={styles.planDescription}>• Até 1000 recomendações por mês</Text>
            </View>
            <View>
              <Text style={styles.planPrice}>R$ 49.99/mês</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectPlan("Plano Padrão", "R$ 150.00/mês")}>
          <View
            style={[styles.planContainer, selectedPlan === "Plano Padrão" && styles.selectedPlan]}
          >
            <View>
              <Text style={styles.planTitleText}>Plano Padrão</Text>
            </View>
            <View>
              <Text style={styles.planDescription}>
                • Recomendações personalizadas com base no histórico de compras do cliente e
                favoritos.
              </Text>
              <Text style={styles.planDescription}>• Acesso limitado a análises básicas</Text>
              <Text style={styles.planDescription}>• Suporte por email e chat.</Text>
              <Text style={styles.planDescription}>• Até 5000 recomendações por mês</Text>
            </View>
            <View>
              <Text style={styles.planPrice}>R$ 150.00/mês</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectPlan("Plano Premium", "R$ 299.00/mês")}>
          <View
            style={[
              styles.planContainer,
              selectedPlan === "Plano Premium" && styles.selectedPlan,
            ]}
          >
            <View>
              <Text style={styles.planTitleText}>Plano Premium</Text>
            </View>
            <View>
              <Text style={styles.planDescription}>
                • Recomendações altamente personalizadas com base no histórico de compras,
                comportamento de navegação, favoritos e análise preditiva.
              </Text>
              <Text style={styles.planDescription}>• Suporte por email, chat e telefone</Text>
              <Text style={styles.planDescription}>• Até 20000 recomendações por mês</Text>
              <Text style={styles.planDescription}>
                • Acesso a análises avançadas e relatórios personalizados
              </Text>
              <Text style={styles.planDescription}>• Customização avançada e consultoria estratégica</Text>
            </View>
            <View>
              <Text style={styles.planPrice}>R$ 299.00/mês</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.subscribeButton}>
          <Text
            style={styles.subscribeButtonText}
            onPress={() => navigation.navigate("Pagamento", { selectedPlan, selectedPreco })}
          >
            Comprar!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    display: "flex",
    maxWidth: 480,
    width: "100%",
    paddingBottom: 48,
    flexDirection: "column",
    alignItems: "center",
    fontSize: 15,
    color: "#4895EF",
    fontWeight: "700",
    margin: "0 auto",
    height: 500
  },
  header: {
    borderRadius: "2px 2px 7px 7px",
    backgroundColor: "#3F37CA",
    alignSelf: "stretch",
    width: "100%",
    alignItems: "start",
    padding: "44px 15px 13px",
  },
  headerText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: 'Kanit_500Medium'
  },
  planContainer: {
    borderRadius: 15,
    borderColor: "#3F37CA",
    borderStyle: "solid",
    borderWidth: 2,
    backgroundColor: "#E1E0F8",
    display: "flex",
    marginTop: 25,
    width: "100%",
    maxWidth: 362,
    flexDirection: "column",
    alignItems: "stretch",
    padding: "21px 25px 12px 13px",
  },
  planTitleText: {
    color: '#4895EF',
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
  },
  planDescription: {
    color: "#000",
    fontFamily: "Nunito_700Bold",
    fontSize: 16,
  },
  planPrice: {
    fontFamily: "Nunito_700Bold",
    alignSelf: "end",
    marginTop: 16,
    color: '#4895EF',
  },
  subscribeButton: {
    borderRadius: 10,
    backgroundColor: "#4895EF",
    marginTop: 20,
    marginBottom: 20,
    width: 300,
    height: 45,
    maxWidth: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  subscribeButtonText: {
    color: "#FFF",
    font: "600 16px Raleway, sans-serif ",
  },
   container2: {
    borderRadius: 4, 
    backgroundColor: "#4895EF",
    alignSelf: "stretch",
    marginTop: 18,
    width: "100%",
    alignItems: "center", 
    justifyContent: "center",
    paddingVertical: 17,
    paddingHorizontal: 6,
    
  },
  contText: {
    fontFamily: "Kanit_500Medium", 
    fontSize: 16, 
    color: '#fff'
  }
});

export default Knowing;
