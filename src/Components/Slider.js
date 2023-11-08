import React from "react";
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { defaul_BE_URL, defaul_IMG_SRC } from "../Ulti/DefaultConfig";
import { useNavigate } from 'react-router-dom';

function Slider() {
  const [dataSlider, setDataSlider] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    getBaiBao();
  }, []);

  const getBaiBao = async () => {
    let res = await axios.get(defaul_BE_URL + "/baibao/pass/moinhat");
    setDataSlider(res.data);
  };

  const toBaiBao = (id) => {
    console.log("___"+id);
    navigate(`/baibao/${id}`)
  }
  return (
    <div className="slider">
       <Fade>
        {dataSlider.map((fadeImage) => (
          <div key={fadeImage.id} >
            <img onClick={()=>toBaiBao(fadeImage.id)} style={{ width: '100%' }} src={defaul_IMG_SRC + fadeImage.anhThuNho} />
            <h2>{fadeImage.tenBaiBao}</h2>
          </div>
        ))}
      </Fade>
    </div>
  );
}

export default Slider;
