"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";

export default function AdminLogin() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("http://127.0.0.1:8000/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Login Failed");
                setLoading(false);
                return;
            }

            toast.success("Login Successful");
            localStorage.setItem("admin_token", data.token);

            setTimeout(() => {
                router.push("/admin/dashboard");
            }, 1000);
        } catch {
            toast.error("Server Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container-fluid min-vh-100 bg-light d-flex align-items-center justify-content-center">
                <div className="row w-100 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: "900px" }}>
                    <div className="col-md-6 d-none d-md-flex bg-dark text-white p-5 flex-column justify-content-center">
                        <h1 className="fw-bold">Admin Panel</h1>
                        <p className="text-white-50 mt-3">
                            Login to manage products, orders and users.
                        </p>
                    </div>

                    <div className="col-12 col-md-6 bg-white p-5">
                        <h3 className="fw-bold mb-1">
                            Admin Login
                        </h3>

                        <p className="text-muted mb-4">
                            Access Dashboard
                        </p>

                        <form className="d-grid gap-4" onSubmit={handleLogin}>
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
                                placeholder="password"
                                className="form-control border-0 border-bottom rounded-0 shadow-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button
                                type="submit"
                                className="btn btn-dark py-2 rounded-3"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </form>

                        <p className="text-center mt-3 text-muted">
                            Don't have an account?{""}
                            <Link href="/admin/signup" className="text-decoration-none fw-semibold">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>

            </div>

            <ToastContainer position="top-right" />

        </>
    )
}

