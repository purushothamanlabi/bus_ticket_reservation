import React from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const End = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const statusParam = queryParams.get('status');
  const responseData = statusParam ? JSON.parse(statusParam) : null;
  


  if(!responseData){
    return ( 
      <div>
        <style
          dangerouslySetInnerHTML={{
            __html:
              '\n      body {\n        text-align: center;\n        padding: 40px 0;\n        background: #EBF0F5;\n      }\n        h1 {\n          color: #FF6347; /* Change color to red */\n          font-family: "Nunito Sans", "Helvetica Neue", sans-serif;\n          font-weight: 900;\n          font-size: 40px;\n          margin-bottom: 10px;\n        }\n        p {\n          color: #404F5E;\n          font-family: "Nunito Sans", "Helvetica Neue", sans-serif;\n          font-size: 20px;\n          margin: 0;\n        }\n      i {\n        color: #FF6347; /* Change color to red */\n        font-size: 100px;\n        line-height: 200px;\n        margin-left: -15px;\n      }\n      .card {\n        background: white;\n        padding: 60px;\n        border-radius: 4px;\n        box-shadow: 0 2px 3px #C8D0D8;\n        display: inline-block;\n        margin: 0 auto;\n      }\n      .home-button {\n        background-color: #FF6347;\n        color: white;\n        font-size: 16px;\n        border: none;\n        border-radius: 4px;\n        padding: 10px 20px;\n        cursor: pointer;\n        transition: background-color 0.3s;\n      }\n      .home-button:hover {\n        background-color: #FF4500;\n      }\n    ',
          }}
        />
        <div className="card">
          <div
            style={{
              borderRadius: 200,
              height: 200,
              width: 200,
              background: '#F8FAF5',
              margin: '0 auto',
            }}
          >
            <i className="checkmark">❌</i> {/* Change checkmark to X */}
          </div>
          <h1>Failed</h1> {/* Change success message to failed */}
          <p>
            Your purchase request has failed;
            <br /> please try again later.
          </p>
          <Link to="/home">
            <button className="home-button mt-3">Back to Home</button>
          </Link>
        </div>
      </div>
    );

  }

  else{
    return (
      <div>
          <style
      dangerouslySetInnerHTML={{
        __html:
          '\n      body {\n        text-align: center;\n        padding: 40px 0;\n        background: #EBF0F5;\n      }\n        h1 {\n          color: #88B04B;\n          font-family: "Nunito Sans", "Helvetica Neue", sans-serif;\n          font-weight: 900;\n          font-size: 40px;\n          margin-bottom: 10px;\n        }\n        p {\n          color: #404F5E;\n          font-family: "Nunito Sans", "Helvetica Neue", sans-serif;\n          font-size:20px;\n          margin: 0;\n        }\n      i {\n        color: #9ABC66;\n        font-size: 100px;\n        line-height: 200px;\n        margin-left:-15px;\n      }\n      .card {\n        background: white;\n        padding: 60px;\n        border-radius: 4px;\n        box-shadow: 0 2px 3px #C8D0D8;\n        display: inline-block;\n        margin: 0 auto;\n      }\n   .home-button {\n        background-color: #00FF00;\n        color: white;\n        font-size: 16px;\n        border: none;\n        border-radius: 4px;\n        padding: 10px 20px;\n        cursor: pointer;\n        transition: background-color 0.3s;\n      }\n      .home-button:hover {\n        background-color: #00FF00;\n      }\n   '
      }}
    />
    <div className="card">
      <div
        style={{
          borderRadius: 200,
          height: 200,
          width: 200,
          background: "#F8FAF5",
          margin: "0 auto"
        }}
      >
        <i className="checkmark">✓</i>
      </div>
      <h1>Success</h1>
      <p>
        We received your purchase request;
        <br /> we'll be in touch shortly!
      </p>
      <Link to="/home">
            <button className="home-button mt-3">Back to Home</button>
          </Link>
    </div>
      </div>
    )

  }
  
}

export default End