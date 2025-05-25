/* GetAllDESVideosByStatesCity.ts */
import { NextApiRequest, NextApiResponse } from 'next'

export const EXTERNAL_BASE_ENDPOINT = 'https://ambiencelife-api-us.com/api/v1/data/destinations/videos/'

const fetchDestinationVideoDataFeed = async (StatesCitiesParam: string) => {
    try {
      const response = await fetch(EXTERNAL_BASE_ENDPOINT + StatesCitiesParam)
  
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
    const StatesCitiesParam = req.query.StatesCitiesParam as string || ''
    const videos = await fetchDestinationVideoDataFeed(StatesCitiesParam)
    res.json(videos)
  }