import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';

const API_KEY = 'f8b9ca5879111e54f4a3368c';
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

const ConversorScreen = () => {
  const [amount, setAmount] = useState('');
  const [currencyFrom, setCurrencyFrom] = useState('USD');
  const [currencyTo, setCurrencyTo] = useState('EUR');
  const [conversionRate, setConversionRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'MXN', 'ARS', 'CAD', 'PYG'];

  const getConversionRate = async () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('Error', 'Por favor, ingresa un valor válido.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}${currencyFrom}`);
      const data = await response.json();
      const rate = data.conversion_rates[currencyTo];
      setConversionRate(rate);
      setConvertedAmount((amount * rate).toFixed(2));
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener las tasas de conversión.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Icon name="cash-outline" size={30} color="#007AFF" /> Conversor de Monedas
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresa el monto"
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />

      <Text style={styles.label}>Desde:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={currencyFrom}
          onValueChange={(itemValue) => setCurrencyFrom(itemValue)}
          style={styles.picker}
        >
          {currencies.map((currency) => (
            <Picker.Item key={currency} label={currency} value={currency} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Hasta:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={currencyTo}
          onValueChange={(itemValue) => setCurrencyTo(itemValue)}
          style={styles.picker}
        >
          {currencies.map((currency) => (
            <Picker.Item key={currency} label={currency} value={currency} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.convertButton} onPress={getConversionRate}>
        <Text style={styles.convertButtonText}>Convertir</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />}

      {convertedAmount && (
        <Text style={styles.result}>
          {amount} {currencyFrom} = {convertedAmount} {currencyTo}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  input: {
    borderWidth: 1,
    borderColor: '#007AFF',
    padding: 15,
    fontSize: 18,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 2,
  },
  picker: {
    height: 50,
    fontSize: 18,
  },
  convertButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  convertButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#007AFF',
  },
  loader: {
    marginTop: 20,
  },
});

export default ConversorScreen;
