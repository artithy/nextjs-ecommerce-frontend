"use client";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-light border-bottom sticky-top">
            <div className="container">
                <Link href="/" className="navbar-brand fw-bold text-primary">
                    ShopEase
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>

                </button>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-3">
                        <li className="nav-item">
                            <Link href="/" className="nav-link fw-medium" >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/about" className="nav-link fw-medium" >About</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/products" className="nav-link fw-medium" >Products</Link>
                        </li>

                    </ul>

                    <div className="d-flex gap-2">
                        <Link href="/customer/login" className="btn btn-outline-primary">Login</Link>
                        <Link href="/customer/signup" className="btn btn-outline-primary">Signup</Link>

                    </div>
                </div>
            </div>
        </nav>
    );
}