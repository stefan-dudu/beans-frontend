import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import he from "he";
import "./CoffeeFarms.scss";

type Props = {};

const CoffeeFarms = (props: Props) => {
  const [text, setText] = useState<string | null>("");
  const [sanitizedHtml, setSanitizedHtml] = useState<string>("");

  let { name } = useParams();

  const fetchFarmData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/farms/${name}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          // TODO: ESSENTIAL FOR jwt
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }
      const { data } = await response.json();
      // console.log("data", data?.data[0].description);
      setText(data?.data[0].description);
    } catch (err: any) {
      console.error("Error fetching farm data:", err);
    } finally {
      // setLoading(false);
      // dispatch(notLoading());
    }
  };

  useEffect(() => {
    fetchFarmData();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    if (text) {
      const decodedHtml = he.decode(text);
      const sanitizedString = DOMPurify.sanitize(decodedHtml);
      setSanitizedHtml(sanitizedString);
    }
  }, [text]);

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        className="article-content"
      />
    </div>
  );
};

export default CoffeeFarms;
