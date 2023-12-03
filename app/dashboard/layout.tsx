import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 lg:pl-64 fixed top-0 inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 lg:w-64 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 lg:pl-64 h-full pt-[80px] overflow-y-scroll">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
