import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as Sharing from 'expo-sharing';
import OrderModal from './OrderModal'; 

const ProductCard = ({ product }) => {
  let api = process.env.EXPO_PUBLIC_CAFEGO_API;
  const [modalVisible, setModalVisible] = useState(false);

  const shareProduct = async () => {
    try {
      console.log(`${api}/${product.imageUrl}`)
      await Sharing.shareAsync(`${api}${product.imageUrl}`, {
        mimeType: 'image/jpeg',
        dialogTitle: `Check out this product: ${product.name}`
      });
    } catch (error) {
      console.error('Error sharing product:', error);
    }
  };

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: api + "/"+`${product.imageUrl}` }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.basePrice.toFixed(2)}</Text>
      <Text style={styles.description}>
        {product.description || 'No description'}
      </Text>

      <TouchableOpacity style={styles.shareButton} onPress={shareProduct}>
        <Text style={styles.shareButtonText}>Share to my friends</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.orderButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.orderButtonText}>Add to Order</Text>
      </TouchableOpacity>

      <OrderModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        product={product}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: { width: '100%', height: 150, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold', marginVertical: 5 },
  price: { fontSize: 16, color: '#6200EE', marginBottom: 5 },
  description: { fontSize: 14, color: '#666', marginBottom: 10 },
  shareButton: {
    backgroundColor: '#25D366',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  shareButtonText: { color: '#FFF', fontWeight: 'bold' },
  orderButton: {
    backgroundColor: '#006341',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  orderButtonText: { color: '#FFF', fontWeight: 'bold' },
});

export default ProductCard;
