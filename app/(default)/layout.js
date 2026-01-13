import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DefaultLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-white">
      <Navbar />
      {children}
      
    </div>
  );
}
