import React, { useEffect, useState } from 'react';
import { GlobalLayout } from '../components/Layout';
import FloatingOrderButton from '../components/FloatingOrderButton';


import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(process.env.EXPO_PUBLIC_CAFEGO_API+'/category')
    fetch(process.env.EXPO_PUBLIC_CAFEGO_API+'/category')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryBox}
      onPress={() =>
        navigation.navigate('Products', {
          categoryId: item._id,
          categoryName: item.name,
        })
      }
    >
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <GlobalLayout>
      <View style={styles.container}>
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.list}
        />
        {/* order */}
        <FloatingOrderButton />
      </View>
    </GlobalLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  list: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBox: {
    width: '90%',
    backgroundColor: '#ECECEC',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default HomeScreen;
