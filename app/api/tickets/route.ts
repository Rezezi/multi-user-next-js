import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Create Ticket (POST)
export async function POST(request: Request) {
    try {
        const { flightNumber, airline, destination, departureTime, arrivalTime, price, availability } = await request.json();

        if (!flightNumber || !airline || !destination || !departureTime || !arrivalTime || !price) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
        }

        const ticket = await prisma.ticket.create({
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

        return NextResponse.json(ticket);
    } catch {
        return NextResponse.json({ error: 'Failed to create ticket.' }, { status: 500 });
    }
}

// Get All Tickets (GET)
export async function GET() {
    try {
        const tickets = await prisma.ticket.findMany();
        return NextResponse.json(tickets);
    } catch {
        return NextResponse.json({ error: 'Failed to retrieve tickets.' }, { status: 500 });
    }
}
