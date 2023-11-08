import React from "react";

import { defaul_BE_URL, defaul_IMG_SRC } from "../Ulti/DefaultConfig";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillGoogleSquare,
  AiFillInstagram,
  AiFillGithub,
  AiOutlineCopyrightCircle,
  AiFillHdd
} from "react-icons/ai";

import { MdOutlineLocationCity ,MdMail,MdPhone} from "react-icons/md";

import logo from "../Assets/WebImage/logo.png";

function Footer() {
  return (
    <div className="footer">
      <div className="top">
        <p>LIÊN HỆ</p>
        <div className="right">
          <AiFillFacebook className="logo" />
          <AiFillTwitterSquare className="logo" />
          <AiFillGoogleSquare className="logo" />
          <AiFillInstagram className="logo" />
          <AiFillGithub className="logo" />
        </div>
      </div>

      <div className="middle">
        <div className="col1">
          <div className="map">
          <img alt="footer_logo" className="banner" src={logo} />
          </div>
        </div>

        <div className="col2">
          <h2>THÔNG TIN</h2>
          <div className="map">
            <div className="row">
              <MdOutlineLocationCity className="icon" />
              <p>Landmark72, đường Phạm Hùng, quận Mễ Trì, Hà Nội</p>
            </div>
            <div className="row">
              <MdMail className="icon"/>
              <p>thainv25@fpt.com.vn</p>
            </div>
            <div className="row">
              <MdPhone className="icon"/>
              <p>+084 941 279 162</p>
            </div>
          </div>
        </div>

        <div className="col3">
          <h2>API</h2>
          <div className="map">
            <div className="row">
              <AiFillHdd className="icon"/>
              <p>BackEnd: {defaul_BE_URL}</p>
            </div>
            <div className="row">
              <AiFillHdd className="icon"/>
              <p>IMG Src: {defaul_IMG_SRC}</p>
            </div>
          </div>
        </div>

        <div className="col4">
          <h2>BẢN ĐỒ</h2>
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.362362987848!2d105.78199041485416!3d21.01818218600407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454ab43c0c4db%3A0xdb6effebd6991106!2sKeangnam%20Landmark%20Tower!5e0!3m2!1svi!2s!4v1679133644912!5m2!1svi!2s"
              width="100%"
              height="200"
              loading="lazy"
              title="map"
              className="frame"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="bottom">
        <AiOutlineCopyrightCircle className="copyright" />
        <p>2023 Copyright: thai27</p>
      </div>
    </div>
  );
}

export default Footer;
