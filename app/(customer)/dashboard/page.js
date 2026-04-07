"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardBox from "../../../components/DashboardBox";
import ProductSection from "../../../components/ProductSections";

export default function CustomerDashboard() {
    const router = useRouter();
    const [stats, setStats] = useState({});
    const [orders, setOrders] = useState([]);

    const fetchDashboard = async () => {
        try {
            const token = localStorage.getItem("customer_token");
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            };
            const resStats = await fetch("http://127.0.0.1:8000/api/customer/dashboard/boxes", { headers });
            const statsData = await resStats.json();
            setStats(statsData);

            const resOrders = await fetch("http://127.0.0.1:8000/api/customer/orders", { headers });
            const ordersData = await resOrders.json();
            setOrders(ordersData || []);

        } catch (error) {
            console.error(" Customer dashboard error:", error);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    return (
        <>
            <div className="container-fluid">
                <div className="row g-4 mb-4">
                    <div className="col-md-4" onClick={() => router.push("/dashboard/orders")} style={{ cursor: "pointer" }}>
                        <DashboardBox title="Total Orders" value={stats.total_orders} />
                    </div>

                    <div className="col-md-4" onClick={() => router.push("/dashboard/cart")} style={{ cursor: "pointer" }}>
                        <DashboardBox title="Total Items" value={stats.cart_items} />
                    </div>

                    <div className="col-md-4" onClick={() => router.push("/dashboard/wishlist")} style={{ cursor: "pointer" }}>
                        <DashboardBox title="Wishlist" value={stats.wishlist_items} />
                    </div>
                </div>


                <div className="card-shadow p-3 mb-4">
                    <h5>Recent Orders</h5>

                    {orders.slice(0, 5).map(order => (
                        <div
                            key={order.id}
                            className="d-flex justify-content-between border-bottom py-2"
                        >
                            <span>Order #{order.id}</span>
                            <span>{order.status}</span>
                        </div>
                    ))}
                </div>

                <div className="card shadow p-3">
                    <h5>Products</h5>
                    <ProductSection />
                </div>

            </div>
        </>
    )
}