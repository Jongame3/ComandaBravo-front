import React, { useState } from "react";
import ProductCard from '../components/ProductCard'

function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <h1 className="my-4 text-3xl font-bold">Welcome to Comanda Bravo!</h1>
      <ProductCard name="Product 1" />
    </div>
  );
} 

export default Home;