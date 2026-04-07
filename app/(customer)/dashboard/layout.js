"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation"
import { User, Home, ShoppingCart, Package, Heart } from "lucide-react";
export default function CustomerDashboardLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const handleLogout = () => {
        localStorage.removeItem("customer_token");
        router.replace("/");
    }

    useEffect(() => {
        const token = localStorage.getItem("customer_token");
        if (!token) {
            router.replace("/customer/login")
        }
    }, [])
    return (
        <>
            <div className="d-flex" style={{ minHeight: "100vh" }}>
                <div style={{ width: "260px", height: "100vh", top: 0, left: 0 }} className="bg-dark text-white p-3 d-flex flex-column position-fixed">
                    <h4 className="mb-4">
                        Dashboard
                    </h4>
                    <ul className="list-unstyled mt-4 d-flex flex-column gap-3">
                        <li >
                            <Link href="/dashboard" className={`text-white text-decoration-none d-flex align-items-center gap-2 p-2 rounded ${pathname === "/dashboard" ? "bg-secondary" : ""}`}>
                                <Home size={18} className="me-2" />
                                Home
                            </Link>
                        </li>
                        <li >
                            <Link href="/dashboard/orders"
                                className={`text-white text-decoration-none d-flex align-items-center gap-2 p-2 rounded 
  ${pathname.startsWith("/dashboard/orders") ? "bg-secondary" : ""}`}>
                                <Package size={18} className="me-2" />
                                My Orders
                            </Link>
                        </li>
                        <li >
                            <Link href="/dashboard/cart" className={`text-white text-decoration-none d-flex align-items-center gap-2 p-2 rounded 
  ${pathname === "/dashboard/cart" ? "bg-secondary" : ""}`}>
                                <ShoppingCart size={18} className="me-2" />
                                Cart
                            </Link>
                        </li>
                        <li >
                            <Link href="/dashboard/wishlist" className={`text-white text-decoration-none d-flex align-items-center gap-2 p-2 rounded 
  ${pathname === "/dashboard/wishlist" ? "bg-secondary" : ""}`}>
                                <Heart size={18} className="me-2" />
                                Wishlist
                            </Link>
                        </li>
                        <li >
                            <Link href="/dashboard/profile" className={`text-white text-decoration-none d-flex align-items-center gap-2 p-2 rounded 
  ${pathname === "/dashboard/profile" ? "bg-secondary" : ""}`}>
                                <User size={18} className="me-2" />
                                Profile
                            </Link>
                        </li>
                    </ul>
                    <div className="mt-auto">
                        <button className="btn btn-danger w-100" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>

                <div className="flex-grow-1" style={{ marginLeft: "260px" }}>
                    <div className="d-flex justify-content-between align-items-center  p-3 border-bottom bg-white shadow-sm">
                        <h5 className="mb-0">Customer Dashboard</h5>
                        <Link href="/dashboard/profile" className="text-dark p-2 rounded-circle">
                            <User size={24} />
                        </Link>
                    </div>

                    <div className="p-4">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}