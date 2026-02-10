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
}