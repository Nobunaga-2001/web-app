import React, { useState, useEffect } from 'react';
import { get, ref } from 'firebase/database';
import { database, auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [profileVisible, setProfileVisible] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  // Fetch user details from the database using the current Firebase Authentication user ID
  const fetchUserDetails = async () => {
    const user = auth.currentUser;
    if (user) {
      // Use the UID from Firebase Authentication to fetch user details
      const userRef = ref(database, `users/${user.uid}`);
      const userSnapshot = await get(userRef);
      if (userSnapshot.exists()) {
        setUserDetails(userSnapshot.val());
      }
    }
  };

  // Handle logout functionality
  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/');
    }).catch((error) => {
      console.error("Error logging out: ", error);
    });
  };

  // Fetch user details when the component mounts
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      <button onClick={() => setProfileVisible(!profileVisible)}>
        {profileVisible ? "Hide Profile" : "Show Profile"}
      </button>
      <button onClick={handleLogout}>Logout</button>
      {profileVisible && userDetails && (
        <div>
          <h3>Profile Information</h3>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>First Name:</strong> {userDetails.firstName}</p>
          <p><strong>Last Name:</strong> {userDetails.lastName}</p>
          <p><strong>Age:</strong> {userDetails.age}</p>
          <p><strong>Birthday:</strong> {userDetails.birthday}</p>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
