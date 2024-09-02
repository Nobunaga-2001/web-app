import React, { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
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
    textAlign: 'center',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#333',
  },
  profileDetails: {
    marginBottom: '20px',
  },
  detailItem: {
    fontSize: '18px',
    color: '#555',
    margin: '10px 0',
  },
  button: {
    padding: '15px',
    margin: '15px 0',
    width: '100%',
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

const AdminLogin = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Assume userCode is stored in the user's custom claims or somewhere accessible
          const userCode = user.email.split('@')[0]; // Replace with actual method to retrieve userCode
          
          const userRef = query(ref(database, 'users'), orderByChild('userCode'), equalTo(userCode));
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const userData = Object.values(snapshot.val())[0]; // Get the first matching user
            setUserDetails(userData);
          } else {
            console.log('No user data found');
            await signOut(auth);
            navigate('/loginuser'); // Redirect to login page if no user data found
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          await signOut(auth);
          navigate('/loginuser'); // Redirect to login page on fetch error
        } finally {
          setLoading(false); // Ensure loading is false after fetch
        }
      } else {
        navigate('/loginuser'); // Redirect to login page if not logged in
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUserDetails(null); // Clear user details
        navigate('/loginuser'); // Redirect to login page after logout
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Admin Dashboard</h1>
      {loading ? (
        <p>Loading user details...</p>
      ) : (
        userDetails && (
          <div style={styles.profileDetails}>
            <p style={styles.detailItem}>First Name: {userDetails.firstName}</p>
            <p style={styles.detailItem}>Last Name: {userDetails.lastName}</p>
            <p style={styles.detailItem}>Email: {userDetails.email}</p>
            <p style={styles.detailItem}>User Code: {userDetails.userCode}</p>
          </div>
        )
      )}
      <button
        onClick={handleLogout}
        style={styles.button}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminLogin;
