import { NextResponse } from 'next/server'
import { db } from '@/db'
import {
  CASE_TYPE_MULTIPLIER,
  PREMIUM_FINISH_PRICE,
  USD_CONVERSION_RATE
} from '@/lib/pricing'
import type { CaseType } from '@/lib/pricing'

export const dynamic = 'force-dynamic' // Necessary for Vercel deployments

interface ValidatedRequest {
  deviceModelId: string
  caseType: string
  hasPremiumFinish: boolean
  country: string
}

const validateRequest = (body: any): body is ValidatedRequest => {
  return (
    typeof body.deviceModelId === 'string' &&
    typeof body.caseType === 'string' &&
    typeof body.hasPremiumFinish === 'boolean' &&
    typeof body.country === 'string'
  )
}

export async function POST(req: Request) {
  try {
    const requestBody = await req.json()
    
    // Validate request structure
    if (!validateRequest(requestBody)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }

    const { deviceModelId, caseType, hasPremiumFinish, country } = requestBody

    // Validate case type
    if (!Object.keys(CASE_TYPE_MULTIPLIER).includes(caseType)) {
      return NextResponse.json(
        { error: 'Invalid case type specified' },
        { status: 400 }
      )
    }

    // Fetch device model with Prisma
    const deviceModel = await db.deviceModel.findUnique({
      where: { id: deviceModelId },
      select: {
        id: true,
        basePrice: true,
        name: true,
        deviceBrand: {
          select: {
            name: true
          }
        }
      }
    })

    if (!deviceModel) {
      return NextResponse.json(
        { error: 'Specified device model not found' },
        { status: 404 }
      )
    }

    // Calculate base price components
    const basePrice = deviceModel.basePrice
    console.log("base price:", basePrice)
    console.log("device model", deviceModel.name)
    const multiplier = CASE_TYPE_MULTIPLIER[caseType as CaseType]
    let total = Math.round(basePrice * multiplier)
    console.log(total)

    // Add premium finish if selected
    if (hasPremiumFinish) {
      total += PREMIUM_FINISH_PRICE
    }

    // Determine currency conversion
    const isNigeria = country === 'NG'
    const amount = isNigeria
      ? Math.round(total) // Round to nearest whole number for NGN
      : parseFloat((total / USD_CONVERSION_RATE).toFixed(2)) // 2 decimal places for USD

    const currency = isNigeria ? 'NGN' : 'USD'

    // Audit log (optional)
    try {
      await db.priceCalculationLog.create({
        data: {
          deviceModelId,
          caseType,
          hasPremiumFinish,
          country,
          calculatedAmount: amount,
          currency
        }
      })
    } catch (logError) {
      console.warn("failed to log price price calculation:", logError)
    }

    return NextResponse.json({
      amount,
      currency,
      brand: deviceModel.deviceBrand.name
    })

  } catch (error) {
    console.error('[PRICE_API_ERROR]', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Please try again later'
      },
      { status: 500 }
    )
  }
}