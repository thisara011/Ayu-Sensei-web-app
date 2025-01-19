import React from "react";
import "./index.css"; // Create this CSS file for styles.

const ButtonHomeCards = ({ title, href }) => {
  return (

      <a id="homecardbtn" href={href} >
        {title}
      </a>

  );
};

export default ButtonHomeCards;
