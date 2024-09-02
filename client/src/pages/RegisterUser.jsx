import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ref, set } from 'firebase/database';
import { auth, database } from '../firebaseConfig';

const styles = {
  container: {
    padding: '40px',
    fontFamily: '"Roboto", sans-serif',
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '15px',
    margin: '10px 0',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#e0e0e0',
    fontSize: '16px',
    boxShadow: 'inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '15px',
    margin: '15px 0',
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
  message: {
    textAlign: 'center',
    color: '#333',
    marginTop: '20px',
    fontSize: '16px',
  },
  loginButton: {
    backgroundColor: '#28a745',
  },
  loginButtonHover: {
    backgroundColor: '#218838',
  },
};

const RegisterUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSignUp = () => {
    const userCode = generateUserCode();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        set(ref(database, `users/${uid}`), {
          firstName,
          lastName,
          email,
          userCode,
        });

        setMessage('User signed up successfully!');
        setTimeout(() => {
          navigate('/loginuser');
        }, 2000);
      })
      .catch((error) => {
        console.error(error.message);
        setMessage('Error signing up. Please try again.');
      });
  };

  const handleGoToLogin = () => {
    navigate('/loginuser');
  };

  const generateUserCode = () => {
    const randomNum = Math.floor(10 + Math.random() * 90);
    return `89${randomNum}`;
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Sign Up</h1>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        style={styles.input}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button
        onClick={handleSignUp}
        style={styles.button}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
      >
        Sign Up
      </button>
      <button
        onClick={handleGoToLogin}
        style={{ ...styles.button, ...styles.loginButton }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.loginButtonHover.backgroundColor)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.loginButton.backgroundColor)}
      >
        Go to Login
      </button>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

export default RegisterUser;
