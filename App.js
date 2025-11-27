import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  OrgLogin, TipoUser, Login, Cadastro, Escolha, Tutorial1, Tutorial2, Tutorial3, Tutorial4,
  Diario, DiarioNovo, ConsultasFuturas, Midia, Desafios, DesafiosNovo, DesafiosDetalhes,
  Usuario, UsuarioAssinatura, UsuarioDados, UsuarioSubstancias, OrgCadastro1, OrgCadastro2, OrgCadastro3, OrgEspera,
  OrgPerfil, OrgPerfilDias, OrgPerfilSenhaEdit,
} from './screens/files';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserSignupProvider } from './context/UserSignupContext';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <UserSignupProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TipoUser">
          <Stack.Screen
            name="TipoUser"
            component={TipoUser}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Org"
            component={OrgStackNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cadastro"
            component={Cadastro}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Escolha"
            component={Escolha}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tutorial1"
            component={Tutorial1}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tutorial2"
            component={Tutorial2}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tutorial3"
            component={Tutorial3}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tutorial4"
            component={Tutorial4}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserSignupProvider>
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
        tabBarIconStyle: {
          marginTop: 5,
          width: 38,
          height: 38,
        },
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
      }}
    >
      <Tab.Screen
        name="DiarioNavigator"
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
        name="ConsultasStackNavigator"
        component={ConsultasStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name={'map-marker-outline'}
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
        name="DesafiosStackNavigator"
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
        name="UsuarioStackNavigator"
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
        options={{ headerShown: false }}
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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DesafiosNovo"
        component={DesafiosNovo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DesafiosDetalhes"
        component={DesafiosDetalhes}
        options={{ headerShown: false }}
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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UsuarioDados"
        component={UsuarioDados}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UsuarioAssinatura"
        component={UsuarioAssinatura}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UsuarioSubstancias"
        component={UsuarioSubstancias}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function OrgStackNavigator() {
  return (

    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="OrgLogin" component={OrgLogin} />
      <Stack.Screen name="OrgCadastro1" component={OrgCadastro1} />
      <Stack.Screen name="OrgCadastro2" component={OrgCadastro2} />
      <Stack.Screen name="OrgCadastro3" component={OrgCadastro3} />
      <Stack.Screen name="OrgEspera" component={OrgEspera} />
      <Stack.Screen name="OrgPerfil" component={OrgPerfil} />
      <Stack.Screen name="OrgPerfilDias" component={OrgPerfilDias} />
      <Stack.Screen name="OrgPerfilSenhaEdit" component={OrgPerfilSenhaEdit} />
    </Stack.Navigator>
  );
}