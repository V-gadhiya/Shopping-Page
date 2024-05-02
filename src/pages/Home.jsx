import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct
        category={"airpodes"}
        heading={"Tops's Airpodes"}
      />
  
      <HorizontalCardProduct
        category={"earphones"}
        heading={"Tops's earphones"}
      />
      <VerticalCardProduct category={"mobiles"} heading={"Tops's mobiles"} />
      <VerticalCardProduct category={"Mouse"} heading={"Tops's Mouse"} />
      <VerticalCardProduct category={"camera"} heading={"Tops's camera"} />
      <VerticalCardProduct
        category={"televisions"}
        heading={"Tops's televisions"}
      />
      <VerticalCardProduct
        category={"refrigerator"}
        heading={"Tops's refrigerator"}
      />
    </div>
  );
};

export default Home;
