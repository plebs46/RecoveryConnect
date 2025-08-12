import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { OrgLogin, TipoUser, Login, Cadastro, Escolha, Tutorial1, Tutorial2, Tutorial3, Tutorial4, Diario, DiarioNovo, ConsultasFuturas, InfMedico, Agendamento, ConsultasPassadas, Midia, Desafios, DesafiosNovo, Usuario, UsuarioDados, Notificacao } from './screens/files';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TipoUser">
        <Stack.Screen
          name="TipoUser"
          component={TipoUser}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="OrgLogin"
          component={OrgLogin}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Escolha"
          component={Escolha}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Tutorial1"
          component={Tutorial1}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Tutorial2"
          component={Tutorial2}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Tutorial3"
          component={Tutorial3}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Tutorial4"
          component={Tutorial4}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{headerShown:false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#5ce1e6',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: 60,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
      }}
    >
      <Tab.Screen
        name="Diario"
        component={DiarioNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name={'book-open-outline'}
              size={38}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ConsultasFuturas"
        component={ConsultasStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name={'medical-bag'}
              size={38}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Midia"
        component={Midia}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name={'newspaper-variant-outline'}
              size={38}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Desafios"
        component={DesafiosStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name={'medal-outline'}
              size={38}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Usuario"
        component={UsuarioStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name={'account-outline'}
              size={38}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function DiarioNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Diario" component={Diario} />
      <Stack.Screen name="DiarioNovo" component={DiarioNovo} />
    </Stack.Navigator>
  );
}

function ConsultasStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ConsultasFuturas"
        component={ConsultasFuturas}
        options={{headerShown:false}}
      />
      <Stack.Screen
        name="InfMedico"
        component={InfMedico}
        options={{headerShown:false}}
      />
      <Stack.Screen
        name="Agendamento"
        component={Agendamento}
        options={{headerShown:false}}
      />
      <Stack.Screen
        name="ConsultasPassadas"
        component={ConsultasPassadas}
        options={{headerShown:false}}
      />
    </Stack.Navigator>
  );
}

function DesafiosStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Desafios"
        component={Desafios}
        options={{headerShown:false}}
      />
      <Stack.Screen
        name="DesafiosNovo"
        component={DesafiosNovo}
        options={{headerShown:false}}
      />
    </Stack.Navigator>
  );
}

function UsuarioStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Usuario"
        component={Usuario}
        options={{headerShown:false}}
      />
      <Stack.Screen
        name="UsuarioDados"
        component={UsuarioDados}
        options={{headerShown:false}}
      />
      <Stack.Screen
        name="Notificacao"
        component={Notificacao}
        options={{headerShown:false}}
      />
    </Stack.Navigator>
  );
}