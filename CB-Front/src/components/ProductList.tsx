import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Searchbar from "./Searchbar";
import {type Product, products} from "./products";

function ProductList() {
    const [productsList,setProducts] = useState<Product[]>(products);
    const [searchTerm,setSearchTerm] = useState("");
    const [loading,setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchdata = async () => {
    try{
        const res = await fetch("https://fakestoreapi.com.products");
        if (!res.ok) throw new Error(`Http ${res.status}`);
        const data: Product[] = await res.json();
        setProducts(data);
    } catch (err :any) {
        setErrorMessage(err.mesaage);
    } finally {
        setLoading(false);
    }
    };


    useEffect(() => {
        fetchdata();
    } ,[]);

    const filtered = productsList.filter( p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))


    return ( 
    <section className="min-h-screen bg-gray-50 py-16">
        <div className="w-full text-4xl font-bold leading-tight tracking-tight text-center text-blue-950 md:text-5xl lg:text-6xl">Каталог наших услуг</div>
        <div className="w-full text-2xl"></div>
        <div className="mx-auto max-w-7xl px-6 py-6 bg-gray-200 rounded-2xl mt-4">
            <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <p className="px-6 font-sans font-lg font-bold">Найдено: {filtered.length} услуг</p>
            {loading ? (
                <p className="px-6 font-sans font-lg ">Loading...</p>
            ) : errorMessage ? (
                <p className="px-6 font-sans font-lg ">{errorMessage}</p>
            ) : filtered.length == 0 ? (
                <p className="px-6 font-sans font-lg">Ничего не найдено</p>
            ) : (
                <div className="mx-auto max-w-7xl px-6 py-5">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((product ) => <ProductCard  key = {product.id} name ={product.name} descryption={product.descryption} price = {product.price} />)}
                    </div>
                </div>
                )
            }
        </div>
    </section> 
    );
}

export default ProductList;