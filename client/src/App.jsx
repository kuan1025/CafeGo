import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './route/ProtectedRoute';
import AdminHome from './admin/pages/AdminLayout';
import Home from './customer/pages/Home';
import MenuPage from './customer/pages/MenuPage';
import OAuthSuccessPage from './customer/pages/OAuthSuccess';
import './App.css'





function App() {
  return (
   
      <Routes>
        {/* customer */}
        <Route path="/" element={<Home/>} />
        <Route path="/menu" element={<MenuPage />} />


          {/* OAuth2 */}
        <Route path='/oauth-success' element={<OAuthSuccessPage/>} />

        {/* only admin */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="home" element={<AdminHome />} />
        </Route>

      </Routes>
   
  );
}

export default App
