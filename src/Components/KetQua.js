import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { defaul_BE_URL } from "../Ulti/DefaultConfig";
import { defaul_IMG_SRC } from "../Ulti/DefaultConfig";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import moment from "moment/moment";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
function KetQua() {
  const [load, setLoad] = useState(true);
  let { searchKey } = useParams();
  let { loaiDanhSach } = useParams();
  const [searchData, setSearchData] = useState([]);
  const [searchContent, setSearchContent] = useState([]);
  const [currentPage, setcurrentPage] = useState(0);
  const [inputPage, setInputPage] = useState();
  let pageSize = 5;

  const getSearchData = async () => {
    
    if (loaiDanhSach === "search") {
      let res = await axios.get(
        defaul_BE_URL +
          `/baibao/pass/searchBaiBao?search=${searchKey}&pageNum=${currentPage}&pageSize=${pageSize}`
      );
      setSearchData(res.data);
      setSearchContent(res.data.content);
    } else {
      let res = await axios.get(
        defaul_BE_URL +
          `/baibao/pass/getBaiBaoByDanhMuc?id=${searchKey}&pageNum=${currentPage}&pageSize=${pageSize}`
      );
      setSearchData(res.data);
      setSearchContent(res.data.content);
    }
  };

  useEffect(() => {
    loading();
    getSearchData();
  }, [searchKey, currentPage]);

  const loading = () => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 1500);
  };

  const toPage = () => {
    if (inputPage > searchData.totalPages) {
      toast.warn("Trang nhập không tồn tại !!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if(parseInt(inputPage) === searchData.number + 1){
      toast.warn("Bạn đang ở trang này !!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else setcurrentPage(inputPage - 1)
  };

  return (
    <div className="result">
      {loaiDanhSach === "search" ? (
        <h2 className="title">Kết quả tìm kiếm: {searchKey}</h2>
      ) : (
        <h2 className="title">Danh mục</h2>
      )}

      {searchContent.length === 0 ? (
        <div className="notfound">
          <img src="https://i.giphy.com/media/8L0Pky6C83SzkzU55a/giphy.webp" />
          <h1>Không có dữ liệu !!!</h1>
        </div>
      ) : (
        <div>
          {searchContent.map((item) => (
            <div className="box" key={item.id}>
              <Link
                style={{ textDecoration: "none", color: "black" }}
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
                      <th colSpan={5}>
                        <p>{item.tenBaiBao.toUpperCase()}</p>
                      </th>
                    </tr>
                    <tr>
                      <td>
                        <b>Ngày đăng:</b>{" "}
                        {moment(item.ngayDang).format("DD-MM-YYYY")}
                      </td>
                      <td>
                        <b>Tác giả:</b> {item.tacGia}
                      </td>
                      <td className="social">
                        <b>Lượt xem:</b> {item.luotXem}
                      </td>
                      <td className="social">
                        <b>Lượt thích:</b> {item.luotThich}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Link>
            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div className="contain">
              <p className="info">Trang hiện tại:</p>
              <b className="number">{searchData.number + 1}</b>
            </div>
            <div className="contain">
              <p className="info">Tổng số trang:</p>
              <b className="number">{searchData.totalPages}</b>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              margin: "40px 00px",
            }}
          >
            {searchData.first === true ? (
              <button
                style={{ display: "flex" }}
                disabled={true}
                className="button"
                onClick={() => {
                  setcurrentPage(currentPage - 1);
                }}
              >
                <AiFillStepBackward className="icon" />
                <p>Trang trước</p>
              </button>
            ) : (
              <button
                style={{ display: "flex" }}
                className="button"
                onClick={() => {
                  setcurrentPage(currentPage - 1);
                }}
              >
                <AiFillStepBackward className="icon" />
                <p>Trang trước</p>
              </button>
            )}
            <div style={{ display: "flex" }}>
              <p className="text">Trang:</p>
              <input
                onBlur={(e) => {
                  setInputPage(e.target.value);
                }}
              />
              <button
                className="button"
                onClick={() => {
                  toPage();
                }}
              >
                Đi tới
              </button>
            </div>
            {searchData.last === true ? (
              <button
                style={{ display: "flex" }}
                disabled={true}
                className="button"
                onClick={() => {
                  setcurrentPage(currentPage + 1);
                }}
              >
                <p>Trang sau</p>
                <AiFillStepForward className="icon" />
              </button>
            ) : (
              <button
                style={{ display: "flex" }}
                className="button"
                onClick={() => {
                  setcurrentPage(currentPage + 1);
                }}
              >
                <p>Trang sau</p>
                <AiFillStepForward className="icon" />
              </button>
            )}
          </div>
        </div>
      )}

      {load === true && (
        <div className="loaderbox">
          <span className="loader"></span>
        </div>
      )}
    </div>
  );
}

export default KetQua;
