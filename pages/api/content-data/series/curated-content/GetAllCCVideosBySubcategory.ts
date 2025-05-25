/* CCVideosConstants.ts */
import { NextApiRequest, NextApiResponse } from 'next'

export const EXTERNAL_BASE_ENDPOINT = 'https://ambiencelife-api-us.com/api/v1/data/curated/videos/'

const fetchSubCategoryVideoDataFeed = async (CCSUBCategoryParam: string) => {
  try {

    // const response = await fetch(EXTERNAL_BASE_ENDPOINT + CCSUBCategoryParam)
    const response = await fetch("https://ambiencelife-api-us.com/api/v1/data/curated/videos/" + CCSUBCategoryParam)

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()

    return data?.meta || []
  }

  catch (error) {
    console.error('Error fetching video data:', error)
    return []
  }
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const CCSUBCategoryParam = req.query.subcategory as string || ''
  const videos = await fetchSubCategoryVideoDataFeed(CCSUBCategoryParam)
  res.json(videos)
}
