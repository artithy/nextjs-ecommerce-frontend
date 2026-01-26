"use client"

export default function Footer() {
    return (
        <>
            <footer style={{ background: "#0f172a" }} className="text-light mt-5">
                <div className="container py-5">
                    <div className="row gy-4">
                        <div className="col-md-4">
                            <h4 className="fw-bold text-white">ShopEase</h4>
                            <p className="text-secondary mt-2">
                                A modern ecommerce platform built for smooth shopping experience and trusted quality.
                            </p>
                        </div>

                        <div className="col-md-2">
                            <h6 className="text-white mb-3">Pages</h6>
                            <ul className="list-unstyled">
                                <li className="footer-link" href="/">Home</li>
                                <li className="footer-link" href="/products">Products</li>
                                <li className="footer-link" href="/about">About</li>
                            </ul>
                        </div>

                        <div className="col-md-3">
                            <h6 className="text-white mb-3">Support</h6>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-secondary mb-1">Help Center</a></li>
                                <li><a href="#" className="text-secondary mb-1">Privacy Policy</a></li>
                                <li><a href="#" className="text-secondary">Terms & Conditions</a></li>
                            </ul>
                        </div>

                        <div className="col-md-3">
                            <h6 className="text-white mb-3">Contact</h6>
                            <p className="text-secondary mb-1">support@shopease.com</p>
                            <p className="text-secondary mb-1">+88018273426791</p>
                            <p className="text-secondary">Dhaka, Bangladesh</p>

                        </div>
                        <hr className="border-secondary mt-4" />
                        <div className="text-center text-secondary small">
                            © {new Date().getFullYear()} ShopEase. All rights reserved.
                        </div>
                    </div>
                </div>

            </footer>
        </>
    );
}