import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useOrder } from '../context/OrderContext';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import * as Notifications from 'expo-notifications';

const CheckoutScreen = ({ navigation }) => {
  const { orderItems, clearOrder, removeFromOrder } = useOrder();
  const [pickupTime, setPickupTime] = useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 6);
    return now;
  });
  const [showPicker, setShowPicker] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');

  useEffect(() => {


    // req permission 
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please enable notifications in settings');
      }
    })();

    // 3. msg Listener
    const subReceived = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification Received:', notification.request.content);
    });

    // 4. click -> resp
    const subResponse = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification Response:', response.notification.request.content.data);

      const data = response.notification.request.content.data;
      if (data?.orderId) {
        console.log('handle click!!! ')
        navigation.navigate('HomeMain', { orderId: data.orderId });
      }
    });

    return () => {
      subReceived.remove();
      subResponse.remove();
    };
  }, []);

  const onTimeChange = (event, selectedTime) => {
    setShowPicker(false);
    if (selectedTime) setPickupTime(selectedTime);
  };

  // schdule 
  const schedulePickupReminder = async (orderId, time) => {
    const fiveMinBefore = new Date(time.getTime() - 5 * 60 * 1000);
    if (fiveMinBefore > new Date()) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Pickup Reminder',
          body: `Your order ${orderId} will be ready at ${format(time, 'h:mm a')}.`,
          data: { orderId },
        },
        trigger: fiveMinBefore,
      });
    }
  };

  const handleSubmit = async () => {
    if (!mobileNumber) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Missing Info',
          body: 'Please enter pickup time and phone number.',
        },
        trigger: null,
      });
      return;
    }

    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    // create order payload
    const orderData = {
      orderId,
      mobileNumber,
      pickupTime: pickupTime.toISOString(),
      items: orderItems.map(item => ({
        productId: item.productId,
        sizeId: item.sizeId,
        milkId: item.milkId || null,
        extras: item.extras || [],
        totalPrice: item.totalPrice,
      })),
    };

    try {
      const api = process.env.EXPO_PUBLIC_CAFEGO_API;
      const response = await fetch(`${api}/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.status === 201) {
        // confirm
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Order Confirmed',
            body: `Your order ${orderId} will be ready at ${format(pickupTime, 'h:mm a')}.`,
            data: { orderId },
          },
          trigger: null,
        });

        // pick up by 5 mins
        await schedulePickupReminder(orderId, pickupTime);

        clearOrder();
        navigation.navigate('HomeMain');
      } else {
        const err = await response.text();
        console.error('Order failed:', err);
        Alert.alert('Order Failed', 'Server error. Please try again.');
      }
    } catch (err) {
      console.error('Network error:', err);
      Alert.alert('Error', 'Unable to submit order. Please check your connection.');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={<Text style={styles.heading}>Your Order</Text>}
        data={orderItems}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemBox}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.subText}>Size: {item.sizeLabel}</Text>
              {item.milkName && <Text style={styles.subText}>Milk: {item.milkName}</Text>}
              <Text style={styles.subText}>Price: ${item.totalPrice}</Text>
            </View>
            <TouchableOpacity onPress={() => removeFromOrder(index)}>
              <Ionicons name="trash-outline" size={24} color="#d00" />
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          <>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>
              Pick up time
            </Text>
            <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
              <Text>{format(pickupTime, 'h:mm a')}</Text>
            </TouchableOpacity>
            {showPicker && (
              <DateTimePicker
                value={pickupTime}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={onTimeChange}

              />
            )}
            <TextInput
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              style={styles.input}
            />
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>Place Order</Text>
            </TouchableOpacity>
          </>
        }
        contentContainerStyle={styles.container}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40 },
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  itemBox: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  itemText: { fontWeight: 'bold' },
  subText: { fontSize: 12, color: '#444' },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
  },
  submitBtn: {
    marginTop: 20,
    backgroundColor: '#006341',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontWeight: 'bold' },
});

export default CheckoutScreen;
