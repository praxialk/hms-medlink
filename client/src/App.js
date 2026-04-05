import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext/AuthContext';
import './App.css';
//Pages
import Login from './pages/login/login';
import Register from './pages/register/register';
import About from './pages/about/about';
import Contact from './pages/Contact/Contact';
import Services from './pages/Services/Services';
import Homepage from './pages/homepage/Homepage';
import BookAppointmentPage from './components/Appointment/Booking';
import DoctorsPage from './pages/doctors/doctor';
import PaymentPage from './pages/payment/payment';
import Userdashboard from './pages/dashboard/Userdashboard';
import ReviewForm from './pages/Review/reviewpage';
import ReadReviews from './components/ReadReviews/ReadReviews';
import EmergencyRequestForm from './components/Emergency/Emergency';
import NearbyHospitals from './map/map';
import DoctorInterface from './components/Doctorpanel/DoctorInterface';
import Chat from './components/Chatpanel/Chatpanel';
import ChatRoom from './components/ChatRoom/ChatRoom';

const App = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={<Homepage />}
            />
            <Route
              path='/Appointment'
              element={<BookAppointmentPage />}
            />
            <Route
              path='/login'
              element={<Login />}
            />

            <Route
              path='/register'
              element={<Register />}
            />
            <Route
              path='/About'
              element={<About />}
            />
            <Route
              path='/Emergency'
              element={<EmergencyRequestForm />}
            />
            <Route
              path='/Services'
              element={<Services />}
            />
            <Route
              path='/Contact'
              element={<Contact />}
            />
            <Route
              path='/Blog'
              element={<About />}
            />
            <Route
              path='/Doctors'
              element={<DoctorsPage />}
            />
            <Route
              path='/Payments'
              element={<PaymentPage />}
            />
            <Route
              path='/Review&Feedback'
              element={<ReviewForm />}
            />
            <Route
              path='/User-Dashboard'
              element={<Userdashboard />}
            />
            <Route
              path='/Review&Feedback/ReadReviews'
              element={<ReadReviews />}
            />
            <Route
              path='/map'
              element={<NearbyHospitals />}
            />
            <Route
              path='/doc'
              element={<DoctorInterface />}
            />
            <Route
              path='/chatpanel'
              element={<Chat />}
            />
            <Route
              path='/chat'
              element={<ChatRoom />}
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;
