import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Get Ticket by ID (GET)
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const ticket = await prisma.ticket.findUnique({
            where: { id: params.id },
        });

        if (!ticket) return NextResponse.json({ error: 'Ticket not found.' }, { status: 404 });

        return NextResponse.json(ticket);
    } catch {
        return NextResponse.json({ error: 'Failed to retrieve ticket.' }, { status: 500 });
    }
}

// Update Ticket by ID (PUT)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { flightNumber, airline, destination, departureTime, arrivalTime, price, availability } = await request.json();

        const updatedTicket = await prisma.ticket.update({
            where: { id: params.id },
            data: {
                flightNumber,
                airline,
                destination,
                departureTime: new Date(departureTime),
                arrivalTime: new Date(arrivalTime),
                price: parseFloat(price),
                availability: availability || 0
            }
        });

        return NextResponse.json(updatedTicket);
    } catch {
        return NextResponse.json({ error: 'Failed to update ticket.' }, { status: 500 });
    }
}

// Delete Ticket by ID (DELETE)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.ticket.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ message: 'Ticket deleted successfully.' });
    } catch {
        return NextResponse.json({ error: 'Failed to delete ticket.' }, { status: 500 });
    }
}
