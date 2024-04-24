import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./CoffeeAnimation.scss"; // Import SCSS file for styling

const CoffeeAnimation: React.FC = () => {
  const roast: string[] = ["Light", "Medium", "Dark"];
  const origins: string[] = [
    "Brazila",
    "Colombia",
    "Ethiopia",
    "Guatemala",
    "Kenya",
    "Honduras",
    "Mexico",
    "Panama",
    "El Salvador",
  ];
  const [roastIndex, setRoastIndex] = useState<number>(0);
  const [originIndex, setOriginIndex] = useState<number>(0);

  // Define spring animation for the scrolling text
  const roastProps = useSpring({
    from: { opacity: 0, transform: "translateY(-50%)" },
    to: { opacity: 1, transform: "translateY(0%)" },
    config: { tension: 70, friction: 20 },
    reset: true,
  });

  const originProps = useSpring({
    from: { opacity: 0, transform: "translateY(+50%)" },
    to: { opacity: 1, transform: "translateY(0%)" },
    config: { tension: 70, friction: 20 },
    reset: true,
  });

  useEffect(() => {
    const roastInterval = setInterval(() => {
      setRoastIndex((prevIndex) => (prevIndex + 1) % roast.length);
    }, 4000);
    // }, 49000);

    const originInterval = setInterval(() => {
      // setOriginIndex(Math.floor(Math.random() * origins.length));
      setOriginIndex((prevIndex) => (prevIndex + 1) % origins.length);
    }, 4000);
    // }, 49000);

    return () => {
      clearInterval(roastInterval);
      clearInterval(originInterval);
    };
  }, []); // Run once on component mount

  const getBackgroundColor = (roast: string) => {
    switch (roast) {
      case "Light":
        return "#DE9B21"; // Light background color
      case "Medium":
        return "#A34920"; // Medium background color
      case "Dark":
        return "#401400"; // Dark background color
      default:
        return "transparent";
    }
  };

  return (
    <div className="coffee-container">
      <p className="title">Find your next coffee</p>
      <div className="animated-row">
        <animated.div
          className="revolving-text"
          style={{
            ...roastProps,
            backgroundColor: getBackgroundColor(roast[roastIndex]),
            color: "#FFFFFF", // White font color
            fontSize: "2rem",
            fontWeight: "bold",
            borderRadius: "15px",
          }}
        >
          {roast[roastIndex]}
        </animated.div>

        <animated.div
          className="revolving-text"
          style={{
            ...originProps,
            backgroundColor: "#FFFFFF", // White background color for origin
            color: "#1F3933", // Black font color for origin
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          {origins[originIndex]}
        </animated.div>
      </div>
    </div>
  );
};

export default CoffeeAnimation;
