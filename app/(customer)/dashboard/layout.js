"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Home, ShoppingCart, Package, Heart } from "lucide-react";
export default function CustomerDashboardLayout({ children }) {

    const handleLogout = () => {
        localStorage.removeItem("customer_token");
        router.push("/");
    }
    return (
        <>
            <div className="d-flex">
                <div style={{ width: "250px", minHeight: "100vh" }} className="bg-dark text-white p-3 d-flex flex-column">
                    <h4 className="mb-4">
                        Dashboard
                    </h4>
                    <ul className="list-unstyled mt-4 d-flex flex-column gap-3">
                        <li >
                            <Link href="/dashboard" className="text-white text-decoration-none">
                                <Home size={18} className="me-2" />
                                Home
                            </Link>
                        </li>
                        <li >
                            <Link href="/dashboard/orders" className="text-white text-decoration-none">
                                <Package size={18} className="me-2" />
                                My Orders
                            </Link>
                        </li>
                        <li >
                            <Link href="/dashboard/cart" className="text-white text-decoration-none">
                                <ShoppingCart size={18} className="me-2" />
                                Cart
                            </Link>
                        </li>
                        <li >
                            <Link href="/dashboard/wishlist" className="text-white text-decoration-none">
                                <Heart size={18} className="me-2" />
                                Wishlist
                            </Link>
                        </li>
                        <li >
                            <Link href="/dashboard/profile" className="text-white text-decoration-none">
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

                <div className="flex-grow-1">
                    <div className="d-flex justify-content-between p-3 border-bottom">
                        <h5>Customer Dashboard</h5>
                        <Link href="/dashboard/profile" className="text-dark">
                            <User size={26} />
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