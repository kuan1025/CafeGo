import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View, Text } from 'react-native';
import * as Notifications from 'expo-notifications';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import FindCafeScreen from './screens/MapScreen';
import { OrderProvider } from './context/OrderContext';
import CheckoutScreen from './screens/CheckoutScreen'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // !!!! show  iso foreground default
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ title: 'CafeGo', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="Products"
        component={ProductScreen}
        options={({ route }) => ({
          title: route.params?.categoryName || 'Products',
        })}
      />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
    </Stack.Navigator>
  );
}

export default function App() {

  useEffect(() => {

    const register = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Notification permission not granted');
      }
    };
    register();
  }, []);






  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <OrderProvider>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarStyle: styles.tabBarStyle,
              tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === 'Menu') iconName = 'fast-food-outline';
                else if (route.name === 'Find Cafe') iconName = 'cafe-outline';

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#006341',
              tabBarInactiveTintColor: '#b1b1b1',
              tabBarLabelStyle: styles.tabBarLabelStyle,
              tabBarItemStyle: styles.tabBarItemStyle,
              tabBarLabel: ({ focused }) => {
                return (
                  <Text style={[styles.tabLabel, focused ? styles.activeTabLabel : null]}>
                    {route.name}
                  </Text>
                );
              },
            })}
          >
            <Tab.Screen name="Menu" component={HomeStack} />
            <Tab.Screen name="Find Cafe" component={FindCafeScreen} />
          </Tab.Navigator>
        </OrderProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#ffffff', // White background for the tab bar
    borderTopWidth: 1,
    borderTopColor: '#ddd', // Light border
    paddingBottom: 10,
    elevation: 5,
  },
  tabBarLabelStyle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },
  tabBarItemStyle: {
    paddingBottom: 5,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  activeTabLabel: {
    color: '#006341',
  },
});
