import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/Navbar";

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      <html lang="en">
        <body>{children}</body>
      </html>
    </>
  )
}