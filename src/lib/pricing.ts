export const CASE_TYPE_MULTIPLIER = {
  silicon: 1.4,
  rubber: 1.0,
  leather: 1.6,
  polycarbonate: 1.2
} as const

export const PREMIUM_FINISH_PRICE = 5000 // Naira
export const USD_CONVERSION_RATE = 550 // 1 USD

export type CaseType = keyof typeof CASE_TYPE_MULTIPLIER

interface PriceCalculationConfig {
  basePrice: number
  caseType: CaseType
  hasPremiumFinish: boolean
  countryCode: string
}

interface PriceResult {
  amount: number
  currency: 'NGN' | 'USD'
  formatted: string
  breakdown: {
    base: number
    materialMultiplier: number
    premiumFinish: number
  }
}

export function calculatePrice(config: PriceCalculationConfig): PriceResult {
  // Validate inputs
  if (!Number.isFinite(config.basePrice) || config.basePrice <= 0) {
    throw new Error('Invalid base price')
  }

  if (!Object.keys(CASE_TYPE_MULTIPLIER).includes(config.caseType)) {
    throw new Error(`Invalid case type: ${config.caseType}`)
  }

  // Calculate components
  const materialMultiplier = CASE_TYPE_MULTIPLIER[config.caseType]
  const baseAmount = config.basePrice
  const materialAdjusted = baseAmount * materialMultiplier
  const premiumFinish = config.hasPremiumFinish ? PREMIUM_FINISH_PRICE : 0
  const totalNaira = materialAdjusted + premiumFinish

  // Determine currency conversion
  const isNigeria = config.countryCode === 'NG'
  const currency = isNigeria ? 'NGN' : 'USD'
  const amount = isNigeria ? totalNaira : totalNaira / USD_CONVERSION_RATE

  // Format numbers
  const formatter = new Intl.NumberFormat(isNigeria ? 'en-NG' : 'en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'NGN' ? 0 : 2,
    maximumFractionDigits: currency === 'NGN' ? 0 : 2
  })

  return {
    amount: currency === 'NGN' ? Math.round(amount) : Number(amount.toFixed(2)),
    currency,
    formatted: formatter.format(amount),
    breakdown: {
      base: config.basePrice,
      materialMultiplier,
      premiumFinish
    }
  }
}

export function validateCaseType(caseType: string): caseType is CaseType {
  return Object.keys(CASE_TYPE_MULTIPLIER).includes(caseType)
}

// Utility for currency conversions
export function convertCurrency(amount: number, from: 'NGN' | 'USD', to: 'NGN' | 'USD') {
  if (from === to) return amount
  return from === 'NGN' 
    ? Number((amount / USD_CONVERSION_RATE).toFixed(2))
    : Number((amount * USD_CONVERSION_RATE).toFixed(2))
}

// Historical rate tracking (optional)
interface ConversionRate {
  date: Date
  rate: number
}

const conversionHistory: ConversionRate[] = []

export function updateConversionRate(newRate: number) {
  conversionHistory.push({
    date: new Date(),
    rate: newRate
  })
}

export function getCurrentConversionRate() {
  return USD_CONVERSION_RATE
}