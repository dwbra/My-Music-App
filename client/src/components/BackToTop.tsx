import React, { useState, useEffect } from "react";
import { FaAngleUp } from "react-icons/fa";

type Props = {};

const BackToTop = (props: Props) => {
  //set the state to false on initial load as we have not yet scrolled
  const [showTopBtn, setShowTopBtn] = useState(false);
  //using a useEffect hook, we can constantly listen for the scroll values and show the button when a user scrolls past 400px
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  //create onClick function to bring user to the top of the page
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <div className="back-to-top">
        {showTopBtn && (
          <FaAngleUp
            className="back-to-top__icon-position back-to-top__icon-style"
            onClick={goToTop}
          />
        )}
      </div>
    </>
  );
};

export default BackToTop;
