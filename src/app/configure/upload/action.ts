'use server'
import sharp from 'sharp'
import { db } from '@/db'

export async function processImageConfiguration(publicId: string) {
  try {
    // Check if configuration already exists for this image
    const existingConfiguration = await db.configuration.findFirst({
      where: { imageUrl: publicId },
    })

    if (existingConfiguration) {
      return { configId: existingConfiguration.id }
    }

    // Construct the full Cloudinary URL
    const cloudinaryUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}`

    // Fetch image metadata
    const res = await fetch(cloudinaryUrl)
    if (!res.ok) {
      throw new Error('Failed to fetch image from Cloudinary')
    }

    const buffer = await res.arrayBuffer()
    const imgMetaData = await sharp(Buffer.from(buffer)).metadata()
    const { width, height } = imgMetaData

    // Create configuration in database
    const configuration = await db.configuration.create({
      data: {
        height: height || 500,
        width: width || 500,
        imageUrl: publicId,
      },
    })

    return { configId: configuration.id }
  } catch (error) {
    console.error('Error in processImageConfiguration:', error)
    throw error
  }
}

export async function updateConfigurationCroppedImage(
  publicId: string,
  croppedImageUrl: string,
) {
  try {
    const existingConfiguration = await db.configuration.findFirst({
      where: { imageUrl: publicId },
    })

    if (!existingConfiguration) {
      throw new Error('Configuration not found')
    }

    const updatedConfiguration = await db.configuration.update({
      where: { id: existingConfiguration.id },
      data: { croppedImageUrl },
    })

    return { configId: updatedConfiguration.id }
  } catch (error) {
    console.error('Error updating configuration:', error)
    throw error
  }
}