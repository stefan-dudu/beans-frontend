import React, { useEffect } from "react";

type Props = {};

const NextFeatures = (props: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const textDecorationStyle = {
    textDecoration: "line-through",
  };
  return (
    <div style={{ padding: "2rem" }}>
      <div>List of next features: </div>
      <ul>
        <li>Improve maps page to highlight the coffee farms feature</li>
        <li>Page with coffee farms</li>
        <li>
          Not only add rating to a coffee but also add rating for: Body,
          Acidity, Sweetness
        </li>
        <li style={textDecorationStyle}>Footer</li>
        <li style={textDecorationStyle}>
          User can add addition information when creating a new coffee if it's
          origin is known
        </li>
      </ul>
    </div>
  );
};

export default NextFeatures;
