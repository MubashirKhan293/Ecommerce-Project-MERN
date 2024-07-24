import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; 
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import ContactUs from './components/ContactUs';
import ProductDetails from './components/ProductDetails';
import Perfumes from './components/categories/Perfumes';
import CoffeeEquipment from './components/categories/Coffee_Equipment';
import CommercialGrills from './components/categories/Commercial_Grills';
import Ovens from './components/categories/Ovens';
import CheckoutPage from './components/CheckoutPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserTable from './components/admin/Users';
import OrderList from './components/admin/Orders';
import FeedbackList from './components/admin/Feedbacks';

const toastOptions = {
  position: 'top-center',
  autoClose: 3000,
};

let toastId = null;

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {

    if (!toastId) {
      toastId = toast.warn('Please log in to access this page.', toastOptions);
    }
    return <Navigate to="/" />;
  }
  toastId = null;
  return element;
};


const AdminRoute = ({ element, ...rest }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  return isAuthenticated && isAdmin ? element : <Navigate to="/admin-dashboard" />;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
        <ToastContainer />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/contact-us" element={<ContactUs />} />
            
            <Route path="/perfumes" element={<Perfumes />}/>
            <Route path="/coffee-equipment" element={<CoffeeEquipment />} />
            <Route path="/commercial-grills" element={<CommercialGrills />}/>
            <Route path="/ovens" element={<Ovens/>}/>

            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/product-details" element={<PrivateRoute element={<ProductDetails />} />} />

            <Route path="/admin-dashboard" element={<AdminRoute element={<AdminDashboard />} />} />
            <Route path="/all-users" element={<UserTable />}/>
            <Route path="/orders" element={<OrderList />}/>
            <Route path="/feedbacks" element={<FeedbackList />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
