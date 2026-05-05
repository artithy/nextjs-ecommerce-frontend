"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const token = localStorage.getItem("customer_token");

    const fetchCart = async () => {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/cart", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (!res.ok) {
                toast.error("data.message || Failed to fetch cart");
                return;
            }
            setCart(data.cart);
        } catch {
            toast.error("Error loading cart");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!token) {
            router.push("/customer/login");
        } else {
            fetchCart();
        }
    }, []);

}