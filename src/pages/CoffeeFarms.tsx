import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import he from "he"; // Import he library to decode HTML entities

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
      <h1>Roasteries & Farms</h1>
      <h2>For future implementation</h2>
      <div
        style={{ color: "green" }}
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    </div>
  );
};

export default CoffeeFarms;
