"use client";
export default function DashboardBox({ title, value }) {
    return (<>
        <div className="card shadow-sm p-4 text-center h-100">
            <h6 className="text-muted mb-2">
                {title}
            </h6>

            <h3 className="fw-bold text-primary">
                {value ?? 0}
            </h3>
        </div>
    </>)
}