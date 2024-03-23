import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { names, values } = body;

        // Check if there is existing data in PreviousData
        const existingPreviousData = await prisma.previousData.findFirst();

        // Check if there is existing data in CurrentData
        const existingData = await prisma.currentData.findFirst();

        // If existing data is found, save it to PreviousData
        if (existingPreviousData && existingData) {
            await prisma.previousData.deleteMany();
            await prisma.previousData.create({
                data: {
                    names: existingData.names,
                    values: existingData.values
                }
            });
        } else if (existingData) {
            await prisma.previousData.create({
                data: {
                    names: existingData.names,
                    values: existingData.values
                }
            });
        }

        // If existing data is found, delete it
        if (existingData) {
            await prisma.currentData.delete({
                where: {
                    id: existingData.id
                }
            });
        }

        // Create new current data
        const newData = await prisma.currentData.create({
            data: {
                names,
                values
            }
        });

        return NextResponse.json(newData);
    } catch (error) {
        console.error('Error handling request:', error);
        return NextResponse.error();
    }
}


export async function GET(request: Request) {
    try {
        // Retrieve names and values from CurrentData
        const currentData = await prisma.currentData.findFirst();
        const currentNames = currentData?.names ?? [];
        const currentValues = currentData?.values ?? [];

        return NextResponse.json({ names: currentNames, values: currentValues });
    } catch (error) {
        console.error('Error handling request:', error);
        return NextResponse.error();
    }
}


export async function PUT(request: Request) {
    try {
        // Extract the updated data from the request body
        const body = await request.json();
        const { values } = body;

        console.log(values)

        // Update the data in the database


        await prisma.currentData.updateMany({
            data: {
                values: values,
            },
        });

        // Return a success response
        return NextResponse.json({ message: 'Data updated successfully' });
    } catch (error) {
        // Return an error response if there's an error
        console.error('Error handling request:', error);
        return NextResponse.error();
    }
}