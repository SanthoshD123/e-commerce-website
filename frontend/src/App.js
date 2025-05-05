import './styles.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { logout } from './slices/authSlice';
import { setPaymentMethods } from './slices/paymentSlice'; // Import Payment Slice
import axios from 'axios';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Handle user session expiration
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime) {
      const currentTime = new Date().getTime();
      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }

    // Fetch available payment methods (Dummy Module)
    const fetchPaymentMethods = async () => {
      try {
        const { data } = await axios.get('/api/payment/methods'); // Fetch dummy methods
        dispatch(setPaymentMethods(data)); // Store in Redux
      } catch (error) {
        console.error('Error fetching payment methods', error);
      }
    };

    fetchPaymentMethods();
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <Header />
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
