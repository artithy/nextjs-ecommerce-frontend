"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({});

    const fetchProducts = async () => {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/products");
            const data = await res.json();
            setProducts(Array.isArray(data) ? data : data.products);
        } catch (error) {
            toast.error("Failed to load products", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleEdit = (p) => {
        setEditId(p.id);

        setForm({
            title: p.title,
            price: p.price,
            discount_price: p.discount_price,
            category_id: p.category_id,
            status: p.status,
            image: p.image,
        });
    };

    const handleUpdate = async (id) => {
        try {
            const token = localStorage.getItem("admin_token");
            const res = await fetch(`http://127.0.0.1:8000/api/admin/products/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(form),
                }
            );
            const data = await res.json();

            if (!res.ok) {
                return toast.error(data.message);
            };
            toast.success("Updated");
            setEditId(null);
            fetchProducts();
        } catch (error) {
            toast.error("Update Failed");
        }
    }

    const handleDelete = async (id) => {
        if (!confirm("Are you sure to delete this product ?")) {
            return;
        }

        try {
            const token = localStorage.getItem("admin_token");

            const res = await fetch(`http://127.0.0.1:8000/api/admin/products/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();
            if (!res.ok) {
                return toast.error(data.message);
            }
            toast.success("Deleted");
            fetchProducts();
        } catch (error) {
            toast.error("Delete Failed");
        }
    };

    return (
        <>
            <div className="container-fluid py-4">
                <h3 className="mb-4 fw-bold">
                    Product List
                </h3>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered align-middle">
                    <thead className="table-light text-center">
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Discount Price</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th wwidth="200">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                <td className="text-center">
                                    {editId === p.id ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={form.image || ""}
                                            onChange={(e) => setForm({ ...form, image: e.target.value })}
                                        />
                                    ) : (
                                        p.image ? (
                                            <img
                                                src={p.image}
                                                style={{ width: 50, height: 50, objectFit: "cover" }}
                                            />
                                        ) : "-"
                                    )}
                                </td>

                                <td>
                                    {editId === p.id ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={form.title}
                                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        />
                                    ) : (
                                        p.title
                                    )}
                                </td>

                                <td>
                                    {editId === p.id ? (
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={form.price}
                                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                                        />
                                    ) : (
                                        p.price
                                    )}
                                </td>


                                <td>
                                    {editId === p.id ? (
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={form.discount_price}
                                            onChange={(e) => setForm({ ...form, discount_price: e.target.value })}
                                        />
                                    ) : (
                                        p.discount_price
                                    )}
                                </td>

                                <td>
                                    {editId === p.id ? (
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={form.category_id || ""}
                                            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                                        />
                                    ) : (
                                        p.category_id
                                    )}
                                </td>
                                <td className="text-center">
                                    {editId === p.id ? (
                                        <select
                                            className="form-select"
                                            value={form.status}
                                            onChange={(e) => setForm({ ...form, status: e.target.value === "true", })}
                                        >
                                            <option value="true">Active</option>
                                            <option value="false">Inactive</option>
                                        </select>
                                    ) : (
                                        <span
                                            className={`badge ${p.status ? "bg-success" : "bg-secondary"}`}
                                        >
                                            {p.status ? "Active" : "Inactive"}
                                        </span>
                                    )}
                                </td>


                                <td className="text-center">
                                    {editId === p.id ? (
                                        <>
                                            <button className="btn btn-success btn-sm me-2" onClick={() => handleUpdate(p.id)}>
                                                Save
                                            </button>

                                            <button className="btn btn-secondary btn-sm" onClick={() => setEditId(null)}>
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(p)}>
                                                Edit
                                            </button>

                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    );
}