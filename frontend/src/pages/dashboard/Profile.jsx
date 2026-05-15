import { getSession } from "@/lib/auth";
import { role } from "@/lib/data";

export default function ProfilePage() {
  const session = getSession();
  const displayRole = session?.role || role;
  const idLabel =
    displayRole === "Admin"
      ? "Admin ID"
      : displayRole === "Teacher"
        ? "Teacher ID"
        : "Student ID";

  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-md flex-1 m-4 mt-0 text-gray-800 dark:text-gray-100">
      <h1 className="text-lg font-semibold mb-6">Profile</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
        <article className="p-4 rounded-lg bg-lamaSkyLight dark:bg-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Name</p>
          <p className="font-medium">{session?.name || "—"}</p>
        </article>
        <article className="p-4 rounded-lg bg-lamaPurpleLight dark:bg-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Institute</p>
          <p className="font-medium">{session?.instituteName || "—"}</p>
        </article>
        <article className="p-4 rounded-lg bg-lamaYellowLight dark:bg-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Role</p>
          <p className="font-medium capitalize">{displayRole}</p>
        </article>
        <article className="p-4 rounded-lg bg-slate-50 dark:bg-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">{idLabel}</p>
          <p className="font-medium">{session?.rollNumber || "—"}</p>
        </article>
        <article className="p-4 rounded-lg bg-slate-50 dark:bg-gray-700 md:col-span-2">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">Email</p>
          <p className="font-medium">{session?.email || "—"}</p>
        </article>
      </section>
    </section>
  );
}
