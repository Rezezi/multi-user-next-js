"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  interface Ticket {
    id: number;
    flightNumber: string;
    airline: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
    availability: string;
  }

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTickets = async () => {
      const res = await fetch("/api/tickets");
      const data = await res.json();
      setTickets(data);
    };
    fetchTickets();
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/login");
  };

  const handlePesan = (id: number) => {
    alert(`Tiket dengan ID ${id} berhasil dipesan!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Dashboard Tiket</h1>
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="p-4 border border-gray-300 rounded-lg bg-gray-50">
              <h2 className="text-xl font-semibold text-blue-600">
                {ticket.flightNumber} - {ticket.airline}
              </h2>
              <p className="text-sm text-gray-700">Tujuan: {ticket.destination}</p>
              <p className="text-sm text-gray-700">Keberangkatan: {ticket.departureTime}</p>
              <p className="text-sm text-gray-700">Kedatangan: {ticket.arrivalTime}</p>
              <p className="text-sm text-gray-700">Harga: Rp{ticket.price}</p>
              <p className="text-sm text-gray-700">Ketersediaan: {ticket.availability}</p>
              <button
                onClick={() => handlePesan(ticket.id)}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-full"
              >
                Pesan
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={handleLogout}
          className="mt-6 w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
