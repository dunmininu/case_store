'use client'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { Image, Loader2, MousePointerSquareDashed } from 'lucide-react'
import { useState, useTransition } from 'react'
import Dropzone, { FileRejection } from 'react-dropzone'
import { CldImage } from 'next-cloudinary'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { processImageConfiguration, updateConfigurationCroppedImage } from './action'

const Page = () => {
  const { toast } = useToast()
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>('')
  const router = useRouter()

  const handleCroppedImage = async (newCroppedUrl: string) => {
    setCroppedImageUrl(newCroppedUrl)
    if (uploadedImage) {
      try {
        const result = await updateConfigurationCroppedImage(uploadedImage, newCroppedUrl)
        toast({
          title: "Success",
          description: "Cropped image updated successfully"
        })
        // // Optionally redirect to design page
        // startTransition(() => {
        //   router.push(`/design/${result.configId}`)
        // })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update cropped image",
          variant: "destructive"
        })
        console.log(error)
      }
    }
  }

  const onDropAccepted = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'psyshop')
      formData.append('upload_preset', 'psyshop_preset')

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90))
      }, 500)

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      clearInterval(progressInterval)

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      setUploadedImage(data.public_id)
      setUploadProgress(100)

      // Process the initial image configuration
      const result = await processImageConfiguration(data.public_id)
      
      toast({
        title: "Success",
        description: "Image uploaded successfully"
      })

    } catch (error) {
      console.error('Upload failed:', error)
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      })
    } finally {
      setIsUploading(false)
    }
  }

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    //   alert('Please upload only image files (PNG, JPG, JPEG, HEIC)')
    const [file] = rejectedFiles
    setIsDragOver(false)

    toast({
      title: `${file.file.type} type is not supported`,
      description: 'Please choose a PNG, JPG, JPEG, HEIC image instead.',
      variant: 'destructive',
    })
  }

  return (
    <div
      className={cn(
        'relative h-full flex-1 my-16 w-full rounded-xl bg-gray-500/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center items-center flex-col',
        {
          'ring-blue-500 bg-blue-900/10': isDragOver,
        },
      )}
    >
      {uploadedImage ? (
        <div className="w-full max-w-xl mx-auto">
          <CldImage
            width="800"
            height="600"
            src={uploadedImage}
            alt="Uploaded image"
            className="rounded-lg shadow-md"
          />
          {/* Optional: Add a button to upload another image */}
          <button
            onClick={() => setUploadedImage(null)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Upload Another Image
          </button>
        </div>
      ) : (
        <div className="relative flex flex-1 flex-col items-center justify-center w-full">
          <Dropzone
            onDropRejected={onDropRejected}
            onDropAccepted={onDropAccepted}
            accept={{
              'image/png': ['.png'],
              'image/jpeg': ['.jpeg', '.jpg', '.JPG'],
              'image/heic': ['.heic', '.HEIC'],
            }}
            onDragEnter={() => setIsDragOver(true)}
            onDragLeave={() => setIsDragOver(false)}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                className="h-full w-full flex-1 flex flex-col items-center justify-center"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {isDragOver ? (
                  <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2" />
                ) : isUploading || isPending ? (
                  <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2" />
                ) : (
                  <Image className="h-6 w-6 text-zinc-500 mb-2" />
                )}

                <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                  {isUploading ? (
                    <div className="flex flex-col items-center">
                      <p>Uploading...</p>
                      <Progress
                        value={uploadProgress}
                        className="mt-2 w-40 h-2 bg-gray-300"
                      />
                    </div>
                  ) : isPending ? (
                    <div className="flex flex-col items-center">
                      <p>Processing, please wait...</p>
                    </div>
                  ) : isDragOver ? (
                    <p>
                      <span className="font-semibold">Drop image here</span>
                    </p>
                  ) : (
                    <p>
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                  )}
                </div>

                {!isPending && !isUploading && (
                  <p className="text-xs text-zinc-500">PNG, JPG, JPEG, HEIC</p>
                )}
              </div>
            )}
          </Dropzone>
        </div>
      )}
    </div>
  )
}

export default Page
