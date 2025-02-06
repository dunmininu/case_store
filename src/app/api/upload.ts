import { NextApiRequest, NextApiResponse } from 'next';
import { cloudinary } from 'next-cloudinary';

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

interface UploadResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UploadResponse>
) {
  if (req.method === 'POST') {
    try {
      const { file } = req.body; // Expect the file as a base64 string or URL

      // Upload the file to the 'casette' folder
      const uploadResponse = await cloudinary.uploader.upload(file, {
        folder: 'casette', // Store in the 'casette' folder
      });

      res.status(200).json({ success: true, data: uploadResponse });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
