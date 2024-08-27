import { useState } from "react";
import { useGetProductsQuery } from "../redux/api";
import { useNavigate } from "react-router-dom";
import ProductDetail from "./ProductDetail";


function ProductList({token}){
    const navigate = useNavigate();
    const [productSelected, setproductSelected] = useState(null);
    const {data, isLoading, error} = useGetProductsQuery(token);

    const products = data?.products;

    if (productSelected){
        return (
            <ProductDetail 
            product_id={productSelected.product_id}
            setproductSelected={setproductSelected}
            token={token}
            />
        );
    }

    return(
        <>
        <h1>Product List</h1>
        {isLoading ? <p>Loading...</p>: <span/>}
        {error ? <p>Oops! Something went wrong!</p> : <span/>}
        {products && products.map((product) => (
            <div className="product_card" key={product.product_id}>
                <img src={product.img_url} />
                <button onClick={() => navigate("/products/" + product.id)}>
                <h2>Name: {product.name} </h2>

                </button>
           
                <p>Product Type: {product.product_type}</p>
                <p>Description: {product.description}</p>
            </div>
        ))}
        </>

    )

    }
    
export default ProductList;