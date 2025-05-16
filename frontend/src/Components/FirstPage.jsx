import React from 'react';
import { Link } from 'react-router-dom';
import './FirstPage.css';

export default function FirstPage() {
  return (
    <div className="form-container">
      <div className="form">
        <h1 className="heading">W E D - M A N A G E R</h1>
        <p className="c1">
          An online platform to manage your wedding plans and help you memorize
          your tasks so that you don't forget any important details.
        </p>
        <p className="c2">Join now and forget your worries.</p>
        
        <div className="button-container">
          <Link to="/signup">
            <button className="send-button" type="button">Signup</button>
          </Link>
          <div className="reset-button-container">
            <Link to="/login">
              <button className="reset-button" type="button" id="reset-btn">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
