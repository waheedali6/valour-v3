"use client"
import HeroSection from "./HeroSection";
import DetailSec from "./DetailSec";
import DetailSec2 from "./DetailSec2";
import DetailSec3 from "./DetailSec3";
import ParraSec1 from "./ParraSec1";
import ParraSec2 from "./ParraSec2";
import StrapSec from "./StrapSec";
import { useSelector } from "react-redux";
import { useState } from "react";

const slugify = (text) => {
    return text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
}


const Product = ({productName}) => {
    const products = useSelector((state) => state.product.value);
    const [selectedProduct, setSelectedProduct] = useState(products.find((item) => slugify(item.name) == productName) || {})
    return (
        <>
            <div className="snap-section">
                <HeroSection product={selectedProduct}/>
            </div>
            <div className="snap-section">
                <DetailSec />
            </div>
            <div className="snap-section">
                <ParraSec1 />
            </div>
            <div className="snap-section">
                <DetailSec2 />
            </div>
            <div className="snap-section">
                <ParraSec2 />
            </div>
            <div className="snap-section">
                <DetailSec3 />
            </div>
            <div className="snap-section">
                <StrapSec />
            </div>
        </>
    )
}

export default Product
