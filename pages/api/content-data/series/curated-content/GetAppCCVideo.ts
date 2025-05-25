/* GetAAPPCCVideo.ts */
import { NextApiRequest, NextApiResponse } from 'next'

const API_URL = 'https://ambiencelife-api-us.com/api/v1/data/curated/videos'

const fetchVideoMeta = async (videoID: string) => {
  try {
    const response = await fetch(API_URL + videoID)

    if (!response.ok) {
      throw new Error(`Request to ${API_URL} failed with status ${response.status}`)
    }

    const data = await response.json()
    return data
  }
  
  catch (error) {
    console.error('Error in fetchVideoMeta:', error)
    throw error 
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query: { videoID } } = req

  if (typeof videoID !== 'string') {
    return res.status(400).json({ error: 'Invalid videoID' })
  }

  const videoData = await fetchVideoMeta(videoID)
  res.status(200).json(videoData)
}
