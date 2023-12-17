import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-[300px]  fixed top-0 inset-y-0 w-full z-50 md:hidden">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-[300px]  flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-[300px]  pt-[80px] md:pt-0 overflow-y-scroll min-h-full">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
