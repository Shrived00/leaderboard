import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        // Retrieve the current data and previous data from the database
        const currentData = await prisma.currentData.findFirst();
        const previousData = await prisma.previousData.findFirst();

        // Check if both currentData and previousData are not null
        if (currentData && previousData) {
            // Swap the values of current data with previous data
            const tempValues = currentData.values;
            const tempNames = currentData.names;
            await prisma.currentData.update({
                where: { id: currentData.id },
                data: {
                    values: previousData.values,
                    names: previousData.names,
                },
            });
            await prisma.previousData.update({
                where: { id: previousData.id },
                data: {
                    values: tempValues,
                    names: tempNames,
                },
            });

            // Return a success response
            return NextResponse.json({ message: 'Data switched successfully' });
        } else {
            // Return an error response if either currentData or previousData is null
            return NextResponse.error();
        }
    } catch (error) {
        // Log the error
        console.error('Error switching data:', error);

        // Return an error response
        return NextResponse.error();
    }
}
