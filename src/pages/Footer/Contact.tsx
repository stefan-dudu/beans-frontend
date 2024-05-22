import React, { useEffect } from "react";

type Props = {};

const Contact = (props: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      Hey, <br />
      The project is just getting started, so please let me know what you think
      about it. <br />
      Drop a mail with your feedback at{" "}
      <a href="mailto:stefan01.dev@gmail.com">stefan01.dev@gmail.com</a>.
      <br />
      <br />
      Cheers,
      <br /> S
    </div>
  );
};

export default Contact;
