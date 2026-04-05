import React from 'react';
import { FaBars } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import './sidebar.css';
import { useAuth } from '../../AuthContext/AuthContext';

const Sidebar = ({ children }) => {
  const { isOpen, setIsOpen } = useAuth();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const menuItem = [
    {
      path: '/User-Dashboard',
      name: 'Dashboard',
      icon: <i class='fa-solid fa-table-columns'></i>,
    },
    {
      path: '/Payments',
      name: 'Make Payments',
      icon: <i class='fa-solid fa-credit-card'></i>,
    },
    {
      path: '/Appointment',
      name: 'Make An Appointment',
      icon: <i class='fa-solid fa-calendar-check'></i>,
    },
    {
      path: '/about',
      name: 'About',
      icon: <i class='fa-solid fa-address-card'></i>,
    },
    {
      path: '/contact',
      name: 'Contact Us',
      icon: <i class='fa-solid fa-address-book'></i>,
    },
  ];
  return (
    <div className='sidebar-wrapper'>
      <div
        style={{ width: isOpen ? '200px' : '50px' }}
        className='sidebar'
      >
        <div className='top_section'>
          <h1
            style={{ display: isOpen ? 'block' : 'none' }}
            className='logo'
          >
            {'<<<<'}
          </h1>
          <div
            style={{ marginLeft: isOpen ? '50px' : '0px' }}
            className='bars'
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className='linkSidebar'
            activeclassName='active'
          >
            <div className='icon'>{item.icon}</div>
            <div
              style={{ display: isOpen ? 'block' : 'none' }}
              className='link_text'
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
