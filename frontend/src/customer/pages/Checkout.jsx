import { useState } from 'react';
import { Box, Grid, Text, TextInput, Button, Stack, Group, Select, Alert, Card,  } from '@mantine/core';
import OrderSummary from "../components/OrderSummary"; 


export default function CheckoutPage() {

  


    const [formValues, setFormValues] = useState({
      name: '',
      phone: '',
      email: '',
    });

    
  
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit-card');
    
    const handleProceedToCheckout = () => {
      
        alert("Proceeding to Checkout...");
      };

    const [orderSummary, setOrderSummary] = useState([
      { name: 'Cappuccino', price: 5.0, quantity: 2 },
      { name: 'Latte', price: 4.5, quantity: 1 },
    ]);
  
    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  
    // Handle form changes
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormValues((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = () => {
  
      if (!formValues.name || !formValues.phone || !formValues.address) {
        alert('Please fill in all the details.');
        return;
      }
  
      // Simulate order submission
      setIsOrderConfirmed(true);
    };
  
    const handlePaymentChange = (value) => {
      setSelectedPaymentMethod(value);
    };
  
    // Calculate total order price
    const calculateTotalPrice = () => {
      return orderSummary.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    };
  
    return (
      <Box p="xl">
        <Grid>
          <Grid.Col span={12} md={8}>
            <Card shadow="sm" padding="lg" radius="md">
              <Text size="xl" weight={500} mb="md">
                Delivery Details
              </Text>
  
              <TextInput
                label="Name"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                placeholder="Your name"
                required
              />
              <TextInput
                label="Phone"
                name="phone"
                value={formValues.phone}
                onChange={handleInputChange}
                placeholder="Your phone number"
                required
              />
              <TextInput
                label="Address"
                name="address"
                value={formValues.address}
                onChange={handleInputChange}
                placeholder="Delivery address"
                required
              />
  
              <Group position="apart" mt="md">
                <Select
                  label="Payment Method"
                  value={selectedPaymentMethod}
                  onChange={handlePaymentChange}
                  data={[
                    { value: 'credit-card', label: 'Credit Card' },
                    { value: 'cash', label: 'Cash on Delivery' },
                  ]}
                />
              </Group>
            </Card>
          </Grid.Col>
  
          <Grid.Col span={12} md={4}>
            {/* <OrderSummary cart={cart} onProceed={handleProceedToCheckout} /> */}
          </Grid.Col>
        </Grid>
      </Box>
    );
  }