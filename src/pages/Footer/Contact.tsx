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
      This website is a solo project, so I'd greatly appreciate your thoughts
      and feedback. <br /> Feel free to drop me an email with your suggestions
      at <a href="mailto:stefan01.dev@gmail.com">stefan01.dev@gmail.com</a>.
      <br />
      <br />
      Cheers,
      <br /> S
    </div>
  );
};

export default Contact;
