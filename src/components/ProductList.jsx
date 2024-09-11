import { useState } from "react";
import { useGetProductsQuery } from "../redux/api";
import { useNavigate } from "react-router-dom";
import Reviews from "./Reviews"; // Import the Reviews component

function ProductList({ token }) {
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetProductsQuery(token);

    const products = data?.products;


    return (
        <>
            <h1>Product List</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p>Oops! Something went wrong!</p>}
            {products && products.map((product) => (
                <div className="product_card" key={product.id}>
                    <img src={product.img_url} alt={product.name} />
                    <button onClick={() => navigate("/products/" +  product.id)}>
                        <h2>Name: {product.name}</h2>
                    </button>
                    <p>Product Type: {product.product_type}</p>
                    <p>Description: {product.description}</p>
                </div>
            ))}
            <Reviews token={token} />
        </>
    );
}

export default ProductList;