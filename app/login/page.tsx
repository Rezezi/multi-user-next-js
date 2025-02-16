"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const data = await res.json();

      console.log(data); // Debug: Periksa respons dan pastikan role ada

      // Pastikan data.role berisi 'ADMIN'
      if (data.role === "ADMIN") {
        console.log("Redirecting to admin page..."); // Debug log
        router.push("/admin"); // Redirect ke halaman admin jika role adalah 'ADMIN'
      } else if (data.role === "USER") {
        console.log("Redirecting to user dashboard..."); // Debug log
        router.push("/dashboard"); // Redirect ke halaman dashboard jika role adalah 'USER'
      } else {
        alert("Unknown role");
      }
    } else {
      alert("Login gagal!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login to Your Account</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Dont have an account? <a href="/register" className="text-indigo-500 hover:underline">Register here</a>.
        </p>
      </div>
    </div>
  );
}
