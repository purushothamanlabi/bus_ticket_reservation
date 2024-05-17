import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { useGlobalData } from "../store/globledata";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import './../styles/verify.css';

const Verify = () => {
    const [otp, setOtp] = useState('');
    const { state } = useGlobalData();
    const navigate = useNavigate();

    const goback = () => {
        navigate('/useregister')
    }

    const handleVerify = async () => {
        try {
            const response = await fetch('http://localhost:4000/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    otp: otp,
                    userData: state
                })
            });
            if (response.status === 201) {
                navigate("/home");
            } else {
                const errorData = await response.json();
                toast.warn(errorData.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };
    

    return (
        <div className="otp-container">
            <h2 className="otp-heading">Enter Your OTP</h2>
            <h4 className='mb-3'>Your data is safe, but don't share your OTP with others</h4>
            <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                separator={<span className="otp-separator">-</span>}
                containerStyle="otp-input"
                inputStyle="otp-input-field"
                renderInput={(props) => <input {...props} />}
            />
            <div className="otp-buttons">
                <button className="otp-button" onClick={goback}>Go Back</button>
                <button className="otp-button" onClick={handleVerify}>Verify</button>
            </div>
        </div>
    );
}

export default Verify;
