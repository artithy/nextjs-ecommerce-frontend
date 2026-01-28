import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminLayout({ children }) {
    return (
        <div style={{ background: "#f5f7fb", minHeight: "100vh" }}>
            {children}
        </div>
    );
}
