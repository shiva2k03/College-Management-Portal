import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import { getSession } from "@/lib/auth";
import { setUserRole } from "@/lib/data";

export default function DashboardLayout() {
  useEffect(() => {
    const session = getSession();
    if (session?.role) {
      setUserRole(session.role);
    }
  }, []);

  return (
    <div className="h-screen flex text-gray-800 dark:text-gray-100 dark:bg-gray-900">
      <aside className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 dark:bg-gray-900 border-r border-transparent dark:border-gray-800">
        <Link
          to="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <img src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold">Edventures</span>
        </Link>
        <Menu />
      </aside>
      <main className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] dark:bg-gray-900 overflow-scroll flex flex-col">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}
