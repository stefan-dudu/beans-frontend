import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { CoffeeLocationType } from "../types/Location";
import "./CountryPage.scss";
import CountryMap from "../components/map/CountryMap";
import {
  findFlagUrlByIso3Code,
  findFlagUrlByCountryName,
} from "country-flags-svg-v2";

type Props = {};

const CountryPage = (props: Props) => {
  let { isoCode } = useParams();
  const location = useLocation();

  const [data, setData] = useState<CoffeeLocationType | null>(null);
  const [coord, setCoord] = useState<[number, number]>([90, 90]);

  const fetchLoactionData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}api/v1/locations/${isoCode}`,
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
      setData(data.data);
    } catch (err: any) {
      console.error("Error fetching farm data:", err);
    } finally {
    }
  };

  useEffect(() => {
    fetchLoactionData();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setCoord([location?.state?.coord?.lng, location?.state?.coord?.lat]);
  }, [isoCode]);

  const KeyFacts = () => {
    return (
      <div className="key-facts">
        <div className="facts-row">
          <div className="prop">World market percentage:</div>
          <div className="big-value"> &nbsp;{data?.worldShare}%</div>
        </div>
        <div className="facts-row">
          <div className="prop">Processes:</div>
          <div className="regular-value"> &nbsp; {data?.processing}</div>
        </div>
        <div className="facts-row">
          <div className="prop">Main types:</div>
          <div className="regular-value">&nbsp; {data?.mainTypes}</div>
        </div>

        {data?.harvest && (
          <div className="facts-row">
            <div className="prop">Harvest:</div>
            <div className="big-value"> &nbsp; {data?.harvest}</div>
          </div>
        )}
        <div className="facts-row">
          <div className="prop">Altitude:</div>
          <div className="regular-value"> &nbsp; {data?.altitude}</div>
        </div>
      </div>
    );
  };

  const Article = () => {
    return (
      <div className="article-wrapper">
        <div className="upper-part">
          <div className="left">
            <div className="title">
              <h1>{data?.name}</h1>
              {data?.name && findFlagUrlByIso3Code(data?.name) && (
                <img
                  src={findFlagUrlByIso3Code(data?.name)}
                  style={{
                    width: "44px",
                    height: "auto",
                    objectFit: "contain",
                  }}
                  className="origin-flag"
                  alt={`Is representative for ${data?.name}`}
                  title={`Image representative for ${data?.name}`}
                />
              )}
            </div>
            <div>{data?.subtitle}</div>
          </div>
          <img
            src={data?.image}
            style={{ width: "200px", height: "auto", objectFit: "contain" }}
            className="article-image"
            alt={`Is representative for ${data?.name}`}
            title={`Image representative for ${data?.name}`}
          />
        </div>
        <KeyFacts />
        <CountryMap isoCode={data?.name} coord={coord} />
        <div className="description">{data?.description}</div>
      </div>
    );
  };

  return (
    <div className="article-parent">
      <Article />
    </div>
  );
};

export default CountryPage;
