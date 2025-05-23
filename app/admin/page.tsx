"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Ticket {
  id: string;
  flightNumber: string;
  airline: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availability: string;
}

export default function AdminPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const fetchTickets = async () => {
    const res = await fetch("/api/tickets");
    const data = await res.json();
    setTickets(data);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah kamu yakin ingin menghapus tiket ini?")) {
      const res = await fetch(`/api/delete-ticket?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Tiket berhasil dihapus");
        fetchTickets();
      } else {
        alert("Gagal menghapus tiket");
      }
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 to-blue-800 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto p-8 bg-gray-900 shadow-xl rounded-2xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-400">Daftar Tiket</h1>
        <div className="flex justify-between mb-6">
          <Link href="/admin/create" className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition-all">
            Tambah Tiket
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm bg-gray-800 text-white shadow rounded-lg">
            <thead>
              <tr className="bg-blue-700 text-white">
                {["Flight Number", "Airline", "Destination", "Departure Time", "Arrival Time", "Price", "Availability", "Aksi"].map((heading) => (
                  <th key={heading} className="p-4 text-left">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                  <td className="p-4">{ticket.flightNumber}</td>
                  <td className="p-4">{ticket.airline}</td>
                  <td className="p-4">{ticket.destination}</td>
                  <td className="p-4">{new Date(ticket.departureTime).toLocaleString()}</td>
                  <td className="p-4">{new Date(ticket.arrivalTime).toLocaleString()}</td>
                  <td className="p-4">${ticket.price.toFixed(2)}</td>
                  <td className="p-4">{ticket.availability}</td>
                  <td className="p-4 flex gap-2">
                    <Link
                      href={`/admin/edit/${ticket.id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-all"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(ticket.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
