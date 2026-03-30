"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddProduct() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");
    const [image, setImage] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("http://127.0.0.1:8000/api/categories");
                const data = await res.json();
                setCategories(data.categories || data);
            } catch {
                toast.error("Failed to load categories");
            }
        };

        fetchCategories();

    }, []);


    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        }
        reader.readAsDataURL(file);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !price || !image || !categoryId) {
            return toast.error("All required fields are missing");
        }

        try {
            const token = localStorage.getItem("admin_token");
            const res = await fetch("http://127.0.0.1:8000/api/admin/products",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        price,
                        discount_price: discountPrice,
                        image,
                        category_id: categoryId,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                return toast.error(data.message || "Failed to add product");
            }
            toast.success("Product added successfully");

            setTitle("");
            setDescription("");
            setPrice("");
            setDiscountPrice("");
            setImage("");
            setCategoryId("");
        } catch {
            toast.error("Server error");
        }
    }

    return (
        <>
            <div className="container py-4">
                <div className="card shadow-lg border-0">
                    <div className="card-body">
                        <h4 className="fw-bold mb-4 text-center">
                            Add New Product
                        </h4>
                        <form onSubmit={handleSubmit} className="row g-4">
                            <div className="col-md-6">
                                <label className="form-label">Title<span className="text-danger"></span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">Category</label>
                                <select
                                    className="form-select"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}

                                </select>
                            </div>


                            <div className="col-md-6">
                                <label className="form-label">Price <span className="text-danger">*</span></label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Discount Price </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={discountPrice}
                                    onChange={(e) => setDiscountPrice(e.target.value)}
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">Product Image<span className="text-danger">*</span></label>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={handleImage}
                                />
                                {image && (
                                    <img
                                        src={image}
                                        className="mt-3 rounded"
                                        style={{ width: 120 }}
                                    />
                                )}
                            </div>

                            <div className="col-12">
                                <button className="btn btn-dark w-100">
                                    Add Product
                                </button>
                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </>
    )
}