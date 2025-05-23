"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface EditTicketProps {
  ticket: {
    id: string;
    flightNumber: string;
    airline: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
    availability: number;
  };
}

export default function EditTicket({ ticket }: EditTicketProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    flightNumber: ticket.flightNumber,
    airline: ticket.airline,
    destination: ticket.destination,
    departureTime: ticket.departureTime,
    arrivalTime: ticket.arrivalTime,
    price: ticket.price.toString(),
    availability: ticket.availability.toString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/tickets/${ticket.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        availability: parseInt(form.availability)
      }),
    });

    if (res.ok) {
      router.push("/admin");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Edit Tiket</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="flightNumber"
          placeholder="Nomor Penerbangan"
          value={form.flightNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="airline"
          placeholder="Maskapai"
          value={form.airline}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="destination"
          placeholder="Tujuan"
          value={form.destination}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="datetime-local"
          name="departureTime"
          value={form.departureTime}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="datetime-local"
          name="arrivalTime"
          value={form.arrivalTime}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Harga"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="availability"
          placeholder="Ketersediaan"
          value={form.availability}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update Tiket</button>
      </form>
    </div>
  );
}
