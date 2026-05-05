"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://127.0.0.1:8000/api/customer/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            console.log("LOGIN RESPONSE:", data);
            if (!res.ok) return toast.error(data.message);

            toast.success("Login successful ");
            localStorage.setItem("customer_token", data.token);
            router.push("/dashboard");
        } catch {
            toast.error("Server error");
        }
    };

    return (
        <div className="container-fluid min-vh-100">
            <div className="row min-vh-100">

                <div className="col-12 col-lg-6 p-0 overflow-hidden">
                    <img
                        src="/customer_login.png"
                        className="vh-100 object-fit-cover"
                        style={{ width: "100%" }}
                    />
                </div>

                <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center bg-white py-5">
                    <div style={{ width: "100%", maxWidth: "420px" }}>
                        <p className="text-muted mb-4">Login to continue</p>

                        <form onSubmit={handleLogin} className="d-grid gap-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="form-control border-0 border-bottom rounded-0 shadow-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                className="form-control border-0 border-bottom rounded-0 shadow-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button className="btn btn-dark py-2 rounded-3">
                                Login
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}
