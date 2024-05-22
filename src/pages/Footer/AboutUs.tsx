import React, { useEffect } from "react";

type Props = {};

const AboutUs = (props: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={{ padding: "2rem" }}>
      It all started when a good friend of mine had a great coffee at a
      specialty coffee shop but couldn't recall the type of coffee he had.
      Around that time, I was reading a book about the journey of a well-known
      coffee company, and everything started to click. The more I read, the more
      hints and ideas flooded my mind. You know that feeling when you're at the
      supermarket, standing in front of the coffee shelves, unsure of what to
      choose? So many choices. You think, "I liked that one last time... Hmm,
      have I tried this one?". That was me.
      <br />
      <br />
      It would be great to have an archive of the coffees I've tried, noting
      what I liked and saving some for later. Imagine being able to check
      information about each coffee, like flavor notes and roast levels. But
      what about specialty coffee? Is it possible to know the origins of the
      coffee I'm having? Information about the farm location, the farmer, and
      their practices? That would make the experience even richer and more
      meaningful.
      <br />
      <br />
      And here I am, a solo developer, working on my side project next to a cup
      of coffee, writing this.
    </div>
  );
};

export default AboutUs;
