import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

type Props = {};

const CoffeeFarms = (props: Props) => {
  const [text, setText] = React.useState<string | null>("");

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
      console.log("data", data?.data[0].description);
      setText(data?.data[0].description);
      // setData(data.data);
    } catch (err: any) {
    } finally {
      // setLoading(false);
      // dispatch(notLoading());
    }
  };

  useEffect(() => {
    // console.log("slug", name);
    fetchFarmData();
  }, [name]);

  return (
    <div>
      <h1>Roasteries & Farms</h1>
      <h2>For future implementation</h2>
      <div style={{ color: "green" }}>{text}</div>
    </div>
  );
};

export default CoffeeFarms;
