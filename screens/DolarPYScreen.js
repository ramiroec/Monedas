import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const DolarPYScreen = () => {
  const [dolarData, setDolarData] = useState(null);

  useEffect(() => {
    axios.get('https://dolar.melizeche.com/api/1.0/')
      .then(response => {
        setDolarData(response.data.dolarpy);
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  if (!dolarData) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Icon name="usd" size={30} color="#007AFF" /> Cotización del Dólar
      </Text>

      {/* Banco BCP */}
      <View style={[styles.card, { backgroundColor: '#007AFF' }]}>
        <Text style={styles.subtitle}>Banco BCP</Text>
        <Text style={styles.text}>Compra: {dolarData.bcp.compra}</Text>
        <Text style={styles.text}>Venta: {dolarData.bcp.venta}</Text>
      </View>

      {/* Bonanza */}
      <View style={[styles.card, { backgroundColor: '#28A745' }]}>
        <Text style={styles.subtitle}>Bonanza</Text>
        <Text style={styles.text}>Compra: {dolarData.bonanza.compra}</Text>
        <Text style={styles.text}>Venta: {dolarData.bonanza.venta}</Text>
      </View>

      {/* Cambios Alberdi */}
      <View style={[styles.card, { backgroundColor: '#FFC107' }]}>
        <Text style={styles.subtitle}>Cambios Alberdi</Text>
        <Text style={styles.text}>Compra: {dolarData.cambiosalberdi.compra}</Text>
        <Text style={styles.text}>Venta: {dolarData.cambiosalberdi.venta}</Text>
      </View>

      {/* Cambios Chaco */}
      <View style={[styles.card, { backgroundColor: '#17A2B8' }]}>
        <Text style={styles.subtitle}>Cambios Chaco</Text>
        <Text style={styles.text}>Compra: {dolarData.cambioschaco.compra}</Text>
        <Text style={styles.text}>Venta: {dolarData.cambioschaco.venta}</Text>
      </View>

      {/* MyCambio (nueva casa de cambio) */}
      <View style={[styles.card, { backgroundColor: '#FF6347' }]}>
        <Text style={styles.subtitle}>MyCambio</Text>
        <Text style={styles.text}>Compra: {dolarData.mycambio?.compra || 'N/A'}</Text>
        <Text style={styles.text}>Venta: {dolarData.mycambio?.venta || 'N/A'}</Text>
      </View>

      {/* Eurocambios (nueva casa de cambio) */}
      <View style={[styles.card, { backgroundColor: '#6F42C1' }]}>
        <Text style={styles.subtitle}>Eurocambios</Text>
        <Text style={styles.text}>Compra: {dolarData.eurocambios?.compra || 'N/A'}</Text>
        <Text style={styles.text}>Venta: {dolarData.eurocambios?.venta || 'N/A'}</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#007AFF',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default DolarPYScreen;
