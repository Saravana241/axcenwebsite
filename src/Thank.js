// ThankYou.js
import React from "react";
import { Link } from "react-router-dom";

import "./Thank.css";

const ThankYou = () => {
  return (
    <div>
      <div className="thankyou">
        <div className="thanktick"></div>
        <h2 className="thankyoumessage">
          Thank You <br />
          for contacting us!
        </h2>
        <p className="thanktext">
          We will reach out to you shortly to discuss <br />
          the details of your project
        </p>{" "}
        <Link to="/" className="thank-home">
          Continue to Home
        </Link>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default ThankYou;
