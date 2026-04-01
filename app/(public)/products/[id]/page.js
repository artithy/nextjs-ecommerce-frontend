"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await fetch(`http://127.0.0.1:8000/api/products/${id}`);
            const data = await res.json();
            setProduct(data.product);
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <p className="text-center py-5">Loading...</p>
    }

    return (
        <>
            <div className="container py-5 mt-5">
                <div className="row g-5 align-items-center">

                    <div className="col-md-6">
                        <div className="p-3 bg-light rounded shadow-sm">
                            <img
                                src={product.image}
                                className="w-100 rounded"
                                style={{ height: "420px", onjectFit: "cover" }}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <h2 className="fw-bold mb-3"> {product.title}</h2>
                        <p className="text-muted mb-4">{product.description}</p>
                        <div className="mb-4">
                            <h4 className="fw-bold text-dark d-inline">
                                ৳{product.discount_price || product.price}
                            </h4>

                            {product.discount_price && (
                                <span className="text-danger text-decoration-line-through ms-3 fs-5">
                                    ৳{product.price}
                                </span>
                            )}
                        </div>
                        <hr />

                        <div className="d-flex aligh-items-center gap-3 mb-4">
                            <span className="fw-semibold">
                                Quantity
                            </span>
                            <button className="btn btn-outline-dark btn-sm">-</button>
                            <span>1</span>
                            <button className="btn btn-outline-dark btn-sm">+</button>

                        </div>

                        <div className="d-flex gap-3">
                            <button className="btn btn-dark px-4 py-2">
                                Add to Cart
                            </button>

                            <button className="btn btn-outline-dark px-4 py-2">
                                Buy Now
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}