// app/api/calculate-price/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/db' // your Prisma client instance
import {
  CASE_TYPE_MULTIPLIER,
  PREMIUM_FINISH_PRICE,
  USD_CONVERSION_RATE,
} from '@/lib/pricing'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // 1 hour cache


interface PricingRequestBody {
  deviceModelId: string
  caseType: string
  hasPremiumFinish: boolean
  // Pass country code from the client (or you could detect it server‑side too)
  country: string
}

interface DeviceBrandDTO {
  brand: string
  models: Array<{
    id: string
    name: string
    basePrice: number
  }>
}


export async function POST(req: Request) {
  try {
    const {
      deviceModelId,
      caseType,
      hasPremiumFinish,
      country,
    } = (await req.json()) as PricingRequestBody

    // Look up the device model (and optionally the brand) from the DB
    const deviceModel = await db.deviceModel.findUnique({
      where: { id: deviceModelId },
      include: { deviceBrand: true },
    })

    if (!deviceModel) {
      return NextResponse.json(
        { error: 'Device model not found' },
        { status: 404 },
      )
    }

    const basePrice = deviceModel.basePrice // in Naira
    const multiplier =
      CASE_TYPE_MULTIPLIER[caseType as keyof typeof CASE_TYPE_MULTIPLIER] || 1
    let total = basePrice * multiplier
    if (hasPremiumFinish) total += PREMIUM_FINISH_PRICE

    let amount: number
    let currency: string

    if (country !== 'NG') {
      // Calculate a fractional USD price with 2 decimals
      amount = Number((total / USD_CONVERSION_RATE).toFixed(2))
      currency = 'USD'
    } else {
      amount = total
      currency = 'NGN'
    }

    // (Optional) Here you could add caching logic for repeated calculations.

    return NextResponse.json({ amount, currency })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'An error occurred while calculating the price.' },
      { status: 500 },
    )
  }
}


export async function GET() {
  try {
    const brands = await db.deviceBrand.findMany({
      include: {
        models: {
          select: {
            id: true,
            name: true,
            basePrice: true,
            deviceBrandId: true,
          },
          orderBy: { name: 'asc' },
        },
      },
      orderBy: { name: 'asc' },
    })

    const responseData: DeviceBrandDTO[] = brands.map((brand) => ({
      brand: brand.name,
      models: brand.models.map((model) => ({
        id: model.id,
        name: model.name,
        basePrice: model.basePrice,
      })),
    }))

    return NextResponse.json(responseData, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
      },
    })
  } catch (error) {
    console.error('[DEVICE_MODELS_API_ERROR]', error)

    return NextResponse.json(
      {
        error: 'Failed to load device models',
        details:
          process.env.NODE_ENV === 'development'
            ? error instanceof Error
              ? error.message
              : String(error)
            : undefined,
      },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/problem+json',
        },
      },
    )
  }
}
