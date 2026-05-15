import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";

export default function SettingsPage() {
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-md flex-1 m-4 mt-0 text-gray-800 dark:text-gray-100">
      <h1 className="text-lg font-semibold mb-6">Settings</h1>

      <section className="flex items-center justify-between gap-4 p-4 mb-6 rounded-lg bg-slate-50 dark:bg-gray-700 max-w-lg">
        <span>
          <span className="block font-medium">Appearance</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Currently using {theme} mode
          </span>
        </span>
        <ThemeToggle />
      </section>

      <form
        className="flex flex-col gap-6 max-w-lg"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Settings saved.");
        }}
      >
        <label className="flex items-center justify-between gap-4 cursor-pointer">
          <span>
            <span className="block font-medium">Push notifications</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Alerts for announcements and messages
            </span>
          </span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="w-5 h-5 accent-green-600"
          />
        </label>
        <label className="flex items-center justify-between gap-4 cursor-pointer">
          <span>
            <span className="block font-medium">Email updates</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Weekly summary to your registered email
            </span>
          </span>
          <input
            type="checkbox"
            checked={emailUpdates}
            onChange={(e) => setEmailUpdates(e.target.checked)}
            className="w-5 h-5 accent-green-600"
          />
        </label>
        <button
          type="submit"
          className="bg-lamaYellow text-gray-800 py-2 px-4 rounded-md w-max font-medium"
        >
          Save settings
        </button>
      </form>
    </section>
  );
}
