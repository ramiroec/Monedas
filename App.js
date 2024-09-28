import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import ConversorScreen from './screens/ConversorScreen';
import DolarPYScreen from './screens/DolarPYScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet } from 'react-native';

const Drawer = createDrawerNavigator();

// Componente personalizado para el contenido del drawer
const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <View style={styles.drawerContent}>
      <Text style={styles.drawerTitle}>Menu</Text>
    </View>
    {/* Renderiza la lista de pantallas del drawer */}
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ route }) => ({
          drawerIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Conversor') {
              iconName = 'cash-outline'; // Icono de conversión
            } else if (route.name === 'DolarPY') {
              iconName = 'logo-usd'; // Icono de dólar
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          drawerActiveBackgroundColor: '#007AFF',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#333',
        })}
      >
        <Drawer.Screen
          name="Conversor"
          component={ConversorScreen}
          options={{
            title: 'Conversor de Monedas',
          }}
        />
        <Drawer.Screen
          name="DolarPY"
          component={DolarPYScreen}
          options={{
            title: 'Dólar PY',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  drawerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});

export default App;
