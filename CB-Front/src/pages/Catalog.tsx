import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import Header from "../components/Header";



function Catalog() {
  return (
    <div className='w-full h-full'>
        <ProductList/>
        <Footer/>
    </div>
  );
} 

export default Catalog;