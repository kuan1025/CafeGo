import React, { useEffect, useState } from 'react';
import { GlobalLayout } from '../components/Layout';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity
} from 'react-native';
import ProductCard from '../components/ProductCard';
import FloatingOrderButton from '../components/FloatingOrderButton';  // FloatingOrderButton

const ProductScreen = ({ route, navigation }) => {
  const { categoryId } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    console.log(process.env.EXPO_PUBLIC_CAFEGO_API+'/product')
    fetch(process.env.EXPO_PUBLIC_CAFEGO_API+'/product')
      .then(res => res.json())
      .then(data => {
        const filtered = data.products.filter(p => p.category === categoryId);
        setProducts(filtered);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <GlobalLayout>
      <View style={styles.container}>
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text>No products found</Text>}
        />

        {/* FloatingOrderButton */}
        {orderItems.length > 0 && (
          <FloatingOrderButton />
        )}
      </View>
      <FloatingOrderButton />
    </GlobalLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  list: { padding: 10 },
});

export default ProductScreen;
