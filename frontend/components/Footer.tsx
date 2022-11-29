import React from "react";
import { BsCheck } from "react-icons/bs";
import { m } from "framer-motion";

import image from "../assets/index";

const Footer = () => {
  return (
    <m.footer
      whileInView={{ opacity: [0, 1], y: [100, 0] }}
      transition={{ duration: 0.4, delayChildren: 0.3 }}
    >
      <div className="grid grid-cols-2 place-items-center gap-[5rem] md:gap-0 md:flex md:items-center md:justify-between w-full bg-background-brown-3 px-[8rem] md:px-[16.5rem] pt-[8rem] pb-[10rem]">
        <div className="flex flex-col items-start justify-between gap-[1.5rem] h-full">
          <img className="w-[13rem] h-[7rem]" src={image.logo_2} alt="" />

          <p className="text-[1.5rem] text-text-3">
            生態友善食物商店
            <br />
            蹦蹦時光糖果屋有限公司
          </p>

          <p className="text-[1.5rem] text-text-2">2022 © All right reserved</p>
        </div>

        <div className="flex flex-col justify-start h-full">
          <a className="mb-[3rem] text-[1.6rem] font-bold text-text-3" href="#">
            公司
          </a>

          <ul className="flex flex-col gap-[1.5rem] text-[1.5rem] text-text-2">
            <li>
              <a href="#">關於我們</a>
            </li>
            <li>
              <a href="#">商店</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col justify-start h-full">
          <a className="mb-[3rem] text-[1.6rem] font-bold text-text-3" href="#">
            服務
          </a>

          <ul className="flex flex-col gap-[1.5rem] text-[1.5rem] text-text-2">
            <li>
              <a href="#">配送</a>
            </li>
            <li>
              <a href="#">支付</a>
            </li>
            <li>
              <a href="#">聯絡我們</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col justify-start h-full">
          <a className="mb-[3rem] text-[1.6rem] font-bold text-text-3" href="#">
            追蹤我們
          </a>

          <ul className="flex flex-col gap-[1.5rem] text-[1.5rem] text-text-2">
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col justify-start gap-[3rem] h-full">
          <p className="text-[1.6rem] font-bold text-text-3">
            我想收到優惠通知
          </p>

          <form className="relative">
            <input
              className="w-[32rem] h-[5rem] rounded-[1.2rem] px-[2.5rem] text-text-1"
              type="email"
              placeholder="Email"
            />
            <div className="absolute flex items-center justify-center w-[5rem] h-[5rem] bg-cafe-2 right-0 top-0 rounded-r-[1.2rem]">
              <BsCheck className="text-white text-[3rem]" />
            </div>
          </form>

          <div className="flex">
            <a className="text-[1.3rem] text-text-1 block w-full">相關條款</a>
            <a className="text-[1.3rem] text-text-1 block w-full">隱私政策</a>
          </div>
        </div>
      </div>
    </m.footer>
  );
};

export default Footer;
