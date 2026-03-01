"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CategoryManager() {
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [editId, setEditId] = useState(null);

    const token = localStorage.getItem("token");

    const fetchCategories = async () => {
        try {
            const res = await fetch(
                "http://127.0.0.1:8000/api/categories"
            );
            const data = await res.json();

            setCategories(data.categories || data);
        } catch {
            toast.error("Failed to fetch categories");
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAdd = async () => {
        e.preventDefault();
        if (!name) {
            return toast.error("Category name is required");
        }

        try {
            const res = await fetch(
                "http://127.0.0.1:8000/api/admin/categories",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ name }),
                }
            );

            const data = await res.json();
            if (!res.ok) {
                return toast.error(data.message || "Failed to add category");
            }

            toast.success("Category added successfully");
            setName("");
            fetchCategories();
        } catch {
            toast.error("Add failed");
        }
    }

    const handleEdit = (category) => {
        setEditId(category.id);
        setName(category.name);
    }

    const handleUpdate = async (e) => {

        e.preventDefault();

        if (!editId)
            return;


        try {

            const res = await fetch(
                `http://127.0.0.1:8000/api/admin/categories/${editId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify({ name }),
                }
            );


            const data = await res.json();

            if (!res.ok)
                return toast.error(data.message);


            toast.success("Category updated");

            setName("");

            setEditId(null);

            fetchCategories();

        } catch {

            toast.error("Update failed");

        }

    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this category?")) {
            return;
        }
        try {
            const res = await fetch(
                `http://127.0.0.1:8000/api/admin/categories/${id}`,
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

                toast.success("Category Deleted");
                fetchCategories();
            }
        } catch {
            toast.error("Delete failed");
        }

    };

    const handleCancel = () => {
        setEditId(null);
        setName("");
    }
    return (<>

        <div className="container py-4">
            <div classNAme="card-shadow card-body">
                <div className="card-body">
                    <h4 className="mb-4">
                        {editId ? "Edit Category" : "Add Category"}
                    </h4>

                    <form
                        onSubmit={editId ? handleUpdate : handleAdd}
                        className="d-flex gap-2 mb-4">
                        <input
                            className="form-control"
                            placeholder="Category Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <button className="btn btn-dark">
                            {editId ? "Update" : "Add"}
                        </button>

                        {editId && (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        )}
                    </form>

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th width="150">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length > 0 ? (
                                categories.map((cat) => (
                                    <tr key={cat.id}>
                                        <td>{cat.id}</td>
                                        <td>{cat.name}</td>
                                        <td>
                                            <button className="btn btn-sm btn-warning me-2"
                                                onClick={() => handleEdit(cat)}
                                            >
                                                Edit
                                            </button>
                                            <button className="btn btn-sm btn-danger"
                                                onClick={() => handleEdit(cat)}
                                            >
                                                Delete
                                            </button>


                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <>
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            No Categories found
                                        </td>
                                    </tr>
                                </>
                            )
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </>)
}