// app/api/device-models/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function GET() {
  // Fetch all device brands with their models from the database.
  const brands = await prisma.deviceBrand.findMany({
    include: { models: true },
  });

  // Transform the data to the shape { brand: string, models: string[] }
  const data = brands.map((brand) => ({
    brand: brand.name,
    models: brand.models.map((m) => m.name),
  }));

  return NextResponse.json(data);
}
