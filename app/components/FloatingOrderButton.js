import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useOrder } from '../context/OrderContext';

const FloatingOrderButton = () => {
  const navigation = useNavigation();
  const { orderItems } = useOrder();

  if (orderItems.length === 0) return null; // no item -> hide

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Checkout')}
    >
      <Text style={styles.text}> Order ({orderItems.length})</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#006341',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
    zIndex: 100,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FloatingOrderButton;
