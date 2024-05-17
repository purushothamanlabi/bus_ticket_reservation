import React, { useState, useEffect } from "react";
import "./../styles/profile.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useGlobalData } from "../store/globledata";
import QRCode from "react-qr-code";
const Profile = () => {
  const { state } = useGlobalData();
  const [userData, setUserData] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null); // State to store the selected booking

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/profile/${state.username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          toast.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        toast.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [state.username]);

  const openPopup = (booking) => { // Modify openPopup to accept the booking information
    setSelectedBooking(booking); // Set the selected booking in state
  };

  const closePopup = () => {
    setSelectedBooking(null); // Clear the selected booking when closing the popup
  };
  return (
    <div class="p-16">
      <div class="p-8 bg-white shadow mt-13">
        <p className="some_para">
          <h2>welcome to my project </h2> <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          necessitatibus voluptatem perspiciatis quibusdam, id omnis. Maxime
          esse blanditiis adipisci quia eos quaerat harum, unde perferendis
          voluptas asperiores. Rerum, provident non?
        </p>
        <div class="images_content">
          <h1 class="text-4xl font-medium text-gray-700 mt-3 text-center mb-2">
            @{state.username} <span class="font-light text-gray-500"></span>
          </h1>
          <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0"></div>
          <div class="relative">
            <div class="w-48 h-48 mr-2 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDF2xLMbCoTFAETbFf6I9TiE_H8wBdHxbWnnZAcLGfOg&s"
                alt=""
                style={{ border: "2px solid red", borderRadius: "50%" }}
              />
            </div>
          </div>
          <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <button class="contact__button text-white py-2 mr-12 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Connect
            </button>
            <button class="message__button text-white py-2 px-4 ml-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              Message
            </button>
          </div>
        </div>
        <div class="mt-4 text-center border-b pb-12">
          <p class="font-light text-gray-600 mt-3">
            here contain all booking details
          </p>
          <p class="mt-8 text-gray-500">
            Solution Manager - Creative Tim Officer
          </p>
          <p class="mt-2 text-gray-500">University of Computer Science</p>
        </div>

        {userData && userData.bookings && userData.bookings.length === 0 ? (
          <p>You have not booked anything yet.</p>
        ) : (
          <div class="mt-12 flex flex-wrap justify-center">
            {userData &&
              userData.bookings &&
              userData.bookings.map((booking, index) => (
                <div
                  class="flex flex-col items-center justify-center w-full sm:w-1/2 lg:w-1/3 p-4"
                  key={index}
                >
                  <p class="text-gray-600 text-center font-light lg:px-16">
                    <p>
                      <strong>Name:</strong> {state.username}
                    </p>
                    <p>
                      <strong>From:</strong> {booking.from}
                    </p>
                    <p>
                      <strong>To:</strong> {booking.to}
                    </p>
                    <p>
                      <strong>Type:</strong> {booking.type}
                    </p>
                    <p>
                      <strong>Price:</strong> {Math.floor(booking.price) * 5}
                    </p>
                    <p>
                      <strong>Date Of Booked:</strong>{" "}
                      {new Date(booking.date).toLocaleDateString()}
                    </p>
                  </p>
                  <button
                    class="text-indigo-500 py-2 px-4 font-medium mt-4"
                    onClick={() => openPopup(booking)} 
                  >
                    give QR
                  </button>
                </div>
              ))}
          </div>
        )}

      {selectedBooking && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-button" onClick={closePopup}>
              Close
            </button>
            <p className="">
               don't share QR code to others{" "}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <QRCode value={selectedBooking._id} size={128} /> {/* Use the booking ID for QR code */}
            </div>
            <button className="btn-2"></button>
          </div>
        </div>
      )}

      </div>
    </div>
  );
};

export default Profile;
