import { Global,Text, Box, Grid, Stack } from "@mantine/core";
import { useState } from "react";
import CategoryMenu from "../components/CategoryMenu";
import ProductCard from "../components/ProductCard";
import OrderSummary from "../components/OrderSummary";
import Header from "../components/Header";
import AuthModal from "../components/AuthModal";
import { useAuth } from "../context/AuthContext";

const basename = import.meta.env.VITE_BASENAME
const products = {
  Coffee: [
    { productId: 1, name: "Cappuccino", basePrice: 5.0, imageUrl: `${basename}images/product/coffee/cappuccino.jpg`, sizes: [{ label: "Small", price: 0 }, { label: "Medium", price: 1 }, { label: "Large", price: 2 }], milkOptions: [{ name: "Regular", price: 0 }, { name: "Almond", price: 1 }, { name: "Oat", price: 1.5 }], extras: [{ name: "Extra Shot", price: 1 }, { name: "Syrup", price: 0.5 }] },
    { productId: 2, name: "Cappuccino", basePrice: 5.0, imageUrl: `${basename}images/product/coffee/cappuccino.jpg`, sizes: [{ label: "Small", price: 0 }, { label: "Medium", price: 1 }, { label: "Large", price: 2 }], milkOptions: [{ name: "Regular", price: 0 }, { name: "Almond", price: 1 }, { name: "Oat", price: 1.5 }], extras: [{ name: "Extra Shot", price: 1 }, { name: "Syrup", price: 0.5 }] },
    { productId: 3, name: "Cappuccino", basePrice: 5.0, imageUrl: `${basename}images/product/coffee/cappuccino.jpg`, sizes: [{ label: "Small", price: 0 }, { label: "Medium", price: 1 }, { label: "Large", price: 2 }], milkOptions: [{ name: "Regular", price: 0 }, { name: "Almond", price: 1 }, { name: "Oat", price: 1.5 }], extras: [{ name: "Extra Shot", price: 1 }, { name: "Syrup", price: 0.5 }] },
    { productId: 4, name: "Cappuccino", basePrice: 5.0, imageUrl: `${basename}images/product/coffee/cappuccino.jpg`, sizes: [{ label: "Small", price: 0 }, { label: "Medium", price: 1 }, { label: "Large", price: 2 }], milkOptions: [{ name: "Regular", price: 0 }, { name: "Almond", price: 1 }, { name: "Oat", price: 1.5 }], extras: [{ name: "Extra Shot", price: 1 }, { name: "Syrup", price: 0.5 }] },
    { productId: 5, name: "Cappuccino", basePrice: 5.0, imageUrl: `${basename}images/product/coffee/cappuccino.jpg`, sizes: [{ label: "Small", price: 0 }, { label: "Medium", price: 1 }, { label: "Large", price: 2 }], milkOptions: [{ name: "Regular", price: 0 }, { name: "Almond", price: 1 }, { name: "Oat", price: 1.5 }], extras: [{ name: "Extra Shot", price: 1 }, { name: "Syrup", price: 0.5 }] },
    { productId: 6, name: "Cappuccino", basePrice: 5.0, imageUrl: `${basename}images/product/coffee/cappuccino.jpg`, sizes: [{ label: "Small", price: 0 }, { label: "Medium", price: 1 }, { label: "Large", price: 2 }], milkOptions: [{ name: "Regular", price: 0 }, { name: "Almond", price: 1 }, { name: "Oat", price: 1.5 }], extras: [{ name: "Extra Shot", price: 1 }, { name: "Syrup", price: 0.5 }] },
    { productId: 7, name: "Cappuccino", basePrice: 5.0, imageUrl: `${basename}images/product/coffee/cappuccino.jpg`, sizes: [{ label: "Small", price: 0 }, { label: "Medium", price: 1 }, { label: "Large", price: 2 }], milkOptions: [{ name: "Regular", price: 0 }, { name: "Almond", price: 1 }, { name: "Oat", price: 1.5 }], extras: [{ name: "Extra Shot", price: 1 }, { name: "Syrup", price: 0.5 }] },

    // coffee API
  ],
  // Add other categories (Tea, Smoothie, etc.) with their respective products...
};

export default function MenuPage() {
  
  const [selectedCategory, setSelectedCategory] = useState("Coffee");
  const { modalOpen, setModalOpen, loginSuccess } = useAuth();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
    <Header/>
    <Global
        styles={{
          body: {
            backgroundColor: "#f0f0f0",
            margin: 0,
            padding: 0,
            minHeight: "100vh",
          },
        }}
      />
    
    <Box p="lg">
      {/* Category Menu */}
      <CategoryMenu onCategoryChange={handleCategoryChange} />

      <Grid mt="xl">
        <Grid.Col span={12} md={8}>
          <Stack spacing="lg">
            <Text size="xl" weight={700}>Product List</Text>
            <Grid>
              {products[selectedCategory].map((product) => (
                <Grid.Col key={product.productId} span={12} sm={6} md={6} lg={4}>
                  <ProductCard product={product} />
                </Grid.Col>
              ))}
            </Grid>
          </Stack>
        </Grid.Col>

        <Grid.Col span={12} md={4}>

          <Box
            style={{
              position: "sticky",
              top: "2rem",
              alignSelf: "flex-start",
            }}
          >
            <OrderSummary/>
          </Box>
        </Grid.Col>
      </Grid>
      <AuthModal opened={modalOpen} onClose={() => setModalOpen(false)} onLoginSuccess={loginSuccess} />
    </Box>
  </>
  );
}
