import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo1.png'; // Make sure the path to your logo image is correct

const styles = {
  container: {
    padding: '40px',
    fontFamily: '"Roboto", sans-serif',
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  logo: {
    width: '150px',
    height: 'auto',
    marginBottom: '20px',
  },
  header: {
    color: '#333',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    padding: '15px',
    margin: '10px 0',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '4px 4px 8px #bebebe, -4px -4px 8px #ffffff',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

const Mainpage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <img src={logo} alt="Logo" style={styles.logo} />
      <h1 style={styles.header}>Choose a Service</h1>
      <button
        onClick={() => navigate('/loginuser')}
        style={styles.button}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
      >
        Rent
      </button>
      <button
        onClick={() => navigate('/registeruser')}
        style={styles.button}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
      >
        Take
      </button>
    </div>
  );
};

export default Mainpage;
