import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminLayout({ children }) {
    return (
        <html>
            <body style={{ background: "#f5f7fb" }}>
                {children}
            </body>
        </html>
    );
}
