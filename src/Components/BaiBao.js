import React, { useEffect, useState } from "react";
import axios from "axios";
import { defaul_BE_URL } from "../Ulti/DefaultConfig";

import { defaul_IMG_SRC } from "../Ulti/DefaultConfig";
import ReactAudioPlayer from "react-audio-player";
import { AiFillLike, AiFillEye, AiOutlineUser } from "react-icons/ai";
import { useParams } from "react-router-dom";
//import { BaiBaoData, NoiDungData, TuKhoaData } from "../../MockData";

function BaiBao() {
  const [loadBaiBao, setloadBaiBao] = useState([]);
  const [loadNoiDung, setloadNoiDung] = useState([]);
  const [loadTuKhoa, setloadTuKhoa] = useState([]);
  const [likes , setLikes] = useState(0)
  const [likeState, setLikeState] = useState(false)
  let { id } = useParams();

  useEffect(() => {
    getBaiBaoLikes(id)
    getBaiBao(id);
  }, [id]);

  const getBaiBao = async (id) => {
    let res = await axios.get(defaul_BE_URL + `/baibao/pass/+${id}`);
    setloadBaiBao(res.data);
    setloadNoiDung(res.data.noiDungBaiBao);
    setloadTuKhoa(res.data.tuKhoaBaiBao);
  };

  const getBaiBaoLikes = async (id) => {
    let res = await axios.get(defaul_BE_URL + `/baibao/pass/getBaiBaoLikes?id=${id}`) 
    setLikes(res.data)
  }


  return (
    <div className="baibao">
      <p className="date">Ngày đăng: {loadBaiBao.ngayDang}</p>

      <h1 className="title">{loadBaiBao.tenBaiBao}</h1>

      <div className="social">
        <table className="author">
          <tbody>
            <tr>
              <th rowSpan={2}>
                <AiOutlineUser className="profile" />
              </th>
              <th>
                <p>{loadBaiBao.tacGia}</p>
              </th>
            </tr>
            <tr>
              <td>
                <i>Nhà báo</i>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="interact">
          <AiFillEye className="icon" />
          <p>{loadBaiBao.luotXem}</p>
          <AiFillLike className="icon" />
          <p>{likes}</p>
        </div>
      </div>

      <b className="headline">{loadBaiBao.tieuDe}</b>

      <ReactAudioPlayer
        className="audio"
        src={defaul_IMG_SRC + loadBaiBao.baoNoi}
        autoPlay
        controls
      />

      <div className="content">
        {loadNoiDung.map((item) => (
          <div key={item.id} className="content_p">
            <p>{item.ndBaiBao}</p>
            <img alt="content_img" src={defaul_IMG_SRC + item.anhNdBaiBao} />
            <b>{item.tieuDeAnhNoiDungBaiBao}</b>
          </div>
        ))}
      </div>

      <div className="keyword">
        <p>Từ khóa</p>
        {loadTuKhoa.map((item) => (
          <div key={item.id} className="box">
            <i>{item.tenTuKhoa}</i>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BaiBao;
