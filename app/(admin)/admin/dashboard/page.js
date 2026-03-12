"use client";

import { useEffect, useState } from "react";
import DashboardBox from "@/components/DashboardBox";
import { Chart } from "primereact/chart";

export default function DashboardHome() {
    const [stats, setStats] = useState({});
    const [dayChart, setDayChart] = useState({
        labels: [],
        data: []
    });
    const [hourChart, setHourChart] = useState({
        labels: [],
        data: []
    });

    const fetchDashboard = async () => {
        try {

            const token = localStorage.getItem("admin_token");
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }

            const resStats = await fetch(
                "http://127.0.0.1:8000/api/admin/dashboard/boxes",
                { headers }
            );
            const statsData = await resStats.json();
            setStats(statsData);



            const resDays = await fetch(
                "http://127.0.0.1:8000/api/admin/dashboard/boxes",
                { headers }
            );
            const daysData = await resStats.json();
            setDayChart(daysData);


            const resHours = await fetch(
                "http://127.0.0.1:8000/api/admin/dashboard/boxes",
                { headers }
            );
            const hoursData = await resStats.json();
            setHourChart(hoursData);
        } catch {
            console.log("Dashboard Error:", error);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const dayChartData = {
        labels: dayChart.labels,
        datasets: [
            {
                labels: "Orders",
                backgroundColor: "#6366F1",
                data: dayChart.data,
            },
        ],
    };


    const hourChartData = {
        labels: hourChart.labels,
        datasets: [
            {
                labels: "Orders",
                borderColor: "#10B981",
                fill: false,
                data: hourChart.data,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return (
        <div className="container-fluid">
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <DashboardBox
                        title="Total Users"
                        value={stats.total_users}
                    />
                </div>

                <div className="col-md-3">
                    <DashboardBox
                        title="Total Products"
                        value={stats.total_products}
                    />
                </div>

                <div className="col-md-3">
                    <DashboardBox
                        title="Total Orders"
                        value={stats.total_orders}
                    />
                </div>

                <div className="col-md-3">
                    <DashboardBox
                        title="Pending Orders"
                        value={stats.pending_orders}
                    />
                </div>
            </div>

            <div className="row g-4 mt-5">
                <div className="col-md-6">
                    <div className="card shadow p-3">
                        <h5 className="">
                            Orders (Last 7 Days)
                        </h5>

                        <Chart
                            type="bar"
                            data={dayChartData}
                            options={chartOptions}
                        />
                    </div>

                </div>




                <div className="col-md-6">
                    <div className="card shadow p-3">
                        <h5 className="">
                            Orders (Today by Hours)
                        </h5>

                        <Chart
                            type="line"
                            data={hourChartData}
                            options={chartOptions}
                        />
                    </div>

                </div>
            </div>

        </div>
    )

}