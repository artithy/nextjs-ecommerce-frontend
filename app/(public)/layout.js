"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { usePathname } from "next/navigation";

export default function PublicLayout({ children }) {

    const pathname = usePathname();

    return (
        <>
            <Navbar />
            {pathname === "/" && (
                <section className="position-relative overflow-hidden">

                    <img
                        src="/hero.png"
                        className="w-100 d-block"
                        style={{
                            height: "55vh",
                            objectFit: "cover"
                        }}
                    />

                    <div
                        className="position-absolute start-50 translate-middle-x text-center text-white px-4 px-lg-5"
                        style={{ top: "45%" }}
                    >
                        <h1 className="fw-bold display-6">
                            Shop Smart, Live Better
                        </h1>

                        <p className="mt-2">
                            Discover trending products at unbeatable prices.
                            Upgrade your lifestyle today.
                        </p>

                        <div className="d-flex justify-content-center gap-3 mt-3">
                            <a href="/customer/login" className="btn btn-outline-light px-4">
                                Shop Now
                            </a>

                            <a href="/products" className="btn btn-outline-light px-4">
                                Explore
                            </a>
                        </div>
                    </div>

                </section>
            )}

            {children}

            <Footer />
        </>
    );
}