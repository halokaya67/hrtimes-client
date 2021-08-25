import React from "react";
import "./GoTopButton.css";

function GoTopButton(props) {
  const { showGoTop, scrollUp } = props;

  return (
    <div className={showGoTop} onClick={scrollUp}>
      <button className="goTop">
        <i className="goTopText fas fa-chevron-up" />
      </button>
    </div>
  );
}

export default GoTopButton;
