"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

export default function ProductSections() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/categories");
            const data = await res.json();
            setCategories(data.categories || data);
        } catch (error) {
            toast.error("Failed to load categories", error);
        };
    }

    const fetchProducts = async (category = "all") => {
        try {
            const res = await fetch(
                category === "all"
                    ? "http://127.0.0.1:8000/api/products"
                    : `http://127.0.0.1:8000/api/products?category=${category}`
            );

            const data = await res.json();
            setProducts(data.products || data);
        } catch (error) {
            toast.error("Failed to load products", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    const handleCategory = (id) => {
        setActiveCategory(id);
        fetchProducts(id);
    }

    return (
        <>
            <div className="container py-5 gap-5">
                <h2 className="mb-4 fw-bold text-center">
                    Our Products
                </h2>
                <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
                    <button className={
                        `btn ${activeCategory === "all" ?
                            "btn-dark" : "btn-outline-dark"
                        }`}

                        onClick={() => handleCategory("all")}

                    > All
                    </button>

                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            className={
                                `btn ${activeCategory === cat.id ?
                                    "btn-dark" : "btn-outline-dark"
                                }`
                            }
                            onClick={() => handleCategory(cat.id)}
                        >
                            {cat.name}
                        </button>

                    ))}
                </div>


                <div className="row g-4 mt-5">
                    {
                        products.length > 0 ? (
                            products.map((p) => (
                                <div key={p.id} className="col-6 col-md-4 col-lg-3">
                                    <div className="card h-100 shadow-sm">
                                        <img
                                            src={p.image || "/hero.png"}
                                            className="card-img-top"
                                            style={{
                                                height: "180px",
                                                objectFit: "cover",
                                            }}
                                        />

                                        <div className="card-body d-flex flex-column">

                                            <h6 className="fw-bold mb-2">
                                                {p.title}
                                            </h6>

                                            <div className="mb-4">
                                                <span className="fw-bold">
                                                    ৳{p.discount_price || p.price}
                                                </span>

                                                {p.discount_price && (
                                                    <small className="text-danger text-decoration-line-through ms-2">
                                                        ৳{p.price}
                                                    </small>
                                                )}
                                            </div>

                                            <Link href={`/products/${p.id}`}>
                                                <button className="btn btn-dark mt-auto w-100">
                                                    View Details
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (

                            <div className="text-center py-5">
                                <p className="text-muted">
                                    No products found
                                </p>
                            </div>

                        )
                    }
                </div>
            </div >

        </>
    )
}