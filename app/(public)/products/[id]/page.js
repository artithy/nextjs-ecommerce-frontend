"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function ProductDetails() {
    const [quantity, setQuantity] = useState(1);
    const router = useRouter();
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

    const handleBuyNow = () => {
        const token = localStorage.getItem("customer_token");
        if (!token) {
            toast.error("Please login to continue");
            router.push("/customer/login");
        } else {
            router.push("/customer/checkout");
        }
    }

    const handleAddToCart = async () => {
        const token = localStorage.getItem("customer_token");
        console.log("TOKEN:", token);
        if (!token) {
            toast.error("please login to continue");
            return router.push("/customer/login");
        }

        try {
            const res = await fetch("http://127.0.0.1:8000/api/add/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    product_id: product.id,
                    quantity: quantity,
                }),
            });

            const text = await res.text();
            console.log("FULL RESPONSE:", text);

            if (!res.ok) {
                toast.error("Failed to add to cart");
                return;
            }

            toast.success("Added to cart");
            router.push("/dashboard");
        } catch (error) {
            toast.error("Error adding to cart", error);
        }
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

                            <button className="btn btn-outline-dark btn-sm" onClick={() => {
                                if (quantity > 1) {
                                    setQuantity(quantity - 1);
                                }
                            }}>-</button>
                            <span className="fw-semibold">
                                {quantity}
                            </span>
                            <button className="btn btn-outline-dark btn-sm" onClick={() => { setQuantity(quantity + 1) }} >+</button>

                        </div>

                        <div className="d-flex gap-3">
                            <button className="btn btn-outline-dark px-4 py-2" onClick={handleAddToCart}>
                                Add to Cart
                            </button>

                            <button className="btn btn-outline-dark px-4 py-2" onClick={handleBuyNow}>
                                Buy Now
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}