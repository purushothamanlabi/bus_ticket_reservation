const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = { origin: true, credentials: true };
const accountSid = "";
const authToken = "";
const client = require("twilio")(accountSid, authToken);
const bodyparse = require("body-parser");
const app = express();
const PORT = 4000;
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyparse.urlencoded({ extended: false }));
app.use(bodyparse.json());
const axios = require("axios");
const crypto = require("crypto");

// "mongodb+srv://vikramhardik2:vikramviru12@cluster0.hdi2hca.mongodb.net/purushottam?retryWrites=true&w=majority",

mongoose
  .connect(
    "mongodb+srv://purushoth:QtQgw10Q1FJ1HmfF@somthing.r60a5nq.mongodb.net/sample?retryWrites=true&w=majority&appName=somthing",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("err", err);
  });

const User = require("./models/User.js");
const BookingModel = require("./models/booking.js");

// =================================================================================

app.post("/userlogin", async (req, res) => {
  // const phoneNumber = req.body.phone;
  const username = req.body.username;
  const password = req.body.password;

  // console.log("",username,"",password);

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.password !== password) {
      return res.status(401).send("Incorrect password");
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// =================================================================================
const otpStore = {}; // Stores OTPs for phone numbers

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

function cleanUpExpiredOTPs(phoneNumber) {
  const now = Date.now();
  if (otpStore[phoneNumber]) {
    otpStore[phoneNumber] = otpStore[phoneNumber].filter(
      (otpObj) => now - otpObj.timestamp < 5 * 60 * 1000
    ); // Keep OTPs that are less than 5 minutes old
  }
}

app.post("/usregister", async (req, res) => {
  const { phone: phoneNumber } = req.body;

  const num = req.body.phone;
  try {
    const otp = generateOTP();
    // Clean up expired OTPs before adding a new one
    cleanUpExpiredOTPs(phoneNumber);
    if (!otpStore[phoneNumber]) {
      otpStore[phoneNumber] = [];
    }
    otpStore[phoneNumber].push({
      otp,
      timestamp: Date.now(),
    });
    // Send OTP
    // Assuming `client.messages.create` sends the OTP
    await client.messages
      .create({
        from: "+12513133264",
        to: `+91${num}`,
        body: `                      >>> dear customer NUM:${num}, your OTP for bus ticket booking application, developed by Vikram and Ajith, your OTP: ${otp}. Please don't share this OTP with anyone.`,
      })
      .then((message) => console.log(message.sid))
      .catch((error) => console.error(error.message + " from Twilio"));
    res.status(200).send("OTP sent successfully.");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// =================================================================================

app.post("/verify", async (req, res) => {
  const { otp, userData } = req.body;
  try {
    const phoneNumber = userData.phone;
    const storedOTPs = otpStore[phoneNumber];
    if (!storedOTPs || storedOTPs.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "OTP expired or not found." });
    }
    const recentOTP = storedOTPs[storedOTPs.length - 1];
    if (
      parseInt(otp) === recentOTP.otp &&
      Date.now() - recentOTP.timestamp < 5 * 60 * 1000
    ) {
      // Verify OTP is within 5 minutes
      const newUser = new User(userData);
      await newUser.save();
      res
        .status(201)
        .json({ success: true, message: "Account created successfully." });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect or expired OTP." });
    }
  } catch (error) {
    if (error.code === 11000) {
      console.error("Error: Duplicate key error", error);
      return res.status(409).json({
        success: false,
        message: "This number is already used with another account.",
      });
    }
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// =================================================================================
app.post("/home", async (req, res) => {
  const { from, to, date, busType } = req.body;

  const options = {
    method: "POST",
    url: "https://distanceto.p.rapidapi.com/distance/route",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "3e6df4defbmsh32685b81a2fffefp115d20jsn5b9514c194b0",
      "X-RapidAPI-Host": "distanceto.p.rapidapi.com",
    },
    data: {
      route: [
        {
          country: "IND",
          name: from,
        },
        {
          country: "IND",
          name: to,
        },
      ],
    },
  };
  try {
    const response = await axios.request(options);
    const distance = response.data.route.vincenty;
    console.log(distance);
    res.status(200).json({ data: { from, to, date, busType, distance } });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "An error occurred while calculating the distance" });
  }
});

// =================================================================================

app.post("/payment", async (req, res) => {
  try {
    const { responseData, username } = req.body;

    // Find the user by username to get the user ID
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Save the booking details with the user ID
    const bookingData = {
      userid: user._id,
      from: responseData.data.from,
      to: responseData.data.to,
      date: responseData.data.date,
      type: responseData.data.busType,
      price: responseData.data.distance, // Assuming you have a function to calculate the price
    };
    console.log(bookingData);
    const booking = await BookingModel.create(bookingData);

    res.status(200).json({ booking });
  } catch (error) {
    console.error("Error saving data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// =================================================================================

app.get("/profile/:name", async (req, res) => {
  const username = req.params.name;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const bookings = await BookingModel.find({ userid: user._id });

    return res.json({ bookings });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// =================================================================================

app.get("/dashboard", async (req, res) => {
  try {
    const bookings = await BookingModel.find({});
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching bookings.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
