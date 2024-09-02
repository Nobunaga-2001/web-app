import React from 'react';
import axios from 'axios';

const Control = () => {
  const handleButtonClick = async (state) => {
    try {
      // Replace with your Flask server URL
      const response = await axios.post('http://<Raspberry-Pi-IP>:5000/led', { state });
      alert(`LED turned ${state}`);
    } catch (error) {
      console.error('Error controlling LED:', error);
      alert('Failed to control LED');
    }
  };

  return (
    <div>
      <button onClick={() => handleButtonClick('on')}>Turn LED On</button>
      <button onClick={() => handleButtonClick('off')}>Turn LED Off</button>
    </div>
  );
};

export default Control;
