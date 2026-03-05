"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
export default function AdminDashboardLayout({ children }) {
    const router = useRouter();
    const logout = () => {
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
    }

    return (
        <>
            <div className="d-flex  min-vh-100">
                <aside className="bg-dark text-white p-4">
                    <h4 className="fw-bold mb-4">
                        Admin Panel
                    </h4>
                    <nav className="nav flex-column gap-2">
                        <Link className="nav-link text-white" href="/admin/dashboard">
                            Dashboard
                        </Link>

                        <Link className="nav-link text-white" href="/admin/dashboard/categories">
                            Categories
                        </Link>

                        <Link className="nav-link text-white" href="/admin/dashboard/products/add">
                            Add Product
                        </Link>

                        <Link className="nav-link text-white" href="/admin/dashboard/products/list">
                            Products
                        </Link>

                        <Link className="nav-link text-white" href="/admin/dashboard/orders">
                            Orders
                        </Link>
                    </nav>

                    <button className="btn btn-danger w-100 mt-4" onClick={logout}>
                        Logout
                    </button>
                </aside>

                <main className="flex-grow-1 p-4 bg-light">
                    {children}
                </main>
            </div>
        </>
    )

}