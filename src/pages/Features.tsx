import React from "react";
import Button from "@mui/material/Button";
import "./Features.scss";

type Props = {};

const Features = (props: Props) => {
  return (
    <div className="featuresWrapper">
      <h2>More about this project</h2>
      <div style={{ color: "#006241" }}>
        <p>Your go-to destination for coffee reviews and more!</p>
        <p>
          The site is currently in a Minimum Viable Product phase and I need
          your opinion. Is it worth pursuing further? Would you use it, or
          should I consider abandoning it if it doesn’t provide any benefit?❓
        </p>
        <p>
          Please send me your thoughts at{" "}
          <a href="mailto:stefan01.dev@gmail.com">stefan01.dev@gmail.com</a> 📥
        </p>
        <p>
          But it’s just getting started! In the future, I’m planning to include
          café locations and many more features, all shaped by your feedback. 🚀
        </p>

        <p>Cheers, Stefan</p>
      </div>
      {/* 
      <Button
        variant="contained"
        onClick={() => {
          window.location.href = "mailto:yourmail@domain.com";
        }}
      >
        Contact Me
      </Button> */}
    </div>
  );
};

export default Features;
