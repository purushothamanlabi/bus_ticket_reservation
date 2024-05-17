import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./../styles/Home.css";
import {  useNavigate } from "react-router-dom";
import { useGlobalData } from "../store/globledata";
import { Link } from "react-router-dom";

import Bus from './bus.jpg'
const Home = () => {
  // const history = useHistory();
  const { state } = useGlobalData();
  const navigate = useNavigate();



  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    busType: "",
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {

    
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log('Form data submitted:', data);
      // Optionally, you can reset the form fields here
      setFormData({
        from: '',
        to: '',
        date: '',
        busType: '',
      });
      navigate(`/payment?responseData=${encodeURIComponent(JSON.stringify(data))}`);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  const busOptions = [
    { value: "standard", label: "Standard" },
    { value: "comfort", label: "Comfort" },
    { value: "business", label: "Business" },
    { value: "luxury", label: "Luxury" },
    { value: "sleeper", label: "Sleeper" },
    { value: "specialized", label: "Specialized" },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div>
      <div className="h-screen bg-white">
        <div className="flex justify-between items-center bg-[#0e76bc] p-2 text-white">
          <div className="flex space-x-4">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#0e76bc] text-white">
              <Link to={"/userlogin"}>LOGOUT</Link>
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#0e76bc] text-white">
            {/* <Link to={"/profile"} className="text-white">{state.username.toUpperCase()}</Link> */}
            <Link to={"/profile"} className="text-white ">{state.username.toUpperCase()}</Link>




            </button>
           
          </div>
          <div className="flex space-x-4">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#0e76bc] text-white">
              CONTACT US
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#0e76bc] text-white">
              DAILY DEALS
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#0e76bc] text-white">
              ALERTS
            </button>
          </div>
          <p className="text-sm">
            {formattedDate} [{formattedTime}]
          </p>
        </div>
        <div className="flex justify-between items-center bg-[#f2f2f2] p-2">
          <div className="flex space-x-4">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#f2f2f2] text-[#0e76bc]">
              EXCLUSIVE
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#f2f2f2] text-[#0e76bc]">
              BUSES
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#f2f2f2] text-[#0e76bc]">
              CATIGOEY
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#f2f2f2] text-[#0e76bc]">
              UPDATES
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#f2f2f2] text-[#0e76bc]">
              HOTELS
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#f2f2f2] text-[#0e76bc]">
              HOLIDAYS
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#f2f2f2] text-[#0e76bc]">
              LOYALTY
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#f2f2f2] text-[#0e76bc]">
              MEALS
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#f2f2f2] text-[#0e76bc]">
              PROMOTIONS
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#f2f2f2] text-[#0e76bc]">
              MORE
            </button>
          </div>
          <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">
              U
            </span>
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row lg:justify-between bg-white p-4"
        >
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-[#0e76bc]"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <h1 className="text-2xl font-bold text-[#0e76bc]">BOOK TICKET</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-[#0e76bc]"
              >
                <circle cx={12} cy={12} r={10} />
              </svg>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium" htmlFor="from">
                  From
                </label>
                <input
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="from"
                  name="from"
                  placeholder="City or Station"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium" htmlFor="to">
                  To
                </label>
                <input
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="to"
                  name="to"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium" htmlFor="date">
                  Date
                </label>
                <input
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="date"
                  name="date"
                  type="date"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium" htmlFor="bus">
                  bus type
                </label>
                <select
                  onChange={handleChange}
                  id="bus"
                  name="busType" // Set name to busType
                  value={formData.busType} // Set value to the state value
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {busOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center mt-3 mr-2">
              <input
                type="checkbox"
                required
                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="rail-pass-concession"
              />
              <label htmlFor="rail-pass-concession" className="text-sm ml-2">
                I agree to the Terms and Conditions
              </label>
            </div>
            <div className="flex items-center mt-3 mr-2">
              <input
                type="checkbox"
                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="rail-pass-concession"
              />
              <label htmlFor="rail-pass-concession" className="text-sm ml-2">
                send updates on whatsapp
              </label>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-[#f58634] text-white"
              >
                Book Now
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-white text-[#0e76bc]">
                Try booking in Ask DISHA 2.0
              </button>
            </div>
          </div>
          <div className="flex-1 mt-4 lg:mt-0">
            <img
            src={Bus}
              alt="bus Image"
              className="rounded-md"
              width={500}
              height={300}
              style={{ aspectRatio: "500 / 300", objectFit: "cover" }}
            />
          </div>
        </form>
        <div className="bg-[#0e76bc] text-white text-center p-2">
          <p>Please click here for Empanelment for PAD items for Catering.</p>
        </div>
        <h3 className="text-center  mt-3 mb-3 text-xl font-bold text-[#0e76bc]">
          {" "}
          DEVELOPED BY VIKRAM AND AJITH
        </h3>
        <footer className=" bg-gradient-to-r from-blue-400 to-purple-600  text-white text-center p-2">
          <div className="container mx-auto text-center bg-gradient-to-r from-blue-400 to-purple-600 h-full w-full">
            <p className="text-white">
              © 2024 Your Company. All rights reserved.
            </p>
            <div className="flex justify-center space-x-4 mt-2">
              <a
                href="#"
                className="text-white hover:text-gray-200 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-200 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-200 transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
