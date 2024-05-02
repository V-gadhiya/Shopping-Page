import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt, FaSadCry } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const [openFullScreenImage, setOpenFullscreenImage] = useState(false);
  const [fullScreenImage, setFullscreenImage] = useState("");
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];

    const uploadImageCloudinary = await uploadImage(file);
    setData((preve) => {
      return {
        ...preve,
        productImage: [...preve.productImage, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((preve) => {
      return {
        ...preve,
        productImage: [...newProductImage],
      };
    });
  };

  // upload product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const responce = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responceData = await responce.json();

    if (responceData.success) {
      toast.success(responceData?.message);
      onClose();
      fetchData()
    }
    if (responceData.error) {
      toast.error(responceData?.message);
    }
  };
  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 bottom-0 right-0 left-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%]">
        <div className="flex justify-between items-center">
          <h2 className=" font-bold text-lg">Upload Product</h2>
          <div
            className="w-fit ml-auto font-bold text-2xl hover:text-red-600"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>
        <form
          className="grid p-4 gap-3 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="ProductName">ProductName : </label>
          <input
            type="text"
            id="ProductName"
            placeholder="Enter Product Name"
            value={data.productName}
            className="p-2 bg-slate-100 border rounded"
            name="productName"
            onChange={handleOnChange}
            required
          />

          <label htmlFor="brandName" className="mt-3">
            BrandName :{" "}
          </label>
          <input
            type="text"
            id="BrandName"
            placeholder="Enter Brand Name"
            value={data.brandName}
            className="p-2 bg-slate-100 border rounded"
            name="brandName"
            onChange={handleOnChange}
            required
          />

          <label htmlFor="category" className="mt-3">
            Category :
          </label>
          <select
            value={data.category}
            className="p-2 bg-slate-100 border rounded"
            onChange={handleOnChange}
            name="category"
            required
          >
            <option value={""}>Select Category</option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="productImage" className="mt-3">
            Product Image :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl" >
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((el, index) => {
                  return (
                    <div className=" relative group" key={el}>
                      <img
                        src={el}
                        alt="el"
                        width={80}
                        height={80}
                        className=" bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setOpenFullscreenImage(true);
                          setFullscreenImage(el);
                        }}
                      />

                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className=" text-red-600 text-xs">
                *Please Upload Product Image
              </p>
            )}
          </div>
          <label htmlFor="price">Price : </label>
          <input
            type="number"
            id="Price"
            placeholder="Enter Product Price"
            value={data.price}
            className="p-2 bg-slate-100 border rounded"
            name="price"
            onChange={handleOnChange}
            required
          />
          <label htmlFor="selllingPrice">Selling Price : </label>
          <input
            type="number"
            id="SellingPrice"
            placeholder="Enter Selling price"
            value={data.sellingPrice}
            className="p-2 bg-slate-100 border rounded"
            name="sellingPrice"
            onChange={handleOnChange}
            required
          />

          <label htmlFor="description">Description: </label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="Enter Product Description"
            rows={3}
            onChange={handleOnChange}
            name="description"
            value={data.description}
          ></textarea>

          <button className="px-2 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">
            Upload Product
          </button>
        </form>
      </div>

      {/* display image full screen  */}

      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullscreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;