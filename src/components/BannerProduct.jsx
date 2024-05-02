import React, { useEffect, useState } from "react";
import image1 from "./../assest/banner/img1.webp";
import image1m from "./../assest/banner/img1_mobile.jpg";
import image2 from "./../assest/banner/img2.webp";
import image2m from "./../assest/banner/img2_mobile.webp";
import image3 from "./../assest/banner/img3.jpg";
import image3m from "./../assest/banner/img3_mobile.jpg";
import image4 from "./../assest/banner/img4.jpg";
import image4m from "./../assest/banner/img4_mobile.jpg";
import image5 from "./../assest/banner/img5.webp";
import image5m from "./../assest/banner/img5_mobile.png";

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const desktopImage = [image1, image2, image3, image4, image5];
const mobileImage = [image1m, image2m, image3m, image4m, image5m];

const BannerProduct = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (desktopImage.length - 1 > currentPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const prevPage = () => {
    if (currentPage != 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImage.length - 1 > currentPage) {
        nextPage();
      } else setCurrentPage(0);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentPage]);
  return (
    <div className=" container mx-auto px-4 rounded ">
      <div className="h-56 w-full bg-slate-200 relative">
        <div className=" absolute z-10 h-full w-full items-center hidden md:flex">
          <div className=" flex justify-between  w-full text-2xl">
            <button
              className={`bg-white shadow-md rounded-full p-1 `}
              onClick={prevPage}
            >
              <FaAngleLeft />
            </button>
            <button
              className={`bg-white shadow-md rounded-full p-1 ${
                currentPage === desktopImage.length - 1 ? "hidden" : ""
              }`}
              onClick={nextPage}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        <div className="md:flex hidden h-full w-full overflow-hidden">
          {desktopImage.map((imageURL, index) => {
            return (
              <div
                className="w-full h-full min-h-full min-w-full transition-all"
                key={imageURL}
                style={{ transform: `translateX(-${currentPage * 100}%)` }}
              >
                <img src={imageURL} alt="Image" className=" w-full h-full" />
              </div>
            );
          })}
        </div>
        {/* mobile screen */}
        <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileImage.map((imageURL, index) => {
            return (
              <div
                className="w-full h-full min-h-full min-w-full transition-all"
                key={imageURL}
                style={{ transform: `translateX(-${currentPage * 100}%)` }}
              >
                <img
                  src={imageURL}
                  alt="Image"
                  className=" w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
