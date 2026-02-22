import DNavbar from "@/components/DNavbar";

export default function AboutLayout({ children }) {
  return (
    <>
      <DNavbar />
      {children}
    </>
  );
}
