import './footer.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';

const Footer = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div className='FooterContainer'>
      <div className='Left'>
        <h1 className='Logo'>Med Link.</h1>
        <p className='Description'>
          "Welcome to MedLink Hospital Management System, your trusted partner
          in healthcare. We are committed to providing top-notch medical
          services and efficient management for healthcare facilities across Sri
          Lanka."
        </p>
        <div className='icons'>
          <i className='topIcon fab fa-facebook-square'></i>
          <i className='topIcon fab fa-instagram-square'></i>
          <i className='topIcon fab fa-pinterest-square'></i>
          <i className='topIcon fab fa-twitter-square'></i>
        </div>
      </div>
      <div className='Center'>
        <h3 className='Title'>Useful Links</h3>
        <ul className='List'>
          <li className='ListItem'>
            <Link
              className='footer-links'
              to='/'
            >
              Home
            </Link>
          </li>
          {isLoggedIn && (
            <>
              <li className='ListItem'>
                <Link className='footer-links' to='/Services'>Services</Link>
              </li>
              <li className='ListItem'>
                <Link className='footer-links' to='/Doctors'>Doctors</Link>
              </li>
            </>
          )}
          {isLoggedIn ? (
            <div></div>
          ) : (
            <div>
              <li className='ListItem'>
                <Link
                  className='footer-links'
                  to='/register'
                >
                  Register
                </Link>
              </li>
              <li className='ListItem'>
                <Link
                  className='footer-links'
                  to='/login'
                >
                  Login
                </Link>
              </li>
            </div>
          )}
        </ul>
      </div>
      <div className='Right'>
        <h3 className='Title'>Contact</h3>
        <div className='ContactItem'>
          MedLink Hospital, 123, Hospital Road, Colombo 01000, Sri Lanka
        </div>
        <div className='ContactItem'>+94 11 1234567</div>
        <div className='ContactItem'>info@medlinkhospital.lk</div>
        <div className='payment-methods'>
          <i className="fab fa-cc-visa" style={{ fontSize: "24px", marginRight: "10px", color: "var(--primary-color)" }}></i>
          <i className="fab fa-cc-mastercard" style={{ fontSize: "24px", marginRight: "10px", color: "var(--primary-color)" }}></i>
          <i className="fab fa-cc-paypal" style={{ fontSize: "24px", color: "var(--primary-color)" }}></i>
        </div>
      </div>
    </div>
  );
};

export default Footer;
