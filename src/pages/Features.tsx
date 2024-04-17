import React from "react";
import Button from "@mui/material/Button";

type Props = {};

const Features = (props: Props) => {
  return (
    <div>
      <h2>More about this project</h2>

      <div>
        <p>
          ☕️ After months of hard work, I'm happy to introduce you to{" "}
          <a href="http://www.baristretto.com">www.baristretto.com</a> - your
          go-to destination for coffee reviews and more!
        </p>
        <p>
          ❓ The site is currently in a Minimum Viable Product phase and I need
          your opinion. Is it worth pursuing further? Would you use it, or
          should I consider abandoning it if it doesn’t provide any benefit?
        </p>
        <p>
          📥 You can send me your thoughts at{" "}
          <a href="mailto:stefan01.dev@gmail.com">stefan01.dev@gmail.com</a>
        </p>
        <p>🧭 Explore coffee information and reviews at Baristretto.</p>
        <p>
          🚀 But it’s just getting started! In the future, I’m planning to
          include café locations and many more features, all shaped by your
          feedback.
        </p>
        <p>
          📨 Sign up now (it takes less than 1 minute, I promise) to be the
          first to know when we officially launch. Your opinion matters, so
          please share your thoughts and let's make Baristretto the ultimate
          coffee community together.
        </p>
        <p>Cheers, Stefan</p>
      </div>

      <Button
        variant="contained"
        onClick={() => {
          window.location.href = "mailto:yourmail@domain.com";
        }}
      >
        Contact Me
      </Button>
    </div>
  );
};

export default Features;
