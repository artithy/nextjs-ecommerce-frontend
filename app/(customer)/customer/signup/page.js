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

    return (
        <>
            <div className="container-fluid min-vh-100">
                <div className="row min-vh-100">
                    <div className="col-12 col-lg-6 p-0 overflow-hidden">
                        <img
                            src="/customer_signup.png"
                            className="vh-100 object-fit-cover"
                            style={{ width: "96%" }}
                        />
                    </div>

                    <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center bg-white py-5">
                        <div style={{ width: "100%", maxWidth: "420px" }}>
                            <h2 className="fw-bold mb-2">Create Account</h2>
                            <p className="text-muted mb-4">Join our store</p>
                            <form onSubmit={handleSignup} className="d-grid gap-4">
                                <input
                                    name="name"
                                    placeholder="Full Name"
                                    className="form-control border-0 border-bottom rounded-0 shadow-none"
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    className="form-control border-0 border-bottom rounded-0 shadow-none"
                                    onChange={handleChange}
                                    required
                                />


                                <input
                                    name="phone"
                                    placeholder="Phone"
                                    className="form-control border-0 border-bottom rounded-0 shadow-none"
                                    onChange={handleChange}
                                    required
                                />


                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    className="form-control border-0 border-bottom rounded-0 shadow-none"
                                    onChange={handleChange}
                                    required
                                />

                                <button className="btn btn-dark py-2 rounded-3">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}