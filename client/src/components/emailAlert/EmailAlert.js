import React, { useState } from 'react';
import axios from 'axios';
import './emailAlert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmailAlert = () => {
  const [email, setEmail] = useState('');
  const [threshold, setThreshold] = useState();
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/send-alert', { email, threshold })
      .then(res => {
        toast.success(res.data.message);  // Show success toast
      })
      .catch(err => {
        toast.error('Error: ' + err.response.data.message);  // Show error toast
      });
  };

  return (
    <div className="emailAlert">
      <div className="alertCon">
        <h1>Email Alert</h1>
        <form onSubmit={handleSubmit} className='alertForm'>
          <div className="formCon">
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder='Enter Email'
              required 
            />
          </div>
          <div className="formCon">
            <input 
              type="number" 
              value={threshold} 
              onChange={(e) => setThreshold(e.target.value)} 
              placeholder='Enter thresold for leads'
              required 
            />
          </div>
          <button type="submit" className='alertFormBtn'>Send Alert</button>
        </form>
        <ToastContainer autoClose={1000}/>
      </div>
    </div>
  );
};

export default EmailAlert;
