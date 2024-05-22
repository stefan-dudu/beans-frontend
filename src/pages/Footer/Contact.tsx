import { useEffect } from "react";

type Props = {};

const Contact = (props: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      Hey there, <br />
      <br />
      This project is a solo project, so I'd really appreciate your thoughts and
      feedback on it.
      <br /> Feel free to drop me an email with your thoughts at{" "}
      <a href="mailto:stefan01.dev@gmail.com">stefan01.dev@gmail.com</a>.
      <br />
      <br />
      Cheers,
      <br /> S
    </div>
  );
};

export default Contact;
