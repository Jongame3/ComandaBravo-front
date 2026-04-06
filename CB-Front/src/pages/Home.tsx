import React, { useState } from "react";
import Hero from "../components/Hero";
import ProductList from "../components/ProductList";


function Home() {
  return (
    <div className='w-full h-full'>
      <Hero/>
      <ProductList/>
    </div>
  );
} 

export default Home;