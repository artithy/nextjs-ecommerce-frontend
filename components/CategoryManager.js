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
                        Authentication: `Bearer ${token}`,
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


}