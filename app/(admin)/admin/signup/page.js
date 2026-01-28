"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function AdminSignup() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);



    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(
                "http://127.0.0.1:8000/api/admin/register",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Signup Failed");
                setLoading(false);
                return;
            }
            toast.success("Admin created successfully ");

            localStorage.setItem("admin_token", data.token);
            setTimeout(() => {
                router.push("/admin/dashboard");
            }, 1000);

        } catch {
            toast.error("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container-fluid min-vh-100 bg-light d-flex align-items-center justify-content-center">
                <div className="row w-100 shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: "900px" }}>
                    <div className="col-md-6 d-none d-md-flex bg-dark text-white p-5 flex-column justify-content-center">
                        <h1 className="fw-bold">Create Admin</h1>
                        <p className="text-white-50 mt-3">
                            Register new administrator securely
                        </p>
                    </div>

                    <div className="col-12 col-md-6 bg-white p-5">
                        <h3 className="fw-bold mb-1">Sign Up</h3>
                        <p className="text-muted mb-4">Create admin account</p>

                        <form onSubmit={handleSignup}>
                            <input
                                placeholder="Full name"
                                className="form-control border-0 border-bottom rounded-0 shadow-none"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />


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

                            <button className="btn btn-dark py-2 rounded-3 w-100" disabled={loading}>
                                {loading ? "Creating..." : "Create Account"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" />

        </>
    )
}