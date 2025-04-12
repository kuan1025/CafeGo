import { Routes, Route } from 'react-router-dom';
import { Container, Title } from '@mantine/core'; 
import AdminLogin from './admin/pages/login/login';
import AdminHome from './admin/pages/AdminLayout';
import Home from './customer/pages/Home';
import MenuPage from './customer/pages/MenuPage';
import CheckoutPage from './customer/pages/Checkout';
import OAuthSuccessPage from './customer/pages/OAuthSuccess';
import './App.css'





function App() {
  return (
   
      <Routes>
        {/* customer */}
        <Route path="/" element={<Home/>} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path='/checkout' element={<CheckoutPage/>} />

        <Route path='/oauth-success' element={<OAuthSuccessPage/>} />


        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminHome />} />

      </Routes>
   
  );
}

export default App
