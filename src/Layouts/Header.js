import logo from "../Assets/WebImage/logo.png";

import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import { defaul_BE_URL } from "../Ulti/DefaultConfig";

function Header() {
  let loaiDanhSach = "search";
  let navigate = useNavigate();
  const [username, setUsername] = useState("")
  let token = localStorage.getItem("token")
  const [searchKey, setSearchKey] = useState("");

  const checkLoginState = async () => {
    let res = await axios.post(defaul_BE_URL + `/getUsernameByToken?token=${token}`, null, {
      'headers': {
        'Authorization': 'Bearer ' + token
      }
    })
    setUsername(res.data)

   
  }


  useEffect(() => {
    checkLoginState()
  }, [])

  const toHome = () => {
    navigate("/");
  };

  const now = new Date();
  const day =
    now.getDay() === 1
      ? "Thứ Hai"
      : now.getDay() === 2
        ? "Thứ Ba"
        : now.getDay() === 3
          ? "Thứ Tư"
          : now.getDay() === 4
            ? "Thứ Năm"
            : now.getDay() === 5
              ? "Thứ Sáu"
              : now.getDay() === 6
                ? "Thứ Bảy"
                : "Chủ Nhật";

  const month =
    now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
  const year = now.getFullYear();
  const date = now.getDate();

  const toSearch = () => {
    if (searchKey === null || searchKey === "") {
      toast.warn("Chưa nhập từ khóa !!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else navigate(`/danhsach/${loaiDanhSach}/${searchKey}`);
  };

  const toLogin = () => {
    navigate("/form/login")
  }

  return (
    <div className="header">
      <div className="left">
        <img onClick={toHome} alt="header_logo" className="logo" src={logo} />
        <h3>
          {" "}
          {day}, {date}-{month}-{year}
        </h3>
      </div>

      <div className="right">
        <div className="search">
          <input
            placeholder="Nhập tìm kiếm ..."
            onBlur={(e) => setSearchKey(e.target.value)}
          />
          <div className="box" onClick={toSearch}>
            <AiOutlineSearch className="button" />
          </div>
        </div>
        <div className="login">

          {username === null || username === '' ?
            (<div><p>Đăng nhập</p><AiOutlineUser className="button" onClick={() => { toLogin() }} /></div>)
            :
            (<div><p>Xin chào {username}</p><AiOutlineUser className="button" /><p>Đăng xuất</p></div>)}


        </div>
      </div>
    </div>
  );
}

export default Header;
