import { useNavigate, useParams } from 'react-router-dom';
import React from 'react'
import './../styles/payment.css'
import { useLocation } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
// import {  useNavigate } from "react-router-dom";

import { useGlobalData } from '../store/globledata';
const Payment = () => {

  const nav =  useNavigate()
  const {state} = useGlobalData()
  const username = state.username
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const responseData = JSON.parse(queryParams.get('responseData'));
  
  
  console.log(responseData.data);
  const Udata = {
    responseData,
    username
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
      const response = await fetch('http://localhost:4000/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Udata)
      });
      const data = await response.json();
      
      // Handle different response statuses
      if (response.status === 200) {
        nav(`/end?status=true`);
      } else if (response.status === 404 || response.status === 500) {
        nav(`/end?status=false`);
      } 
    } catch (error) {
      toast.error('Error submitting payment:', error);
      nav(`/end?status=false`);
    }
  };
  
      
  return (
    <section style={{ width: '100vw', height: '100vh' }}>
    <title>Day 002 - Credit Card Checkout</title>
    <div className="checkout-container">
      <div className="right-side">
        <div className="receipt">
          <h2 className="receipt-heading mb-3 ml-4">travel from {responseData.data.from}  to {responseData.data.to}</h2>
          <div>
            <table className="table">
              <tbody>
                <tr>
                  <td>1km x ₹5</td>
                  <td className="price">₹ {Math.floor(responseData.data.distance) * 5 }</td>
                </tr>
                <tr>
                  <td>Discount</td>
                  <td className="price">₹0.00</td>
                </tr>
                <tr>
                  <td>Tax</td>
                  <td className="price">₹50.00</td>
                </tr>
                <tr className="total">
                  <td>Total</td>
                  <td className="price">₹{Math.floor(responseData.data.distance) * 5 +50}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="payment-info">
          <h3 className="payment-heading text-center  mt-3">Payment Information</h3>
          <form className="form-box" onSubmit={handleSubmit} encType="text/plain" method="get" target="_blank">
            <div>
              <label htmlFor="full-name">Enter your UPI ID </label>
              <input
                id="full-name"
                name="full-name"
                placeholder="example@upi"
                required
                type="text"
              />
            </div>
            <button className="btn">
            <i class="fa-regular fa-money-bill-1"></i>{""}

              Book Securely
            </button>
          </form>
          <p className="footer-text">
            <i className="fa-solid fa-lock" />
            Your booking information is encrypted
          </p>
        </div>
      </div>
    </div>
  </section>
  
  
  
  )
}

export default Payment