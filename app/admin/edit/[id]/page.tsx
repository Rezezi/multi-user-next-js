import { prisma } from "@/lib/prisma";
import EditTicket from "./EditTicket";

export default async function EditTicketPage({ params }: { params: { id: string } }) {
  // Ambil data tiket dari database
  const ticket = await prisma.ticket.findUnique({
    where: { id: params.id },
  });

  // Jika tiket tidak ditemukan, tampilkan pesan error
  if (!ticket) {
    return <div>Tiket tidak ditemukan</div>;
  }

  return <EditTicket ticket={{ ...ticket, departureTime: ticket.departureTime.toISOString(), arrivalTime: ticket.arrivalTime.toISOString() }} />;
}
