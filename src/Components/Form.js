import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import { defaul_BE_URL } from "../Ulti/DefaultConfig";

function Form() {
  let subtitle;
  let { form } = useParams();
  let navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repass, setRepass] = useState('')
  const [email, setEmail] = useState('')
  const [resData, setResData] = useState([])
  const [modalIsOpen, setIsOpen] = useState(false);
  const [signUpmodalIsOpen, setsignUpIsOpen] = useState(false);
  const [resetPassmodalIsOpen, setresetPassIsOpen] = useState(false);
  const [codeValidate, setCodeValidate] = useState('')
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const validateSignup = async () => {
    if (codeValidate === null || codeValidate === "") {
      toast.warning("Mã xác thực không được để trống", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } else {
      userDetail.username = username
      userDetail.password = password
      userDetail.email = email
      let res = await axios.post(defaul_BE_URL + `/signupValidate?codeSignup=${codeValidate}`, userDetail)
      toast.success(res.data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      if (res.data === "Đăng ký tài khoản thành công") {
        closeModal()
      }
    }
  }

  const validateResetPass = async () => {
    if (codeValidate === null || codeValidate === "") {
      toast.warning("Mã xác thực không được để trống", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } else {
      let res = await axios.post(defaul_BE_URL + `/resetPassValidate?username=${username}&codeResetPass=${codeValidate}`)
      toast.success(res.data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      closeModal()
    }
  }

  const customStyles = {
    content: {
      borderRadius: '20px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  function openModal(type) {
    setIsOpen(true)
    if (type === 'signUp') {
      setsignUpIsOpen(true);
    } else setresetPassIsOpen(true)

  }


  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  let userDetail = {
    "username": "",
    "password": "",
    "email": ""
  }

  const forgetPass = async () => {
    if (username === null || username === '') {
      toast.warning('Tên người dùng không được để trống')
    } else {
      let res = await axios.post(defaul_BE_URL + `/resetPassRequest?username=${username}`)
      openModal('forgetPass')
      toast.success(res.data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }

  const signUp = async () => {
    if (username === null || username === '') {
      toast.warning('Tên người dùng không được để trống')
    } else if (password === null || password === '') {
      toast.warning('Mật khẩu không được để trống')
    } else if (repass === null || repass === '') {
      toast.warning('Nhập lại mật khẩu dùng không được để trống')
    } else if (email === null || email === '') {
      toast.warning('Email không được để trống')
    } else if (!email.match(validRegex)) {
      toast.warning('Email không đúng định dạng')
    }
    else if (password === repass) {
      userDetail.username = username
      userDetail.password = password
      userDetail.email = email
      let res = await axios.post(defaul_BE_URL + `/signupRequest`, userDetail)
      if (res.data === "Tên người dùng đã tồn tại !") {
        toast.warning(res.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      } else if (res.data === "Check mail !") {
        toast.success(res.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        openModal('signUp')
      }
    } else toast.warn("Mật khẩu không khớp !!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }

  const login = async () => {
    if (username === null || username === '') {
      toast.warning('Tên người dùng không được để trống')
    } else if (password === null || password === '') {
      toast.warning('Mật khẩu không được để trống')
    }
    else {
      userDetail.username = username
      userDetail.password = password
      userDetail.email = ''
      try {
        let res = await axios.post(defaul_BE_URL + `/login`, userDetail);
        if(res.data !==  null || res.data !== ''){
          {
            localStorage.setItem('token',res.data)
          }
        }
      } catch (err) {
        toast.warning(err.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
    }
  }

  const toSignUp = () => {
    navigate("/form/signup");
  };

  const toForgetPass = () => {
    navigate("/form/forgetpass");
  };
  return (
    <div className="forms">
      <div className="login">
        <div className="input">
          <h2 className="title">
            {form === "login"
              ? "Đăng nhập"
              : form === "signup"
                ? "Đăng ký"
                : "Quên mật khẩu"}
          </h2>
          <p className="text">Tên người dùng</p>
          <input onBlur={(e) => setUsername(e.target.value)} className="area" placeholder="&#128513; Nhập tên người dùng" />

        </div>
        {form === "login" || form === "signup" ? (<div>
          <div className="input">
            <p className="text">Mật khẩu</p>
            <input
              onBlur={(e) => setPassword(e.target.value)}
              className="area"
              type="password"
              placeholder="&#128274; Nhập mật khẩu"
            /></div>
        </div>) : null}

        {form === "login" ? (<div>
          <div className="input">
            <i className="text" onClick={() => { toForgetPass() }}>Quên mật khẩu ?</i>
          </div>
        </div>) : null}

        {form === "signup" ? (
          <div className="input">
            <p className="text">Xác nhận mật khẩu</p>
            <input
              className="area"
              onBlur={(e) => setRepass(e.target.value)}
              type="password"
              placeholder="&#128274; Nhập lại mật khẩu"
            />
            <p className="text">Email</p>
            <input
              className="area"
              onBlur={(e) => setEmail(e.target.value)}
              placeholder="&#128231; Nhập email"
            />
          </div>
        ) : null}
        <div style={{ "padding": "20px 0 30px 0" }}>

          {form === "login"
            ? <button className="button" onClick={() => login()}>Đăng nhập</button>
            : form === "signup"
              ? <button className="button" onClick={() => signUp()}>Đăng ký</button>
              : <button className="button" onClick={() => forgetPass()}>Gửi mail</button>}

        </div>
        {form === "login" ? (
          <div>
            <i>Chưa có tài khoản ?</i>
            <h3
              onClick={() => {
                toSignUp();
              }}
            >
              Đăng ký
            </h3>
          </div>
        ) : null}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal">
          <h2>Xác thực mail</h2>
          <input onBlur={(e) => { setCodeValidate(e.target.value) }} placeholder="Nhập mã xác thực" />
          {
            signUpmodalIsOpen === true
              ?
              (<button className="button" style={{ backgroundColor: "#77ccaa" }} onClick={() => { validateSignup() }}>Xác nhận đăng ký</button>)
              :
              (<button className="button" style={{ backgroundColor: "#77ccaa" }} onClick={() => { validateResetPass() }}>Xác nhận tài khoản</button>)
          }
          <button className="button" style={{ backgroundColor: "red" }} onClick={closeModal}>Đóng</button>
        </div>
      </Modal>
    </div>
  );
}

export default Form;
