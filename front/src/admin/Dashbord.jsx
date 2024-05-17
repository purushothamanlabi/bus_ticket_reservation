import React, { useState, useEffect } from "react";
import "./dashbord.css";
import QRCode from "react-qr-code";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/dashboard")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        return response.json();
      })
      .then((data) => {
        setBookings(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const togglePopup = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowPopup(!showPopup);
  };

  return (
    <div className="booking-details">
      <h2 className="text-4xl text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg">
        Booking Details
      </h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <React.Fragment>
          <table className="mt-2">
            <thead>
              <tr>
                <th>User ID</th>
                <th>From</th>
                <th>To</th>
                <th>Type</th>
                <th>Price</th>
                <th>Date of booked</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.userid}</td>
                  <td>{booking.from}</td>
                  <td>{booking.to}</td>
                  <td>{booking.type}</td>
                  <td>{Math.floor(booking.price) * 5}</td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="blue-button"
                      onClick={() => togglePopup(booking._id)} // Pass booking ID to togglePopup function
                    >
                      Action
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showPopup && (
            <div className="popup-container">
              <div className="popup flex justify-center items-center">

                <QRCode  value={selectedBookingId} size={130} />
                <button className="close-button" onClick={togglePopup}>
                  Close
                </button>
              </div>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default Dashboard;
