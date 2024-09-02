import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { signInWithEmailAndPassword } from 'firebase/auth';
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
    backgroundColor: '#28a745',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '4px 4px 8px #bebebe, -4px -4px 8px #ffffff',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#218838',
  },
  message: {
    textAlign: 'center',
    color: '#333',
    marginTop: '20px',
    fontSize: '16px',
  },
};

const LoginUser = () => {
  const [userCode, setUserCode] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setMessage('');

      // Query the database for the userCode
      const userRef = query(ref(database, 'users'), orderByChild('userCode'), equalTo(userCode));
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        const uid = Object.keys(userData)[0];
        const storedPassword = userData[uid].password;

        // Check if entered password matches stored password
        if (storedPassword === password) {
          const email = userData[uid].email; // Get the stored email
          await signInWithEmailAndPassword(auth, email, password);
          
          setMessage('Login successful!');
          setTimeout(() => {
            navigate('/adminlogin');
          }, 2000);
        } else {
          setMessage('Invalid password.');
        }
      } else {
        setMessage('User code not found.');
      }
    } catch (error) {
      console.error('Sign-in error:', error.message);
      setMessage('Error during login. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Login</h1>
      <input
        type="text"
        placeholder="User Code"
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
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
        onClick={handleLogin}
        style={styles.button}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
      >
        Login
      </button>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

export default LoginUser;
  