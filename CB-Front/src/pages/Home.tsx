
import Hero from "../components/Hero";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";


function Home() {
  return (
    <div className='w-full h-full'>
      <Hero/>
      <ProductList/>
      <Footer/>
    </div>
  );
} 

export default Home;