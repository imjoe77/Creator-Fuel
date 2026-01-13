import DNavbar from "@/components/DNavbar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <DNavbar />
      {children}
    </>
  );
}
