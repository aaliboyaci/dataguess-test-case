import React, { useEffect, useState } from "react";

function ScrollToTopButton() {
  const [scrollButtonVisible, setScrollButtonVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 2000) {
        setScrollButtonVisible(true);
      } else {
        setScrollButtonVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {scrollButtonVisible && (
        <button
          className="goto-top-button"
          onClick={() => window.scroll({ top: 0, behavior: "smooth" })}
        >
          Go to top
        </button>
      )}
    </>
  );
}

export default ScrollToTopButton;
