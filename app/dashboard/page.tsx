"use client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // Hapus token
    router.push("/login"); // Redirect ke halaman login
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full sm:w-96 text-center">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">Welcome to Your Dashboard</h1>
        <p className="text-lg text-gray-700 mb-4">Hello, User! Here is your personalized dashboard.</p>

        <div className="space-y-4">
          <div className="p-6 bg-blue-50 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
            <h2 className="text-xl font-semibold text-blue-600">Recent Activity</h2>
            <p className="text-gray-600">Check your recent activities and updates here.</p>
          </div>
          <div className="p-6 bg-yellow-50 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
            <h2 className="text-xl font-semibold text-yellow-600">Notifications</h2>
            <p className="text-gray-600">You have 3 new notifications.</p>
          </div>
          <div className="p-6 bg-purple-50 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
            <h2 className="text-xl font-semibold text-purple-600">Settings</h2>
            <p className="text-gray-600">Update your profile settings and preferences.</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
