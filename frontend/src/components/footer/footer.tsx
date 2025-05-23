//import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 60,
        }}
      >
        <p style={{ fontSize: "30px", textAlign: "center", padding: "20px" }}>
          Connect With me  by
          <span>
            <Link
              style={{ color: "rgb(173, 216, 230)" }}
              className="nav-link"
              to={"https://www.linkedin.com/in/gnaneswar-arnepalli/"}
            >
               one Click
            </Link>
          </span>
           👈
        </p>
      </div>
    </footer>
  );
};

export default Footer;