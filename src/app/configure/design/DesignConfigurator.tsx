'use client'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import NextImage from 'next/image'
import { cn } from '@/lib/utils'
import { Rnd } from 'react-rnd'
import { useState, useRef, useEffect } from 'react'
import HandleComponent from './HandleComponent'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PriceCalculator } from '@/components/PriceCalculator'

// Import Shadcn‑UI dropdown components
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

type CaseType = 'silicon' | 'rubber' | 'leather' | 'polycarbonate'
type CaseColor =
  | 'bg-blue-950'
  | 'bg-red-600'
  | 'bg-emerald-950'
  | 'bg-gray-200'
  | 'bg-purple-900'
  | 'bg-pink-600'

interface DesignConfiguratorProps {
  configId: string
  imageUrl: string
  imageDimensions: { width: number; height: number }
}

// interface DeviceBrand {
//   brand: string
//   models: string[]
// }

interface DeviceBrand {
  brand: string
  models: Array<{
    id: string
    name: string
    basePrice: number
  }>
}

const DesignConfigurator = ({
  configId,
  imageUrl,
  imageDimensions,
}: DesignConfiguratorProps) => {
  // Allow empty string for no selection
  const [selectedCaseType, setSelectedCaseType] = useState<CaseType | "">("")

  const [selectedColor, setSelectedColor] = useState<CaseColor>('bg-blue-950')
  const [selectedModel, setSelectedModel] = useState('')
  const [selectedModelId, setSelectedModelId] = useState<string>('')
  const [selectedBrand, setSelectedBrand] = useState('')
  const [deviceModels, setDeviceModels] = useState<DeviceBrand[]>([])

  const [userCountry, setUserCountry] = useState('NG') // Default to Nigeria
  const hasPremiumFinish = !!imageUrl

  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dimension, setDimension] = useState({
    width: imageDimensions.width / 12,
    height: imageDimensions.height / 12,
  })
  const [isEditing, setIsEditing] = useState(false)
  const maskRef = useRef<HTMLDivElement>(null)

  const cloudinaryImageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${imageUrl}`

  const caseTypes: { type: CaseType; label: string }[] = [
    { type: 'silicon', label: 'Silicon' },
    { type: 'polycarbonate', label: 'Polycarbonate' },
    { type: 'rubber', label: 'Rubber' },
    { type: 'leather', label: 'Leather' },
  ]

  const colorOptions: { color: CaseColor; name: string }[] = [
    { color: 'bg-blue-950', name: 'Navy Blue' },
    { color: 'bg-red-600', name: 'Crimson Red' },
    { color: 'bg-emerald-950', name: 'Forest Green' },
    { color: 'bg-gray-200', name: 'Cloud White' },
    { color: 'bg-purple-900', name: 'Royal Purple' },
    { color: 'bg-pink-600', name: 'Royal Pink' },
  ]

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        setUserCountry(data.country || 'NG')
      } catch (error) {
        console.error('Error detecting country:', error)
        setUserCountry('NG')
      }
    }
    fetchCountry()
  }, [])

  // Fetch device models from our API route when the component mounts
  // useEffect(() => {
  //   async function fetchDeviceModels() {
  //     try {
  //       const res = await fetch('/api/device-models')
  //       if (!res.ok) {
  //         throw new Error('Failed to fetch device models')
  //       }
  //       const data = (await res.json()) as DeviceBrand[]
  //       setDeviceModels(data)
  //       // Optionally, set a default selected brand and model
  //       if (data.length) {
  //         setSelectedBrand(data[0].brand)
  //         if (data[0].models.length) {
  //           setSelectedModel(data[0].models[0])
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error fetching device models:', error)
  //     }
  //   }
  //   fetchDeviceModels()
  // }, [])

  useEffect(() => {
    const fetchDeviceModels = async () => {
      try {
        const res = await fetch('/api/device-models')
        if (!res.ok) throw new Error('Failed to fetch models')
          const data = await res.json()
          console.log(data)
        
        const transformedData = data.map((brand: any) => ({
          brand: brand.brand,
          models: brand.models.map((model: any) => ({
            id: model.id,
            name: model.name,
            basePrice: model.basePrice
          }))
        }))

        setDeviceModels(transformedData)

        if (transformedData.length > 0) {
          const firstBrand = transformedData[0]
          setSelectedBrand(firstBrand.brand)
          if (firstBrand.models.length > 0) {
            setSelectedModelId(firstBrand.models[0].id)
          }
        }
      } catch (error) {
        console.error('Device models fetch error:', error)
      }
    }
    fetchDeviceModels()
  }, [])


  const handleBrandSelect = (brand: string) => {
    const selectedBrandData = deviceModels.find(b => b.brand === brand)
    if (selectedBrandData) {
      setSelectedBrand(brand)
      if (selectedBrandData.models.length > 0) {
        setSelectedModelId(selectedBrandData.models[0].id)
      }
    }
  }



  // useEffect(() => {
  //   fetch('https://ipapi.co/json/')
  //     .then(res => res.json())
  //     .then(data => setUserCountry(data.country))
  //     .catch(() => setUserCountry('NG'))
  // }, [])

  return (
    <div className="relative pt-5 grid grid-cols-3 pb-5">
      {/* Left: Phone and image configuration */}
      <div className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
        <div className="relative w-60 bg-opacity-50">
          <AspectRatio
            ratio={896 / 1831}
            className="relative z-50 aspect-[896/1831] w-full"
          >
            <NextImage
              alt="phone image"
              src="/phone-template.png"
              className="pointer-events-none select-none z-50"
              fill
            />
            <div
              ref={maskRef}
              className={`absolute inset-0 z-40 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(173,216,230,0.6)] ${
                !isEditing ? 'overflow-hidden' : 'overflow-visible'
              }`}
            >
              <Rnd
                position={position}
                onDragStop={(e, data) => setPosition({ x: data.x, y: data.y })}
                onResize={(e, direction, ref) => {
                  setDimension({
                    width: ref.offsetWidth,
                    height: ref.offsetHeight,
                  })
                }}
                size={dimension}
                enableResizing={isEditing}
                enableDragging={isEditing}
                lockAspectRatio={true}
                className={`z-[60] ${!isEditing ? 'pointer-events-none' : ''} absolute border-[3px] border-primary`}
                default={{
                  x: 0,
                  y: 0,
                  width: imageDimensions.width / 4,
                  height: imageDimensions.height / 4,
                }}
                resizeHandleComponent={{
                  bottomRight: <HandleComponent />,
                  bottomLeft: <HandleComponent />,
                  topRight: <HandleComponent />,
                  topLeft: <HandleComponent />,
                }}
              >
                <div className="relative w-full h-full">
                  <NextImage
                    src={cloudinaryImageUrl}
                    fill
                    alt="your image"
                    style={{ objectFit: 'contain' }}
                    className={`${isEditing ? 'cursor-move' : 'cursor-default'}`}
                    draggable={false}
                  />
                </div>
              </Rnd>
            </div>
            <div
              className={cn(
                'absolute inset-0 left-[3px] bottom-px rounded-[32px] flex-1',
                selectedColor,
                {
                  'border-[3px] border-gray-300': selectedCaseType === 'leather',
                  'opacity-95': selectedCaseType === 'silicon',
                  'shadow-lg': selectedCaseType === 'rubber',
                }
              )}
            />
          </AspectRatio>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="col-span-1 flex flex-col items-start justify-center gap-6 pl-4">
        {/* Edit Position Button */}
        <div className="w-full space-y-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-base"
          >
            {isEditing ? 'Done Editing' : 'Edit Image Position'}
          </button>
          <div className="text-sm text-muted-foreground">
            {isEditing ? (
              <span>
                Double-click to drag and resize your image, then click Done when finished
              </span>
            ) : (
              <span>Click Edit to adjust image position and size</span>
            )}
          </div>
        </div>

        {/* Case Type Selection */}
        <div className="w-full space-y-2">
          <h3 className="text-base font-semibold">Case Type</h3>
          <DropdownMenu>
            <DropdownMenuTrigger className="px-4 py-2 text-base rounded-lg border transition-all bg-white border-gray-200 hover:border-blue-400">
              {selectedCaseType === ""
                ? "Select Case Type"
                : caseTypes.find(ct => ct.type === selectedCaseType)?.label}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {caseTypes.map(({ type, label }) => (
                <DropdownMenuItem
                  key={type}
                  onClick={() => setSelectedCaseType(type)}
                  className="text-base"
                >
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Device Model Selection */}
        <div className="w-full space-y-2">
          <h3 className="text-base font-semibold">Device Model</h3>
          {/* Brand selection */}
          <div className="flex gap-2 mb-2">
            {deviceModels.map((brandGroup) => (
              <button
                key={brandGroup.brand}
                onClick={() => handleBrandSelect(brandGroup.brand)}
                className={cn(
                  'px-4 py-2 text-base rounded-lg border transition-all',
                  selectedBrand === brandGroup.brand
                    ? 'border-blue-600 bg-blue-100'
                    : 'border-gray-200 hover:border-blue-400'
                )}
              >
                {brandGroup.brand}
              </button>
            ))}
          </div>
          {/* Model selection */}
          <ScrollArea className="h-[150px] rounded-md border p-3">
            <div className="space-y-2">
              {deviceModels.length > 0 && selectedBrand ? (
                deviceModels
                  .find(brandGroup => brandGroup.brand === selectedBrand)
                  ?.models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setSelectedModelId(model.id)}
                      className={cn(
                        'w-full p-2 text-base rounded-md border transition-colors',
                        selectedModelId === model.id
                          ? 'border-blue-600 bg-blue-100'
                          : 'border-gray-200 hover:border-blue-400'
                      )}
                    >
                      {model.name}
                    </button>
                  ))
              ) : (
                <div className="text-sm text-muted-foreground">
                  Loading device models…
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Color Selection */}
        <div className="w-full space-y-2">
          <h3 className="text-base font-semibold">Case Color</h3>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map(({ color, name }) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  'w-10 h-10 rounded-full border-2 transition-all',
                  color,
                  selectedColor === color
                    ? 'border-blue-600 ring-2 ring-blue-400'
                    : 'border-gray-200 hover:border-blue-400'
                )}
                title={name}
              />
            ))}
          </div>
        </div>

        {/* Price Calculator */}
        <div className="w-full space-y-2">
          <PriceCalculator
            deviceModelId={selectedModelId}
            caseType={selectedCaseType}
            hasPremiumFinish={hasPremiumFinish}
            userCountry={userCountry}
          />
        </div>
      </div>
    </div>
  )
}

export default DesignConfigurator
