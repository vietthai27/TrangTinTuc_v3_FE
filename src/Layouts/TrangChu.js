import React from "react";
import Slider from "../Components/Slider";
import Weather from "../Components/Weather";
import PremierLeauge from "../Components/PremierLeauge";
import DanhSachach from "../Components/DanhSach";



function TrangChu() {
  
  return (
    <div className="home">
      <div className="row1">
        <div className="slider_box">
          <h2 className="title">Mới nhất</h2>
          <Slider className="slider" />
        </div>
        <div className="weather_box">
          <h2 className="title">Thời tiết</h2>
          <Weather className="weather" />
        </div>
      </div>
      <div className="row2">
        <PremierLeauge />
        <div className="list">
          <DanhSachach loaiDanhSach="noibat" />
          <DanhSachach loaiDanhSach="yeuthich" />
        </div>
      </div>
    </div>
  );
}

export default TrangChu;
