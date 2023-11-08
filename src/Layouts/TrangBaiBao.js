import React from "react";
import BaiBao from "../Components/BaiBao";
import DanhSach from "../Components/DanhSach";
import Weather from "../Components/Weather";

function TrangBaiBao({testArr}) {
  console.log(testArr);
  return (
    <div className="trangbaibao">
      <div className="left">
        <BaiBao />
      </div>
      <div className="right">
        <Weather/>
        <DanhSach loaiDanhSach="moinhat" />
        <DanhSach loaiDanhSach="noibat" />
        <DanhSach loaiDanhSach="yeuthich" />
      </div>
    </div>
  );
}

export default TrangBaiBao;
