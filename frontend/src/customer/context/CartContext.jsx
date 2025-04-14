import { createContext, useContext, useState } from "react";


const CartContext = createContext();

export function CartProvider({ children }) {
  
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((cartItem) => {
        return (
          cartItem.productId === item.productId &&
          JSON.stringify(cartItem.size) === JSON.stringify(item.size) &&
          JSON.stringify(cartItem.milk) === JSON.stringify(item.milk) &&
          JSON.stringify(cartItem.extras) === JSON.stringify(item.extras)
        );
      });
  
      if (existingItemIndex >= 0) {
        // console.log(" Adding item:", item);
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += item.quantity;
        return updatedCart;
      } else {
        return [...prevCart, item];
      }
    });
  };
  

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
  };

  return (
    // Provider !! Allow 'children' can access to 'value' 
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}


export const useCart = () => useContext(CartContext);
