"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CustomerSignupPage() {
    const router = useRouter();

    const [form, setForm] = useState({

        name: "",
        email: "",
        phone: "",
        password: "",
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://127.0.0.1:8000/api/customer/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (!res.ok) {
                return toast.error(data.message);
            }
            toast.success("Account created");
            localStorage.setItem("customer_token", data.token);
            router.push("/customer/dashboard");
        } catch {
            toast.error("Server error");
        }
    }
}