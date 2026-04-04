import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

type Product = {
    name :string 
    descryption : string;
};

function ProductList() {
    const [products,setProducts] = useState<Product[]>([]);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchdata = async () => {
    try{
        const res = await  fetch("https://fakestoreapi.com.products");
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
        fetchdata()
    } ,[]);


    return ( 
    <section>
        
    </section> 
    );
}

export default ProductList;