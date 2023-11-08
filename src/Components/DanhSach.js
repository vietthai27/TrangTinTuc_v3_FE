import React, { useEffect, useState } from "react";
import axios from "axios";
import { defaul_BE_URL } from "../Ulti/DefaultConfig";
import { defaul_IMG_SRC } from "../Ulti/DefaultConfig";
import { Link } from "react-router-dom";
import moment from "moment/moment";

function DanhSach({ loaiDanhSach }) {
  const [loadDanhSach, setloadDanhSach] = useState([]);

  useEffect(() => {
    getDanhSach();
  }, []);

  const getDanhSach = async () => {
    let res = await axios.get("http://10.15.68.227:8080/api/lv/getLevelMenu?p_id=0");
    console.log(res.data);
    setloadDanhSach(res.data);
  };
  return (
    <div className="danhsach">
      {loaiDanhSach === "moinhat" ? (
        <h2>MỚI NHẤT</h2>
      ) : loaiDanhSach === "noibat" ? (
        <h2>NỔI BẬT</h2>
      ) : loaiDanhSach === "yeuthich" ? (
        <h2>YÊU THÍCH</h2>
      ) : (
        <h2>NULL</h2>
      )}

      {loadDanhSach.map((item) => (
        <div className="box" key={item.id}>
          <Link
            style={{ textDecoration: "none", color:"black" }}
            to={`/baibao/${item.id}`}
            onClick={(window.history.scrollRestoration = "manual")}
          >
            <table>
              <tbody>
                <tr>
                  <th rowSpan={2}>
                    <img
                      alt="content_img"
                      src={defaul_IMG_SRC + item.anhThuNho}
                    />
                  </th>
                  <th colSpan={3} className="title">
                    <p>{item.tenBaiBao}</p>
                  </th>
                </tr>
                <tr>
                  {loaiDanhSach === "moinhat" ? (
                    <td className="info">
                      <b>Ngày đăng:</b> {moment(item.ngayDang).format('DD-MM-YYYY')}
                    </td>
                  ) : loaiDanhSach === "noibat" ? (
                    <td className="info">
                      <b>Lượt xem:</b> {item.luotXem}
                    </td>
                  ) : loaiDanhSach === "yeuthich" ? (
                    <td className="info"><b>Lượt thích:</b> {item.luotThich}</td>
                  ) : (
                    <td>Null</td>
                  )}
                  <td>
                  <b>Tác giả:</b> {item.tacGia}
                  </td>
                </tr>
              </tbody>
            </table>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default DanhSach;
