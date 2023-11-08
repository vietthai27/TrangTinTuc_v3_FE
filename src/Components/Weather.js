import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { weatherAPI } from "../Ulti/DefaultConfig";
import { HiArrowCircleUp, HiArrowCircleDown } from "react-icons/hi";
import { SiWindicss } from "react-icons/si";
import moment from "moment/moment";
import { Link } from "react-router-dom";

function Weather() {
  const [address, setaddress] = useState("");
  const [today, settoday] = useState({});
  const [next5day, setnext5day] = useState([]);
  

  useEffect(() => {
    getWeatherData();
  }, []);

  const getWeatherData = async () => {
    let res = await axios.get(weatherAPI);
    setaddress(res.data.resolvedAddress);
    settoday(res.data.days[0]);
    let weather = res.data.days;
    let next5DayArr = [];
    for (let i = 1; i < 6; i++) {
      next5DayArr.push({
        datetime: moment(weather[i].datetime).format('DD-MM'),
        tempmax: weather[i].tempmax,
        tempmin: weather[i].tempmin,
        temp: weather[i].temp,
        humidity: weather[i].humidity,
        windspeed: weather[i].windspeed,
        icon: weather[i].icon,
      });
    }
    setnext5day(next5DayArr);
  };



  return (
    <div className="weather" >
    <Link style={{"textDecoration": "none","color":"black"}} to = {"https://www.google.com/search?q=th%E1%BB%9Di+ti%E1%BA%BFt+m%E1%BB%85+tr%C3%AC+nam+t%E1%BB%AB+li%C3%AAm+h%C3%A0+n%E1%BB%99i&rlz=1C1CHBF_enVN1026VN1026&sxsrf=APwXEdePTAk4_WEsSdTcQa9dYW-kpSAFPQ%3A1684123757084&ei=bbBhZLPQBPG12roPw9i-6Ag&oq=th%E1%BB%9Di+ti%E1%BA%BFt+m%E1%BB%85+tr%C3%AC%2C+nam+t%E1%BB%AB+li%C3%AAm%2C+h%C3%A0+n%E1%BB%99i&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQARgAMgoIABCABBBGEIACOgoIABBHENYEELADOgYIABAHEB46CAgAEAgQBxAeOggIABAFEAcQHjoKCCEQoAEQwwQQCjoFCAAQogQ6CAgAEAgQHhANOgIIJjoHCAAQDRCABDoMCAAQDRCABBBGEIACSgQIQRgAUKEUWLY_YPBMaAdwAXgAgAF9iAG3EJIBBDEyLjmYAQCgAQHIAQi4AQPAAQE&sclient=gws-wiz-serp"}>
      <h2>{address}</h2>
      <div className="today">
        <table>
          <tbody>
            <tr>
              <th>{moment(today.datetime).format('DD-MM-YYYY')}</th>
              <th>
                {today.icon === "partly-cloudy-day" ? (
                  <img alt="icon"
                    className="icon"
                    src="https://cdn-icons-png.flaticon.com/512/2112/2112265.png"
                  />
                ) : today.icon === "rain" ? (
                  <img alt="icon"
                    className="icon"
                    src="https://cdn-icons-png.flaticon.com/512/2044/2044043.png"
                  />
                ) : null}
              </th>
              <th>
                {today.temp}
                <sup>o</sup>C
              </th>
            </tr>
            <tr>
              <td>
                <SiWindicss /> {today.windspeed} Km/h{" "}
              </td>
              <td>
                <HiArrowCircleDown style={{ color: "green" }} /> {today.tempmin}
                <sup>o</sup>C
              </td>
              <td>
                <HiArrowCircleUp style={{ color: "red" }} /> {today.tempmax}
                <sup>o</sup>C
              </td>
            </tr>
          </tbody>
        </table>
        <div className="fiveday">
          {next5day.map((item) => (
            <div className="box" key={item.id}>
              {item.icon === "partly-cloudy-day" || item.icon === "cloudy" ? (
                <img alt="icon"
                  className="icon"
                  src="https://cdn-icons-png.flaticon.com/512/2112/2112265.png"
                />
              ) : item.icon === "rain" ? (
                <img alt="icon"
                  className="icon"
                  src="https://cdn-icons-png.flaticon.com/512/2044/2044043.png"
                />
              ) : item.icon === "clear-day" ? (
                <img alt="icon"
                  className="icon"
                  src="https://cdn-icons-png.flaticon.com/512/6581/6581490.png"
                />
              ) : null}
              <p>
                {item.temp}
                <sup>o</sup>C
              </p>
              <p>{item.datetime}</p>
            </div>
          ))}
        </div>
      </div>
      </Link>
    </div>
  );
}

export default Weather;
