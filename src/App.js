import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./Layouts/Header";

import "./Assets/Style/Style.css";
import Menu from "./Layouts/Menu";
import Footer from "./Layouts/Footer";
import TrangBaiBao from "./Layouts/TrangBaiBao";
import { useEffect, useState } from "react";
import TrangChu from "./Layouts/TrangChu";
import TrangKetQua from "./Layouts/TrangKetQua";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "./Components/Form";
import axios from "axios";
function App() {

  const [load, setLoad] = useState(true);
  useEffect(() => { 
  getDanhSach();
    loading();
    //window.history.scrollRestoration = "manual";
  }, []);

  const getDanhSach = async () => {
    let res = await axios.get("http://10.15.68.227:8080/api/lv/getLevelMenu?p_id=0");
    console.log(res.data);
  };


  const loading = () => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 1500);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Menu />
        <Routes>
          <Route path="/" element={<TrangChu />} />
        </Routes>
        <Routes>
          <Route
            path="/baibao/:id"
            element={<TrangBaiBao  />}
          />
        </Routes>
        <Routes>
          <Route
            path="/form/:form"
            element={<Form />}
          />
        </Routes>
        <Routes>
          <Route
            path="/danhsach/:loaiDanhSach/:searchKey"
            element={<TrangKetQua />}
          />
        </Routes>
        <Footer />
      </div>
      <ToastContainer />
      {load === true && (
        <div className="loaderbox">
          <span className="loader"></span>
        </div>
      )}
    </Router>
  );
}

export default App;
