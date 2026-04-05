import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/navbar';
import { useAuth } from '../../AuthContext/AuthContext';
import './UserDashboard.css';
import Sidebar from '../../components/sidebar/sidebar';

const Userdashboard = () => {
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const { user_id, username, setIsOpen, setUser_id } = useAuth();

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 767) setIsOpen(false);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsOpen]);

  useEffect(() => {
    if (user_id) {
      localStorage.setItem('user_id', user_id);
    } else {
      const stored = localStorage.getItem('user_id');
      if (stored) setUser_id(stored);
    }
  }, [user_id, setUser_id]);

  const getUsers = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/appointment.php?user_id=${user_id}`
      );
      if (Array.isArray(response.data)) {
        setUsers(response.data);
        localStorage.setItem('users', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  }, [user_id]);

  const getPayments = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/payment.php?user_id=${user_id}`
      );
      if (Array.isArray(response.data)) {
        setPayments(response.data);
        localStorage.setItem('payments', JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  }, [user_id]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('users'));
    if (stored) { setUsers(stored); getUsers(); } else { getUsers(); }
  }, [getUsers]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('payments'));
    if (stored) { setPayments(stored); getPayments(); } else { getPayments(); }
  }, [getPayments]);

  const deleteUser = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/appointment.php/${id}/delete`)
      .then(() => getUsers());
  };

  const displayName = username || 'Patient';

  return (
    <div>
      <div className='dashboard-header'>
        <Navbar isInUserDashboard={true} />
      </div>

      <Sidebar>
        <div className='dashboard-content'>

          {/* Welcome Banner */}
          <div className='dashboard-welcome'>
            <div>
              <h1>Welcome back, {displayName}! 👋</h1>
              <p>Here's a summary of your health activity.</p>
            </div>
            <span className='welcome-icon'>🏥</span>
          </div>

          {/* Stat Cards */}
          <div className='dashboard-stats'>
            <div className='stat-card'>
              <div className='stat-icon blue'><i className='ri-calendar-check-line'></i></div>
              <div className='stat-info'>
                <div className='stat-value'>{users.length}</div>
                <div className='stat-label'>Appointments</div>
              </div>
            </div>
            <div className='stat-card'>
              <div className='stat-icon teal'><i className='ri-bank-card-line'></i></div>
              <div className='stat-info'>
                <div className='stat-value'>{payments.length}</div>
                <div className='stat-label'>Payments</div>
              </div>
            </div>
            <div className='stat-card'>
              <div className='stat-icon purple'><i className='ri-stethoscope-line'></i></div>
              <div className='stat-info'>
                <div className='stat-value'>
                  {[...new Set(users.map(u => u.doctor))].filter(Boolean).length}
                </div>
                <div className='stat-label'>Doctors Seen</div>
              </div>
            </div>
          </div>

          {/* Appointments Table */}
          <div className='dashboard-section'>
            <div className='section-header'>
              <h2><i className='ri-calendar-line'></i>My Appointments</h2>
              <span className='section-badge'>{users.length} total</span>
            </div>
            <div className='modern-table-wrap'>
              <table className='modern-table'>
                <thead>
                  <tr>
                    <th>Patient Name</th><th>Email</th><th>Phone</th>
                    <th>Doctor</th><th>Date</th><th>Time</th>
                    <th>Message</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr><td colSpan='8'>
                      <div className='empty-state'>
                        <i className='ri-calendar-2-line'></i>
                        <p>No appointments booked yet.</p>
                      </div>
                    </td></tr>
                  ) : users.map((user, key) => (
                    <tr key={key}>
                      <td className='td-primary'>{user.name}</td>
                      <td className='td-secondary'>{user.email}</td>
                      <td>{user.phone}</td>
                      <td className='td-primary'>{user.doctor}</td>
                      <td>{user.date}</td>
                      <td>{user.time}</td>
                      <td className='td-secondary'>{user.message || '—'}</td>
                      <td>
                        <button className='btn-delete' onClick={() => deleteUser(user.id)}>
                          <i className='ri-delete-bin-line'></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payments Table */}
          <div className='dashboard-section'>
            <div className='section-header'>
              <h2><i className='ri-secure-payment-line'></i>My Payments</h2>
              <span className='section-badge'>{payments.length} total</span>
            </div>
            <div className='modern-table-wrap'>
              <table className='modern-table'>
                <thead>
                  <tr>
                    <th>Email</th><th>Date</th><th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length === 0 ? (
                    <tr><td colSpan='3'>
                      <div className='empty-state'>
                        <i className='ri-bank-card-2-line'></i>
                        <p>No payments recorded yet.</p>
                      </div>
                    </td></tr>
                  ) : payments.map((payment, key) => (
                    <tr key={key}>
                      <td className='td-secondary'>{payment.payment_email}</td>
                      <td>{payment.payment_date}</td>
                      <td>
                        <span className='amount-badge'>
                          <i className='ri-money-dollar-circle-line'></i>
                          {payment.payment_amount}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </Sidebar>
    </div>
  );
};

export default Userdashboard;
