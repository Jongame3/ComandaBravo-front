import React, { useState } from "react";
import ProductCard from '../components/ProductCard'
import Hero from "../components/Hero";

function Home() {
  return (
    <div className='w-full h-full'>
      <h1 className="my-4 text-3xl font-bold ">Welcome to Comanda Bravo!</h1>
      <Hero/>
      <ProductCard name="Product 1" />
    </div>
  );
} 

export default Home;