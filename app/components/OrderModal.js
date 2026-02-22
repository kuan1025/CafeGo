import React, { useState, useEffect } from 'react';
import {
  View, Text, Modal, TouchableOpacity, StyleSheet, Picker, ScrollView
} from 'react-native';
import { useOrder } from '../context/OrderContext';

const OrderModal = ({ visible, onClose, product }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedMilk, setSelectedMilk] = useState(null);

  //   order
  const { addToOrder } = useOrder();


  useEffect(() => {
    // Reset selections when product changes
    if (product) {
      setSelectedSize(product.sizes[0]?._id || null);
      setSelectedMilk(product.milkOptions[0]?._id || null);
    }
  }, [product]);

  const calculateTotal = () => {
    const sizePrice = product?.sizes.find(s => s._id === selectedSize)?.price || 0;
    const milkPrice = product?.milkOptions.find(m => m._id === selectedMilk)?.price || 0;
    return (product?.basePrice + sizePrice + milkPrice).toFixed(2);
  };

  if (!product) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.section}>Size:</Text>
            {product.sizes.map(size => (

              <TouchableOpacity
                key={size._id}
                style={[
                  styles.option,
                  selectedSize === size._id && styles.optionSelected,
                ]}
                onPress={() => setSelectedSize(size._id)}
              >
                <Text>{size.label} (+${size.price})</Text>
              </TouchableOpacity>
            ))}

            {product.allowMilkOptions && product.milkOptions.length > 0 && (
              <>
                <Text style={styles.section}>Milk:</Text>
                {product.milkOptions.map(milk => (
                  <TouchableOpacity
                    key={milk._id}
                    style={[
                      styles.option,
                      selectedMilk === milk._id && styles.optionSelected,
                    ]}
                    onPress={() => setSelectedMilk(milk._id)}
                  >
                    <Text>{milk.name} (+${milk.price})</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}

            <Text style={styles.total}>Total: ${calculateTotal()}</Text>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                const selectedSizeObj = product.sizes.find(s => s._id === selectedSize);
                const selectedMilkObj = product.milkOptions.find(m => m._id === selectedMilk);
                addToOrder({
                  productId: product._id,
                  name: product.name,
                  sizeId: selectedSizeObj?._id,
                  sizeLabel: selectedSizeObj?.label,   
                  milkId: selectedMilkObj?._id,
                  milkName: selectedMilkObj?.name,     
                  totalPrice: calculateTotal(),
                });
                onClose();
              }}
            >
              <Text style={styles.addButtonText}>Add to Order</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={{ color: '#888' }}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '85%',
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  section: { fontSize: 16, fontWeight: '600', marginTop: 15, marginBottom: 5 },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 8,
  },
  optionSelected: {
    borderColor: '#006341',
    backgroundColor: '#e8f5f1',
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'right',
  },
  addButton: {
    backgroundColor: '#006341',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default OrderModal;
