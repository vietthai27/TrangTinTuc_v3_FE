import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { premierLeaugeAPI } from "../Ulti/DefaultConfig";
import { Link } from "react-router-dom";

function PremierLeauge() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let res = await axios.get(premierLeaugeAPI);
    setTableData(res.data.table);
  };

  let formArray = [];
  for (let i = 0; i < tableData.length; i++) {
    formArray.push(tableData[i].strForm.split(""));
  }
  return (
    <div style={{ height: "500px" }}>
    <Link to={"https://www.google.com/search?q=premier+league+table&rlz=1C1CHBF_enVN1026VN1026&sxsrf=APwXEddutGIb9jGZ2TC8SczC3ymCtyJxsg%3A1684124083469&ei=s7FhZNujHIeM2roP3LStmAU&oq=premier+league+ta&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAxgAMggIABCABBDLATIICAAQgAQQywEyCAgAEIAEEMsBMggIABCABBDLATIICAAQgAQQywEyCAgAEIAEEMsBMggIABCABBDLATIICAAQgAQQywEyCAgAEIAEEMsBMggIABCABBDLAToHCCMQsAMQJzoKCAAQRxDWBBCwAzoKCAAQigUQsAMQQzoPCC4QigUQyAMQsAMQQxgBOgcIIxCKBRAnOgsIABCABBCxAxCDAToLCC4QgAQQsQMQgwE6BQgAEIAEOggILhCABBDLAUoECEEYAFDiBVjHC2DoF2gBcAF4AIABYogBjQKSAQEzmAEAoAEByAEUuAEDwAEB2gEGCAEQARgI&sclient=gws-wiz-serp"}>
      <div className="premier">
        <img
          className="title"
          alt="logo"
          src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/800px-Premier_League_Logo.svg.png"
        />
        <div className="table">
          <table className="left">
            <thead>
              <tr>
                <th className="head">XH</th>
                <th className="head" colSpan={2}>
                  Đội bóng
                </th>
                <th className="head">Đã đấu</th>
                <th className="head">Thắng</th>
                <th className="head">Hòa</th>
                <th className="head">Thua</th>
                <th className="head">Điểm</th>
                <th className="head">Hiệu số</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr>
                  <td className="row">
                    <p>{item.intRank}</p>
                  </td>
                  <td className="row">
                    <p>{item.strTeam}</p>
                  </td>
                  <td className="row">
                    <img className="logo" alt="logo" src={item.strTeamBadge} />
                  </td>
                  <td className="row">
                    <p>{item.intPlayed}</p>
                  </td>
                  <td className="row">
                    <p>{item.intWin}</p>
                  </td>
                  <td className="row">
                    <p>{item.intDraw}</p>
                  </td>
                  <td className="row">
                    <p>{item.intLoss}</p>
                  </td>
                  <td className="row">
                    <p>{item.intPoints}</p>
                  </td>
                  <td className="row">
                    <p>{item.intGoalDifference}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="right">
            <thead>
              <tr>
                <th className="head">5 Trận gần nhất</th>
              </tr>
            </thead>
            <tbody>
              {formArray.map((item, i) => (
                <tr>
                  <td key={i} className="row">
                    <p style={{ display: "flex" }}>
                      {item.map((item) =>
                        item[0] === "W" ? (
                          <p
                            className="form"
                            style={{ backgroundColor: "green" }}
                          >
                            T
                          </p>
                        ) : item[0] === "D" ? (
                          <p
                            className="form"
                            style={{ backgroundColor: "yellow" }}
                          >
                            H
                          </p>
                        ) : (
                          <p
                            className="form"
                            style={{ backgroundColor: "red" }}
                          >
                            B
                          </p>
                        )
                      )}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </Link>
    </div>
  );
}

export default PremierLeauge;
