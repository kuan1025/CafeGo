import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderItems, setOrderItems] = useState([]);

  const addToOrder = (item) => {
    console.log(item)
    setOrderItems((prevItems) => [...prevItems, item]);
  };

  const removeFromOrder = (index) => {
    setOrderItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const clearOrder = () => {
    setOrderItems([]);
  };

  return (
    <OrderContext.Provider
      value={{ orderItems, addToOrder, removeFromOrder, clearOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
