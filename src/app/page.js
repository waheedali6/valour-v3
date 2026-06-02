'use client'

import Header from "@/components/Header"
import HeroSec from "@/components/HeroSec"
import KnowSec from "@/components/KnowSec"
import ProductSec from "@/components/ProductSec"
import VideoSec from "@/components/VideoSec"
import ImgSec from "@/components/ImgSec"
import CreativeVideoSection from "@/components/CreativeVideoSection"
import WatchSec from "@/components/WatchSec"
import TestimonialSec from "@/components/TestimonialSec"
import FormSec from "@/components/FormSec"
import Footer from "@/components/Footer"
import SliderImage from "@/components/SliderImage"

export default function Home() {
  return (
    <>
    
      <Header />
      <div className="snap-section">
        <HeroSec />
      </div>

      <div className="snap-section">
        <KnowSec />
      </div>

      <div className="snap-section">
        <ProductSec />
      </div>

      <div className="snap-section">
        <VideoSec />
      </div>

      <div className="snap-section">
         <SliderImage />
      </div>

      <div className="snap-section">
        <CreativeVideoSection />
      </div>

      <div className="snap-section">
        <WatchSec />
      </div>

      <div className="snap-section">
        <TestimonialSec />
      </div>

      {/* <div className="snap-section">
        <FormSec />
      </div> */}

      <div className="snap-section">
        <VideoSec />
      </div>

      <div className="snap-section">
        <Footer />
      </div>
    </>
  )
}
