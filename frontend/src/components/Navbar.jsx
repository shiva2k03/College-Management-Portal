import { getSession } from "@/lib/auth";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const session = getSession();

  return (
    <header className="flex items-center justify-between p-4 dark:text-gray-100">
      <section className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 dark:ring-gray-600 px-2">
        <img src="/search.png" alt="" width={14} height={14} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none dark:text-gray-100 dark:placeholder-gray-400"
        />
      </section>

      <section className="flex items-center gap-4 justify-end w-full">
        <ThemeToggle />
        <span className="bg-white dark:bg-gray-700 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <img src="/message.png" alt="" width={20} height={20} />
        </span>
        <span className="bg-white dark:bg-gray-700 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <img src="/announcement.png" alt="" width={20} height={20} />
          <span className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
            1
          </span>
        </span>
        <section className="flex flex-col">
          <span className="text-xs leading-3 font-medium">
            {session?.name || "User"}
          </span>
          <span className="text-[10px] text-gray-500 dark:text-gray-400 text-right capitalize">
            {session?.role || "Guest"}
          </span>
        </section>
        <img src="/avatar.png" alt="" width={36} height={36} className="rounded-full" />
      </section>
    </header>
  );
};

export default Navbar;
