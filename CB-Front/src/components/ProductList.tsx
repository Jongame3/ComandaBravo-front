import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import {type Product, products} from "D:/Projects/ComandaBravo-front/CB-Front/src/data/products.ts";

function ProductList() {
    const [productsList,setProducts] = useState<Product[]>(products);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchdata = async () => {
    try{
        const res = await fetch("https://fakestoreapi.com.products");
        if (!res.ok) throw new Error(`Http ${res.status}`);
        const data: Product[] = await res.json();
        setProducts(data);
    } catch (err :any) {
        setError(err.mesaage);
    } finally {
        setLoading(false);
    }
    };


    useEffect(() => {
        fetchdata();
    } ,[]);


    return ( 
    <section className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-5">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {productsList.map((product ) => <ProductCard name ={product.name} descryption={product.descryption} price = {product.price} />)}
            </div>
        </div>
    </section> 
    );
}

export default ProductList;