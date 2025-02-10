'use client'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface PriceData {
  amount: number
  currency: string
}

interface PriceCalculatorProps {
  deviceModelId: string
  caseType: string
  hasPremiumFinish: boolean
  userCountry: string
}

export function PriceCalculator({
  deviceModelId,
  caseType,
  hasPremiumFinish,
  userCountry
}: PriceCalculatorProps) {
  const [price, setPrice] = useState<PriceData>({ amount: 0, currency: 'NGN' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const abortController = new AbortController()
    const isNigeria = userCountry === 'NG'

    const fetchPrice = async () => {
      try {
        if (!deviceModelId || !caseType) {
          setLoading(false)
          return
        }

        const response = await fetch('/api/calculate-price', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            deviceModelId,
            caseType,
            hasPremiumFinish,
            country: userCountry
          }),
          signal: abortController.signal
        })

        if (!response.ok) {
          throw new Error(`Price calculation failed: ${response.status}`)
        }

        const data = await response.json()
        
        // Validate response format
        if (typeof data.amount !== 'number' || !['NGN', 'USD'].includes(data.currency)) {
          throw new Error('Invalid price response format')
        }

        setPrice(data)
        setError(null)
      } catch (err) {
        if (!abortController.signal.aborted) {
          setError('Failed to calculate price. Please try again.')
          console.error('Price calculation error:', err)
          if (retryCount < 2) {
            setTimeout(() => setRetryCount(prev => prev + 1), 2000)
          }
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchPrice()

    return () => abortController.abort()
  }, [deviceModelId, caseType, hasPremiumFinish, userCountry, retryCount])

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat(currency === 'NGN' ? 'en-NG' : 'en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: currency === 'NGN' ? 0 : 2,
      maximumFractionDigits: currency === 'NGN' ? 0 : 2
    }).format(value)
  }

  return (
    <div className="mt-4 p-4 border rounded-lg bg-muted/20">
      <h3 className="text-lg font-semibold mb-3">Price Estimate</h3>
      
      {error ? (
        <div className="flex flex-col gap-2">
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={() => setRetryCount(prev => prev + 1)}
            className="text-sm text-blue-600 hover:underline"
          >
            Retry calculation
          </button>
        </div>
      ) : loading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <svg
            className="animate-spin h-5 w-5 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Calculating price...</span>
        </div>
      ) : (
        <div className="space-y-2">
          <div className={cn(
            "text-2xl font-bold transition-opacity",
            loading ? 'opacity-50' : 'opacity-100'
          )}>
            {formatCurrency(price.amount, price.currency)}
            <span className="text-sm ml-2 text-muted-foreground font-normal">
              ({price.currency})
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            Includes:
            <ul className="list-disc pl-4 mt-1 space-y-1">
              <li>Case material: {caseType || 'None selected'}</li>
              <li>Device model: {deviceModelId ? 'Selected' : 'None selected'}</li>
              {hasPremiumFinish && <li>Premium image finish</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}