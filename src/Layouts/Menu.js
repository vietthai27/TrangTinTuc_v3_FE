import React, { useEffect, useState } from "react";

import axios from "axios";

import { defaul_BE_URL } from "../Ulti/DefaultConfig";

import { AiOutlineUnorderedList } from "react-icons/ai";
import { Link } from "react-router-dom";
//import { DanhMucData } from "../MockData";

function Menu() {
  let loaiDanhSach = "menu";

  const [danhMucCha, setdanhMucCha] = useState([]);

  useEffect(() => {
    getAllDanhMuc();
  }, []);

  const getAllDanhMuc = async () => {
    let res = await axios.get(defaul_BE_URL + "/danhmuc/getAllDanhMuc");
    setdanhMucCha(res.data);
  };

  return (
    <div className="menu">
      <div className="menu_button">
        <AiOutlineUnorderedList />
      </div>

      <div className="menu_list">
        {danhMucCha.map((item) => (
          <div className="parent_box" key={item.id}>
            <p className="parent">{item.tenDanhMuc}</p>

            <div className="child_box">
              {item.danhMucCon.map((item) => (
                <div className="child_contain" key={item.id}>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/danhsach/${loaiDanhSach}/${item.id}`}
                  >
                    <p className="child">{item.tenDanhMucCon}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
