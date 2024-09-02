import React from 'react';
import './Renter.css'; // Ensure you include the CSS file for styling

const Renter = () => {
  return (
    <div className="parent">
      <div className="div1">
            <img src={require('../images/logo1.png')} alt="Description of" />
      </div>
      <div className="div2">
        <h2>CHOOSE YOUR LOCKER</h2>
      </div>
      <div className="div3">
        <button className="locker-button1">1</button>
      </div>
      <div className="div4">
        <button className="locker-button2">2</button>
      </div>
      <div className="div5">
        <button className="locker-button3">3</button>
      </div>
      <div className="div6">
        <div className="square1"></div>
      </div>
      <div className="div7">
        <p>Available</p>
      </div>
      <div className="div8">
        <div className="square2"></div>
      </div>
      <div className="div9">
        <p>Occupied</p>
      </div>
      <div className="div10">
        <p>Please click the available door</p>
      </div>
    </div>
  );
};

export default Renter;
