import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/home';
import Info from './pages/info';
import Login from './pages/login';
import Conheca from './pages/know';
import Cadastro from './pages/cadastro';
import PlanCh from './pages/noPlan';
import Pagamento from './pages/pagamento';
import LoginPlano from './pages/loginPlan';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Info" component={Info} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Conheca" component={Conheca} options={{ headerShown: false }}/>
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }}/>
        <Stack.Screen name="PlanCh" component={PlanCh} options={{ headerShown: false }}/>
        <Stack.Screen name="Pagamento" component={Pagamento} options={{ headerShown: false }}/>
        <Stack.Screen name="LoginPlano" component={LoginPlano} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


