'use client'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import NextImage from 'next/image'
import { cn } from '@/lib/utils'
import { Rnd } from 'react-rnd'
import { useState, useRef, useEffect } from 'react'
import HandleComponent from './HandleComponent'
import { ScrollArea } from '@/components/ui/scroll-area'

type CaseType = 'silicon' | 'rubber' | 'leather'
type CaseColor = 'bg-blue-950' | 'bg-red-600' | 'bg-emerald-950' | 'bg-gray-200' | 'bg-purple-900'

interface DesignConfiguratorProps {
  configId: string
  imageUrl: string
  imageDimensions: { width: number; height: number }
}

interface DeviceBrand {
  brand: string
  models: string[]
}

const deviceModels = [
  { brand: 'iPhone', models: ['iPhone 15', 'iPhone 15 Pro', 'iPhone 14', 'iPhone 14 Pro Max'] },
  { brand: 'Samsung', models: ['Galaxy S23', 'Galaxy Z Flip', 'Galaxy S22 Ultra', 'Galaxy A54'] }
]

const DesignConfigurator = ({
  configId,
  imageUrl,
  imageDimensions,
}: DesignConfiguratorProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dimension, setDimension] = useState({
    width: imageDimensions.width / 10,
    height: imageDimensions.height / 10,
  })
  const [isEditing, setIsEditing] = useState(false)
  const [selectedCaseType, setSelectedCaseType] = useState<CaseType>('silicon')
	const [selectedColor, setSelectedColor] = useState<CaseColor>('bg-blue-950')
	const [selectedModel, setSelectedModel] = useState('iPhone 15')
	const [deviceModels, setDeviceModels] = useState<DeviceBrand[]>([])
  const maskRef = useRef<HTMLDivElement>(null)

  const cloudinaryImageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${imageUrl}`

  const caseTypes: { type: CaseType; label: string }[] = [
    { type: 'silicon', label: 'Silicon' },
    { type: 'rubber', label: 'Rubber' },
    { type: 'leather', label: 'Leather' },
  ]

  const colorOptions: { color: CaseColor; name: string }[] = [
    { color: 'bg-blue-950', name: 'Navy Blue' },
    { color: 'bg-red-600', name: 'Crimson Red' },
    { color: 'bg-emerald-950', name: 'Forest Green' },
    { color: 'bg-gray-200', name: 'Cloud White' },
    { color: 'bg-purple-900', name: 'Royal Purple' },
	]
	
	useEffect(() => {
    async function fetchDeviceModels() {
      try {
        const res = await fetch('/api/device-models')
        if (!res.ok) {
          throw new Error('Failed to fetch device models')
        }
        const data = await res.json()
        setDeviceModels(data)
        // Optionally set a default selected model, e.g. the first model of the first brand:
        if (data.length && data[0].models.length) {
          setSelectedModel(data[0].models[0])
        }
      } catch (error) {
        console.error('Error fetching device models:', error)
      }
    }
    fetchDeviceModels()
  }, [])

  return (
    <div className="relative pt-5 grid grid-cols-3 pb-5">
      <div className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
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
                onResize={(e, direction, ref, delta) => {
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

      {/* Controls Column */}
      <div className="col-span-1 flex flex-col items-start justify-center gap-6 pl-4">
        {/* Edit Position Button */}
        <div className="w-full space-y-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isEditing ? 'Done Editing' : 'Edit Position'}
          </button>
          <div className="text-sm text-muted-foreground">
            {isEditing ? (
              <span>Double-click to drag and resize your image, then click Done when finished</span>
            ) : (
              <span>Click Edit to adjust image position and size</span>
            )}
          </div>
        </div>

        {/* Case Type Selection */}
        <div className="w-full space-y-4">
          <h3 className="text-lg font-semibold">Case Type</h3>
          <div className="flex gap-2">
            {caseTypes.map(({ type, label }) => (
              <button
                key={type}
                onClick={() => setSelectedCaseType(type)}
                className={cn(
                  'px-4 py-2 rounded-lg border transition-all',
                  selectedCaseType === type
                    ? 'border-blue-600 bg-blue-100'
                    : 'border-gray-200 hover:border-blue-400'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Device Model Selection */}
        <div className="w-full space-y-4">
          <h3 className="text-lg font-semibold">Device Model</h3>
          <ScrollArea className="h-[200px] rounded-md border p-4">
            <div className="space-y-4">
              {deviceModels.map((brandGroup) => (
                <div key={brandGroup.brand} className="space-y-2">
                  <h4 className="font-medium text-muted-foreground">{brandGroup.brand}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {brandGroup.models.map((model) => (
                      <button
                        key={model}
                        onClick={() => setSelectedModel(model)}
                        className={cn(
                          'w-full p-2 text-sm rounded-md border transition-colors',
                          selectedModel === model
                            ? 'border-blue-600 bg-blue-100'
                            : 'border-gray-200 hover:border-blue-400'
                        )}
                      >
                        {model}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Color Selection */}
        <div className="w-full space-y-4">
          <h3 className="text-lg font-semibold">Case Color</h3>
          <div className="flex flex-wrap gap-3">
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
      </div>
    </div>
  )
}

export default DesignConfigurator